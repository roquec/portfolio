$gist_id = $env:UPDATE_GIST_ID
$path = $env:UPDATE_GIST_PATH
$token = $env:UPDATE_GIST_TOKEN

# Error handling function
function Handle-Error {
    param (
        [string]$message
    )
    Write-Host "Error: $message"
    exit 1
}

# Checking source
if (-not (Test-Path -Path $path -PathType Container)) {
    Handle-Error "Invalid source path. $path is not a directory."
}

# List files on source
$source_files = Get-ChildItem -Path $path -File | ForEach-Object { $_.Name }

# Prepare files content
foreach ($file in $source_files) {
    $content = Get-Content -Path (Join-Path -Path $path -ChildPath $file) -Raw -Encoding Default
    if ($content -eq $null) {
        Handle-Error "Failed to read file: $file"
    }
}

Write-Host "Found $($source_files.Count) readable files from source: $($source_files)"

# Define gist git
$gist_git_url = "https://$($token)@gist.github.com/$($gist_id).git"
$gist_git_dir = "gist-clones-$($gist_id)"

# Reset working directory
if (Test-Path -Path $gist_git_dir -PathType Container) {
    Remove-Item -Path $gist_git_dir -Recurse -Force
}
elseif (Test-Path -Path $gist_git_dir -PathType Leaf) {
    Remove-Item -Path $gist_git_dir -Force
}

try {
    # Start cloning gist
    # Can't use API, as API only limits to 300 files in list, and more importantly can't add new file
    # https://docs.github.com/en/rest/gists/gists?apiVersion=2022-11-28#about-gists
    git clone $gist_git_url $gist_git_dir

    git -C $gist_git_dir remote set-url origin $gist_git_url

    git -C $gist_git_dir pull

    $target_files = Get-ChildItem -Path $gist_git_dir
    # Since it's Git, skip .git directory
    if ($target_files -contains ".git") {
        $target_files.Remove(".git")
    }

    Write-Host "Found $($target_files.Count) files in gist"

    # Files to remove
    $removed_files = @()
    foreach ($file in $target_files) {
        if ($file.Name -notin $source_files) {
            Remove-Item -Path (Join-Path -Path $gist_git_dir -ChildPath $file.Name) -Force
            $removed_files.Add($file.Name)
        }
    }

    Write-Host "Removed $($removed_files.Count) files from Gist repo: $($removed_files)"

    # Update or add
    foreach ($file in $source_files) {
        # Basically copy and replace
        if (Test-Path -Path (Join-Path -Path $gist_git_dir -ChildPath $file)) {
            Remove-Item -Path (Join-Path -Path $gist_git_dir -ChildPath $file) -Force
        }
        Copy-Item -Path (Join-Path -Path $path -ChildPath $file) -Destination (Join-Path -Path $gist_git_dir -ChildPath $file) -Force
        Write-Host "Copied $file"
    }

    $files_list = Get-ChildItem -Path $gist_git_dir
    Write-Host "Files in gist: $($files_list)"

    # Configure Git user information
    Set-Location -Path $gist_git_dir
    git config user.email "$($env:GITHUB_ACTOR)@users.noreply.github.com"
    git config user.name $env:GITHUB_ACTOR


    if ($source_files.Count -gt 0) {
        git add $source_files
    }

    # No changes detected, exit with "success-ish"
    if (git diff-index --quiet HEAD) {
        Write-Host "No changes detected in Gist repo."
        exit 0
    }
    git branch
    git status
    Write-Host "Changes added going to commit"

    git commit -m "Sync from repo by $($env:GITHUB_ACTOR), ref: $($env:GITHUB_REF)."

    git status
    Write-Host "Changes commited going to push"
    git remote -v
    git push

    Write-Host "Pushed changes to Gist repo."
}
catch {
    Handle-Error $_
}
