# Get the version and commit hash from GitHub Actions environment variables
$time = (Get-Date).ToUniversalTime().ToString(‘yyyy-MM-ddTHH:mm:ssZ’)
$branch = $env:GITHUB_REF_NAME
$commit = $env:GITHUB_SHA
$build = $env:GITHUB_RUN_ID

# Set the path to the version file to be updated
$versionFilePath = "./src/version.html"

# Read the contents of the version file
$versionFileContent = Get-Content $versionFilePath -Raw

# Replace the placeholders with the actual values
$versionFileContent = $versionFileContent -replace "__TIME__", $time
$versionFileContent = $versionFileContent -replace "__BRANCH__", $branch
$versionFileContent = $versionFileContent -replace "__COMMIT__", $commit
$versionFileContent = $versionFileContent -replace "__BUILD__", $build

# Write the updated version content back to the file
$versionFileContent | Set-Content $versionFilePath

# Copy README from root to the jekyll file
$readmeFilePath = "./src/README.md"
$readmePlaceholder = Get-Content $readmeFilePath -Raw
$readmeContent = Get-Content "./README.md" -Raw
$readmeContent = $readmePlaceholder -replace "__README__", $readmeContent
$readmeContent | Set-Content $readmeFilePath

# Get resume markdown from github.com/roquec/resume
$resumeUrl = "https://raw.githubusercontent.com/roquec/resume/main/src/resume.md"
$resumeFilePath = "./src/resume.md"
$resumePlaceholder = Get-Content $resumeFilePath -Raw
$resumeContent = Invoke-WebRequest -Uri $resumeUrl -UseBasicParsing | Select-Object -ExpandProperty Content
$resumeContent = $resumePlaceholder -replace "__RESUME__", $resumeContent
$resumeContent | Set-Content $resumeFilePath

# Get resume PDF file from github.com/roquec/resume
$resumePdfUrl = "https://raw.githubusercontent.com/roquec/resume/main/output/resume.pdf"
$resumePdfTargetPath = "./src/assets/files/roque-carrizo-resume.pdf"
Invoke-WebRequest -Uri $resumePdfUrl -OutFile $resumePdfDestination
