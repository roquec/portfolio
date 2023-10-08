$gist_id = $env:UPDATE_GIST_ID
$path = $env:UPDATE_GIST_PATH
$token = $env:UPDATE_GIST_TOKEN
$github_actor = $env:GITHUB_ACTOR
$github_ref = $env:GITHUB_REF

# Error handling function
function Handle-Error {
    param (
        [string]$message
    )
    Write-Host "Error: $message"
    exit 1
}

try {
    # Validate parameters
    if($path -eq $null) {
      $path = "."
    }
    if(-not($gist_id -and $gist_id.GetType() -eq [string])) {
      Handle-Error "Invalid Gist ID: '$($gist_id)'"
    }
    if(-not($path -and $path.GetType() -eq [string])) {
      Handle-Error "Invalid path: '$($path)'"
    }
    if(-not($token -and $token.GetType() -eq [string])) {
      Handle-Error "Invalid access token"
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
            Write-Host "Failed to read file: $file"
            $source_files.Remove($file)
        }
    }
    Write-Host "Found $($source_files.Count) readable files from source: $($source_files)"

    # Define gist git
    $gist_git_url = "https://$($token)@gist.github.com/$($gist_id).git"
    $gist_git_dir = "gist-clones-$($gist_id)"

    # Clean repo directory
    if (Test-Path -Path $gist_git_dir -PathType Container) {
        Remove-Item -Path $gist_git_dir -Recurse -Force
    }
    elseif (Test-Path -Path $gist_git_dir -PathType Leaf) {
        Remove-Item -Path $gist_git_dir -Force
    }

    # Clone Gist repo
    git clone $gist_git_url $gist_git_dir
    Write-Host "Cloned $($gist_git_url) into $($gist_git_dir)"

    # Check existing files
    $target_files = Get-ChildItem -Path $gist_git_dir
    if ($target_files -contains ".git") {
        $target_files.Remove(".git")
    }
    Write-Host "Found $($target_files.Count) existing files in gist: $($target_files)"

    # Files to remove
    $removed_files = @()
    foreach ($file in $target_files) {
        if ($file.Name -notin $source_files) {
            Remove-Item -Path (Join-Path -Path $gist_git_dir -ChildPath $file.Name) -Force
            $removed_files += $file.Name
        }
    }
    Write-Host "Removed $($removed_files.Count) files from Gist repo: $($removed_files)"

    # Add or update
    foreach ($file in $source_files) {
        if (Test-Path -Path (Join-Path -Path $gist_git_dir -ChildPath $file)) {
            Remove-Item -Path (Join-Path -Path $gist_git_dir -ChildPath $file) -Force
        }
        Copy-Item -Path (Join-Path -Path $path -ChildPath $file) -Destination (Join-Path -Path $gist_git_dir -ChildPath $file) -Force
        Write-Host "Added file $($file) to Gist repo"
    }

    # Configure Git user information
    Set-Location -Path $gist_git_dir
    git config user.email "$($github_actor)@users.noreply.github.com"
    git config user.name $github_actor

    # Git add all changes
    if (git diff-index --quiet HEAD) {
        Write-Host "No changes in Gist repo. Exiting script."
        exit 0
    }
    git add .
    Write-Host "Added all changes to index"

    # Git commit
    git commit -m "Sync from repo by $($github_actor), ref: $($github-ref)."
    Write-Host "Commited changes ready to push"

    git push
    Write-Host "Pushed changes to Gist repo"
    Write-Host "Script ran successfully!"

    Set-Location -Path ".\.."
}
catch {
    Handle-Error $_
}
