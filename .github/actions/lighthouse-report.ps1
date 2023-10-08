$reports_mobile = $env:LIGHTHOUSE_PATH_MOBILE
$reports_desktop = $env:LIGHTHOUSE_PATH_DESKTOP
$output_dir = $env:LIGHTHOUSE_REPORT_OUTPUT_DIR
$summary_output = $env:GITHUB_STEP_SUMMARY

# Error handling function
function Handle-Error {
    param (
        [string]$message
    )
    Write-Host "Error: $message"
    exit 1
}

try {
  # Validate parameters
  if($reports_mobile -eq $null) {
    $path = "."
  }
  if($reports_desktop -eq $null) {
    $path = "."
  }
  if(-not($reports_mobile -and $reports_mobile.GetType() -eq [string] -and (Test-Path -Path $reports_mobile -PathType Container))) {
    Handle-Error "Invalid reports_mobile path: '$($reports_mobile)'"
  }
  if(-not($reports_desktop -and $reports_desktop.GetType() -eq [string] -and (Test-Path -Path $reports_desktop -PathType Container))) {
    Handle-Error "Invalid reports_desktop path: '$($reports_desktop)'"
  }

  # Get lighthouse report manifests
  $manifest_mobile = Get-Content -Path (Join-Path -Path $reports_mobile -ChildPath "manifest.json") | ConvertFrom-Json
  $manifest_desktop = Get-Content -Path (Join-Path -Path $reports_desktop -ChildPath "manifest.json") | ConvertFrom-Json

  # Get data for summary
  foreach($run in $manifest_desktop){
    if($run.isRepresentativeRun){
      $performance = $run.summary.performance * 100;
      $accessibility = $run.summary.accessibility * 100;
      $bestPractices = $run.summary.'best-practices' * 100;
      $seo = $run.summary.seo * 100;
      $report = $run.htmlPath;
      continue;
    }
  }
  foreach($run in $manifest_mobile){
    if($run.isRepresentativeRun){
      $performance_mobile = $run.summary.performance * 100;
      $accessibility_mobile = $run.summary.accessibility * 100;
      $bestPractices_mobile = $run.summary.'best-practices' * 100;
      $seo_mobile = $run.summary.seo * 100;
      $report_mobile = $run.htmlPath;
      continue;
    }
  }

  # Get correct color depending on the score
  function GetScoreColor ([float] $score, [bool] $emoji)
  {
    if($score -ge 90) { return $emoji ? '🟢' : '#3DC13C'; }
    if($score -ge 50){ return $emoji ? '🟡' : '#F3BB1B'; }
    return $emoji ? '🔴' : '#F13637';
  }

  # Creates a JSON badge file for shields.io
  function WriteBadgeFile ([string] $label, [string] $message, [string] $color, [string] $file)
  {
    $content = ("
    {
     `"schemaVersion`": 1,
     `"label`": `"$($label)`",
     `"message`": `"$($message)`",
     `"color`": `"$($color)`"
    }");
    new-item -force -path (Join-Path -Path $output_dir -ChildPath $file) -value $content -type file
  }

  # Generate all output files
  WriteBadgeFile "Performance" $performance (GetScoreColor $performance) "performance.json"
  WriteBadgeFile "Accessibility"  $accessibility (GetScoreColor $accessibility) "accessibility.json"
  WriteBadgeFile "Best-practices"  $bestPractices (GetScoreColor $bestPractices) "best_practices.json"
  WriteBadgeFile "SEO" $seo (GetScoreColor $seo) "seo.json"

  WriteBadgeFile "Performance" $performance_mobile (GetScoreColor $performance_mobile) "performance_mobile.json"
  WriteBadgeFile "Accessibility"  $accessibility_mobile (GetScoreColor $accessibility_mobile) "accessibility_mobile.json"
  WriteBadgeFile "Best-practices"  $bestPractices_mobile (GetScoreColor $bestPractices_mobile) "best_practices_mobile.json"
  WriteBadgeFile "SEO" $seo_mobile (GetScoreColor $seo_mobile) "seo_mobile.json"

  Copy-Item -Path $report -Destination (Join-Path -Path $output_dir -ChildPath "report.html") -Force
  Copy-Item -Path $report_mobile -Destination (Join-Path -Path $output_dir -ChildPath "report_mobile.html") -Force

  # Write GitHub Actions step summary
  $summary = ("
  ## ⚡️🏠 Lighthouse report

  <br />

  Desktop lighthouse report summary ([See full report](https://htmlpreview.github.io/?https://gist.githubusercontent.com/roquec/3f8ee5d85053832ea374a05b301f57aa/raw/report.html)):
  | Category | Score | |
  |-----|-----|-----|
  | Performance | $($performance) |$(GetScoreColor $performance 1)|
  | Accessibility | $($accessibility) |$(GetScoreColor $accessibility 1)|
  | Best-practices | $($bestPractices) |$(GetScoreColor $bestPractices 1)|
  | SEO | $($seo) |$(GetScoreColor $seo 1)|

  <br />

  Mobile lighthouse report summary ([See full report](https://htmlpreview.github.io/?https://gist.githubusercontent.com/roquec/3f8ee5d85053832ea374a05b301f57aa/raw/report_mobile.html)):
  | Category | Score | |
  |-----|-----|-----|
  | Performance | $($performance_mobile) |$(GetScoreColor $performance_mobile 1)|
  | Accessibility | $($accessibility_mobile) |$(GetScoreColor $accessibility_mobile 1)|
  | Best-practices | $($bestPractices_mobile) |$(GetScoreColor $bestPractices_mobile 1)|
  | SEO | $($seo_mobile) |$(GetScoreColor $seo_mobile 1)|

  <br />");

  # Write summary to output
  $summary >> $summary_output
  $summary >> (Join-Path -Path $output_dir -ChildPath "_summary.md")
}
catch {
    Handle-Error $_
}


