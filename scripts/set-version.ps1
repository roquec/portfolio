# Get the version and commit hash from GitHub Actions environment variables
$time = (Get-Date).ToUniversalTime().ToString(‘yyyy-MM-ddTHH:mm:ss’)
$branch = $env:GITHUB_REF_NAME
$commit = $env:GITHUB_SHA
$build = $env:GITHUB_RUN_ID

# Set the path to the JSON file to be updated
$jsonFilePath = "./src/version.json"

# Read the contents of the JSON file
$jsonContent = Get-Content $jsonFilePath -Raw | ConvertFrom-Json

# Replace the placeholders with the actual values
$jsonContent.timestamp = $jsonContent.timestamp -replace "__TIME__", $time
$jsonContent.branch = $jsonContent.branch -replace "__BRANCH__", $branch
$jsonContent.commit = $jsonContent.commit -replace "__COMMIT__", $commit
$jsonContent.build = $jsonContent.build -replace "__BUILD__", $build

# Write the updated JSON content back to the file
$jsonContent | ConvertTo-Json -Depth 100 | Set-Content $jsonFilePath
