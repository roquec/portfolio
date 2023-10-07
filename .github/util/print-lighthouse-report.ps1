# Get lighthouse report values
$performance = '${{ fromJSON(steps.lighthouse.outputs.manifest)[0].summary.performance }}'
$accessibility = '${{ fromJSON(steps.lighthouse.outputs.manifest)[0].summary.accessibility }}'
$bestPractices = '${{ fromJSON(steps.lighthouse.outputs.manifest)[0].summary.best-practices }}'
$seo = '${{ fromJSON(steps.lighthouse.outputs.manifest)[0].summary.seo  }}'

# Format summary
$summary = @'
## ⚡️🏠 Lighthouse report
See full report [here](${reportUrl}). Here's the summary:
| Category | Score |
| -------- | ----- |
| Performance | $($performance) |
| Accessibility | $($accessibility) |
| Best-practices | $($bestPractices) |
| SEO | $($seo) |
'@

# Write to environment file
$summary >> $env:GITHUB_STEP_SUMMARY
