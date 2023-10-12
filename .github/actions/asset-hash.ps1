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
  if ($reports_mobile -eq $null)
  {
    $path = "./_site"
  }

  $fileHashDictionary = @{ }

  # Create a dictionary of file paths to assets and their hash
  Get-ChildItem -Path $site_dir -File -Recurse | Where-Object { $_.DirectoryName -like "*\assets\*" -or $_.Extension -eq ".webp" } | ForEach-Object {
    $filePath = $_.FullName
    $fileHash = (Get-FileHash -Path $filePath -Algorithm SHA256).Hash
    $key = $filePath -replace ".*\\_site\\", "" -replace "\\", "/"
    $fileHashDictionary[$key] = $fileHash
  }

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
}
catch
{
  Handle-Error $_
}
