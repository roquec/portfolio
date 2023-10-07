# Get lighthouse report outputs
$links = $env:LIGHTHOUSE_LINKS | ConvertFrom-Json;
$manifest = $env:LIGHTHOUSE_MANIFEST | ConvertFrom-Json

# Get data for summary
$performance = $manifest[0].summary.performance * 100;
$accessibility = $manifest[0].summary.accessibility * 100;
$bestPractices = $manifest[0].summary.'best-practices' * 100;
$seo = $manifest[0].summary.seo * 100;
$reportUrl = ($links[0].PSObject.Properties | select -First 1).value;

# Get correct emoji depending on the score
function GetScoreEmoji ([float] $score)
{
  if($score -ge 90) { return '🟢'; }
  if($score -ge 70){ return '🟡'; }
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
"@

# Write to environment file
$summary >> $env:GITHUB_STEP_SUMMARY

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
new-item -force -path .\gist\performance.json -value $json -type file

$json = @"
{
  "schemaVersion": 1,
  "label": "Accessibility",
  "message": "$($accessibility)",
  "color": "$(GetScoreColor($accessibility))"
}
"@
new-item -force -path .\gist\accessibility.json -value $json -type file

$json = @"
{
  "schemaVersion": 1,
  "label": "Best-practices",
  "message": "$($bestPractices)",
  "color": "$(GetScoreColor($bestPractices))"
}
"@
new-item -force -path .\gist\bestPractices.json -value $json -type file

$json = @"
{
  "schemaVersion": 1,
  "label": "SEO",
  "message": "$($seo)",
  "color": "$(GetScoreColor($seo))"
}
"@
new-item -force -path .\gist\seo.json -value $json -type file
