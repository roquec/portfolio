write-host "Serving site with live reload..." -ForegroundColor green

bundle exec jekyll serve --host 0.0.0.0 --livereload --source src
