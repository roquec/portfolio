<h1 align="center">Portfolio</h1>
<p align="center">Repo for my portfolio website: <code><a href="https://roquec.com/">roquec.com</a></code></p>
<p align="center">
  <a href="https://github.com/roquec/Portfolio/actions">
    <img alt="CI/CD Workflow" src="https://img.shields.io/github/actions/workflow/status/roquec/Portfolio/ci-cd.yml?logo=github&labelColor=333333&cacheSeconds=300">
  </a>

  <a href="https://htmlpreview.github.io/?https://gist.githubusercontent.com/roquec/3f8ee5d85053832ea374a05b301f57aa/raw/report.html">
    <img alt="Lighthouse performance badge" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Fperformance.json&logo=lighthouse&label=Performance&labelColor=333333&cacheSeconds=300">
  </a>

  <a href="https://htmlpreview.github.io/?https://gist.githubusercontent.com/roquec/3f8ee5d85053832ea374a05b301f57aa/raw/report.html">
    <img alt="Lighthouse accessibility badge" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Faccessibility.json&logo=lighthouse&label=Accessibility&labelColor=333333&cacheSeconds=300">
  </a>

  <a href="https://htmlpreview.github.io/?https://gist.githubusercontent.com/roquec/3f8ee5d85053832ea374a05b301f57aa/raw/report.html">
    <img alt="Lighthouse best-practices badge" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Fbest_practices.json&logo=lighthouse&label=Best-practices&labelColor=333333&cacheSeconds=300">
  </a>

  <a href="https://htmlpreview.github.io/?https://gist.githubusercontent.com/roquec/3f8ee5d85053832ea374a05b301f57aa/raw/report.html">
    <img alt="Lighthouse SEO badge" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Fseo.json&logo=lighthouse&label=SEO&labelColor=333333&cacheSeconds=300">
  </a>
</p>

# Development

## Requirements

Install Ruby latest version from [`here`](https://rubyinstaller.org/)

Choose `MSYS2 and MINGW development tool chain` option during installation.

Verify with installation `ruby -v` `gem -v`.

Run `gem install jekyll bundler` to install Jekyll.

## Run locally

To build the site and serve it locally execute:

```
bundle exec jekyll serve --livereload
```

This will generate the site in `_site` and update it when modified.

The site will be available at `http://127.0.0.1:4000/`.

## Deploy

To build the release site use:

```
JEKYLL_ENV=production bundle exec jekyll build
```

The output static website will be generated in `_site`.

Or push to master and rely on the CI/CD pipeline defined in `.github\workflows\github-pages.yml`.
