# Get lighthouse report outputs
$links = $env:LIGHTHOUSE_LINKS | ConvertFrom-Json;
$manifest = $env:LIGHTHOUSE_MANIFEST | ConvertFrom-Json

# Get data for summary
$performance = 0.0;
$accessibility = 0.0;
$bestPractices = 0.0;
$seo = 0.0;
foreach($run in $manifest){
  $performance += $manifest[0].summary.performance * 100;
  $accessibility += $manifest[0].summary.accessibility * 100;
  $bestPractices += $manifest[0].summary.'best-practices' * 100;
  $seo += $manifest[0].summary.seo * 100;
}

$performance = [Math]::floor($performance / $manifest.length);
$accessibility = [Math]::floor($accessibility / $manifest.length);
$bestPractices = [Math]::floor($bestPractices / $manifest.length);
$seo = [Math]::floor($seo / $manifest.length);

$report_links = @()
$links.PSObject.Properties | ForEach-Object {
  $link_object = New-Object -Type PSObject -Property @{
      'target' = $_.Name -replace '\?v=.*',''
      'url' = $_.Value
  }
  $report_links += $link_object
}

# Get correct emoji depending on the score
function GetScoreEmoji ([float] $score)
{
  if($score -ge 95) { return '🟢'; }
  if($score -ge 75){ return '🟡'; }
  return '🔴';
}

# Format summary
$links_formatted = ""
foreach($link in $report_links){
  $links_formatted += "| [Link]($($link.url)) | [$($link.target.replace('https://',''))]($($link.target)) |`r`n"
}

$summary = @"
## ⚡️🏠 Lighthouse report

<br />

| Category | Score | |
|-----|-----|-----|
| Performance | $($performance) |$(GetScoreEmoji($performance))|
| Accessibility | $($accessibility) |$(GetScoreEmoji($accessibility))|
| Best-practices | $($bestPractices) |$(GetScoreEmoji($bestPractices))|
| SEO | $($seo) |$(GetScoreEmoji($seo))|

<br />

<details>
  <summary>Full reports</summary>

  <br />

| Report | Test target |
|-----|-----|
$($links_formatted)

</details>

<br />
"@

# Write to environment file
$summary >> $env:GITHUB_STEP_SUMMARY

# Get correct color depending on the score
function GetScoreColor ([float] $score)
{
  if($score -ge 95) { return '#3DC13C'; }
  if($score -ge 75){ return '#F3BB1B'; }
  return '#F13637';
}

$json = @"
{
  "schemaVersion": 1,
  "label": "Performance",
  "message": "$($performance)",
  "color": "$(GetScoreColor($performance))"
}
"@
new-item -force -path .\report\performance.json -value $json -type file

$json = @"
{
  "schemaVersion": 1,
  "label": "Accessibility",
  "message": "$($accessibility)",
  "color": "$(GetScoreColor($accessibility))"
}
"@
new-item -force -path .\report\accessibility.json -value $json -type file

$json = @"
{
  "schemaVersion": 1,
  "label": "Best-practices",
  "message": "$($bestPractices)",
  "color": "$(GetScoreColor($bestPractices))"
}
"@
new-item -force -path .\report\bestPractices.json -value $json -type file

$json = @"
{
  "schemaVersion": 1,
  "label": "SEO",
  "message": "$($seo)",
  "color": "$(GetScoreColor($seo))"
}
"@
new-item -force -path .\report\seo.json -value $json -type file

Copy-Item -Path $manifest[0].htmlPath -Destination .\report\report.html -Force
