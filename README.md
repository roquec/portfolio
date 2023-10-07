[![CI/CD  Badge](https://github.com/roquec/Portfolio/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/roquec/Portfolio/actions/workflows/ci-cd.yml)

![Performance Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Froquec-lighthouse.json&query=%24.performance.score&label=Performance&color=%24.performance.color)

![Accessibility Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Froquec-lighthouse.json&query=%24.accessibility.score&label=Accessibility&color=%24.accessibility.color)

![Best-practices Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Froquec-lighthouse.json&query=%24.bestPractices.score&label=Best-practices&color=%24.bestPractices.color)

![SEO Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Froquec-lighthouse.json&query=%24.seo.score&label=SEO&color=%24.seo.color)

# Portfolio

My portfolio website [`roquec.com`](https://roquec.com/)

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
