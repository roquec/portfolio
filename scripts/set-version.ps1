# Get the version and commit hash from GitHub Actions environment variables
$version = $env:GITHUB_REF_NAME
$commit = $env:GITHUB_SHA

# Set the path to the JSON file to be updated
$jsonFilePath = "./src/version.json"

# Read the contents of the JSON file
$jsonContent = Get-Content $jsonFilePath -Raw | ConvertFrom-Json

# Replace the placeholders with the actual values
$jsonContent.version = $jsonContent.version -replace "__VERSION__", $version
$jsonContent.commit = $jsonContent.commit -replace "__COMMIT__", $commit

# Write the updated JSON content back to the file
$jsonContent | ConvertTo-Json -Depth 100 | Set-Content $jsonFilePath
