write-host "Cleaning auto-generated files and folders..." -ForegroundColor green

write-host "Deleting _site"
$FileName = "_site"
if (Test-Path $FileName) {
  Remove-Item $FileName -Recurse
}
write-host "Deleted _site"

write-host "Deleting src/.jekyll-cache"
$FileName = "src/.jekyll-cache"
if (Test-Path $FileName) {
  Remove-Item $FileName -Recurse
}
write-host "Deleted src/.jekyll-cache"

