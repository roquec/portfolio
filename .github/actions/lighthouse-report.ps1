# Get lighthouse report outputs
$manifest = $env:LIGHTHOUSE_MANIFEST | ConvertFrom-Json

# Get data for summary
$performance = 0.0;
$accessibility = 0.0;
$bestPractices = 0.0;
$seo = 0.0;
foreach($run in $manifest){
  $performance += $run.summary.performance * 100;
  $accessibility += $run.summary.accessibility * 100;
  $bestPractices += $run.summary.'best-practices' * 100;
  $seo += $run.summary.seo * 100;
}

$performance = [Math]::floor($performance / $manifest.length);
$accessibility = [Math]::floor($accessibility / $manifest.length);
$bestPractices = [Math]::floor($bestPractices / $manifest.length);
$seo = [Math]::floor($seo / $manifest.length);

# Get correct emoji depending on the score
function GetScoreEmoji ([float] $score)
{
  if($score -ge 95) { return '🟢'; }
  if($score -ge 75){ return '🟡'; }
  return '🔴';
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
| [Link](https://htmlpreview.github.io/?https://gist.githubusercontent.com/roquec/3f8ee5d85053832ea374a05b301f57aa/raw/report.html) | [roquec.com](https://roquec.com) |

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
