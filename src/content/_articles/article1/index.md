---
tags: [ consectetur, elit, odio, adipiscing ]
title: Article 1
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris orci odio, porta id erat malesuada, vulputate lacinia
eros. Curabitur ut sem vitae odio facilisis scelerisque in ut magna. Suspendisse interdum metus id metus ultricies,
vitae vestibulum leo commodo. Pellentesque fringilla lacus sed purus iaculis, non sagittis lorem tristique. Fusce
tristique diam et dui egestas faucibus. In fermentum pretium dapibus. Etiam neque lectus, egestas ut auctor vel,
interdum vel tortor. Morbi vitae odio auctor, tristique quam eu, fermentum elit. Fusce ac magna dolor. Nunc eget ligula
sem. Proin nunc augue, tempus ac mauris at, ultricies mattis urna. Integer ac nisi at dolor pretium ornare vel in justo.
Nam id lectus non metus vehicula ultricies.

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
