# Get lighthouse report outputs
$links = $env:LIGHTHOUSE_LINKS | ConvertFrom-Json;
$manifest = $env:LIGHTHOUSE_MANIFEST | ConvertFrom-Json

# Get data for summary
$reportUrl = ($links[0].PSObject.Properties | select -First 1).value;
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

"Total performance: $($performance)" >> $env:GITHUB_STEP_SUMMARY

$performance = [Math]::Round($performance / $manifest.length, 0);
$accessibility = [Math]::Round($accessibility / $manifest.length, 0);
$bestPractices = [Math]::Round($bestPractices / $manifest.length, 0);
$seo = [Math]::Round($seo / $manifest.length, 0);

# Get correct emoji depending on the score
function GetScoreEmoji ([float] $score)
{
  if($score -ge 95) { return '🟢'; }
  if($score -ge 75){ return '🟡'; }
  return '🔴';
}

# Format summary
$summary = @"
## ⚡️🏠 Lighthouse report
See full report [here]($($reportUrl)). Here's the summary:
|| Category | Score |
|-----|-----|-----|
|$(GetScoreEmoji($performance))| Performance | $($performance) |
|$(GetScoreEmoji($accessibility))| Accessibility | $($accessibility) |
|$(GetScoreEmoji($bestPractices))| Best-practices | $($bestPractices) |
|$(GetScoreEmoji($seo))| SEO | $($seo) |
<details>
  <summary>Full reports</summary>
  | Target | Report |
  |-----|-----|
  |http://localhost:44399/main.html| $($links."http://localhost:44399/main.html") |
  |http://localhost:44399/profile.html| $($links."http://localhost:44399/profile.html") |
  |http://localhost:44399/projects.html| $($links."http://localhost:44399/projects.html") |
  |http://localhost:44399/projects/portfolio-website/index.html| $($links."http://localhost:44399/projects/portfolio-website/index.html") |
</details>
"@

# Write to environment file
$summary >> $env:GITHUB_STEP_SUMMARY

$env:LIGHTHOUSE_MANIFEST >> $env:GITHUB_STEP_SUMMARY
$env:LIGHTHOUSE_LINKS >> $env:GITHUB_STEP_SUMMARY

# Get correct color depending on the score
function GetScoreColor ([float] $score)
{
  if($score -ge 90) { return '#3DC13C'; }
  if($score -ge 70){ return '#F3BB1B'; }
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
