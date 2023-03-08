write-host "Deleting _site and .jekyll-cache folders" -ForegroundColor orange

Remove-Item '_site' -Recurse
Remove-Item 'src/.jekyll-cache' -Recurse