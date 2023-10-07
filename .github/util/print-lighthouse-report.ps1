# Get lighthouse report outputs
$links = $env:LIGHTHOUSE_LINKS | ConvertFrom-Json;
$manifest = $env:LIGHTHOUSE_MANIFEST | ConvertFrom-Json

# Get data for summary
$performance = $manifest[0].summary.performance;
$accessibility = $manifest[0].summary.accessibility;
$bestPractices = $manifest[0].summary.'best-practices';
$seo = $manifest[0].summary.seo;
$reportUrl = ($links[0].PSObject.Properties | select -First 1).value;

# Get correct color depending on the score
function GetScoreEmoji ([float] $score)
{
  if($score -ge 0.9) { return '🟢'; }
  if($score -ge 0.5){ return '🟡'; }
  return '🔴';
}

# Format summary
$summary = @"
## ⚡️🏠 Lighthouse report
See full report [here]($($reportUrl)). Here's the summary:
|| Category | Score |
|| -------- | ----- |
|$(GetScoreEmoji($performance))| Performance | $($performance) |
|$(GetScoreEmoji($accessibility))| Accessibility | $($accessibility) |
|$(GetScoreEmoji($bestPractices))| Best-practices | $($bestPractices) |
|$(GetScoreEmoji($seo))| SEO | $($seo) |
"@

# Write to environment file
$summary >> $env:GITHUB_STEP_SUMMARY
