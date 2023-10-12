$site_dir = $env:ASSET_HASH_SITE_DIR

# Error handling function
function Handle-Error
{
  param (
    [string]$message
  )
  Write-Host "Error: $message"
  exit 1
}

try
{
  if ($site_dir -eq $null)
  {
    $site_dir = "./_site"
  }

  Write-Host "Looking for assets in: $site_dir"

  $fileHashDictionary = @{ }

  # Create a dictionary of file paths to assets and their hash
  Get-ChildItem -Path $site_dir -File -Recurse | Where-Object { $_.DirectoryName -like "*\assets\*" -or $_.Extension -eq ".webp" } | ForEach-Object {
    $filePath = $_.FullName
    $fileHash = (Get-FileHash -Path $filePath -Algorithm SHA256).Hash
    $key = $filePath -replace "\\", "/" -replace ".*\/_site\/", ""
    $fileHashDictionary[$key] = $fileHash

    Write-Host "Generated hash for [$key]"
  }

  Write-Host "Replacing asset links in: $site_dir"

  # Perform find and replace in HTML, CSS, and JS files
  Get-ChildItem -Path $site_dir -File -Recurse | Where-Object { $_.Extension -in ".html", ".css", ".js" } | ForEach-Object {
    $fileContent = Get-Content $_.FullName -Raw
    foreach ($key in $fileHashDictionary.Keys)
    {
      $value = $fileHashDictionary[$key]
      $fileContent = $fileContent.Replace($key, $key + "?v=" + $value)
    }
    Set-Content -Path $_.FullName -Value $fileContent
  }
  
  Write-Host "All done!"
}
catch
{
  Handle-Error $_
}
