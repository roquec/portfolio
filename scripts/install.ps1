write-host "Installing bundler and gems..." -ForegroundColor green

# First install bundler
gem install bundler

# Install needed gems from Gemfile
bundle install

# Add linux platform for CI/CD pipeline
bundle lock --add-platform x86_64-linux
