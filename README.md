<a href="https://github.com/roquec/Portfolio/actions">
<img alt="CI/CD Workflow" src="https://img.shields.io/github/actions/workflow/status/roquec/Portfolio/ci-cd.yml?logo=github&labelColor=333333">
</a>

<a href="https://github.com/roquec/Portfolio/actions">
<img alt="Lighthouse performance badge" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Fc3d9392d1ca5bbfb208022e2e8a19d7aee33694e%2Fperformance.json&logo=lighthouse&logoColor=F56541&labelColor=333333&link=https%3A%2F%2Fgithub.com%2Froquec%2FPortfolio%2Factions">
</a>

<a href="https://github.com/roquec/Portfolio/actions">
<img alt="Lighthouse accessibility badge" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Fc3d9392d1ca5bbfb208022e2e8a19d7aee33694e%2Faccessibility.json&logo=lighthouse&logoColor=F56541&labelColor=333333&link=https%3A%2F%2Fgithub.com%2Froquec%2FPortfolio%2Factions">
</a>

<a href="https://github.com/roquec/Portfolio/actions">
<img alt="Lighthouse best-practices badge" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Fc3d9392d1ca5bbfb208022e2e8a19d7aee33694e%2FbestPractices.json&logo=lighthouse&logoColor=F56541&labelColor=333333&link=https%3A%2F%2Fgithub.com%2Froquec%2FPortfolio%2Factions">
</a>

<a href="https://github.com/roquec/Portfolio/actions">
<img alt="Lighthouse SEO badge" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Fc3d9392d1ca5bbfb208022e2e8a19d7aee33694e%2Fseo.json&logo=lighthouse&logoColor=F56541&labelColor=333333&link=https%3A%2F%2Fgithub.com%2Froquec%2FPortfolio%2Factions">
</a>

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
