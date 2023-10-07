[![Build](https://github.com/roquec/Portfolio/actions/workflows/github-pages.yml/badge.svg)](https://github.com/roquec/Portfolio/actions/workflows/github-pages.yml)

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
