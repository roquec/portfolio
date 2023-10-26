<h1 align="center">roquec.com</h1>

<p align="center">
<code><a href="https://roquec.com/">roquec.com</a></code> |
<code><a href="https://github.com/roquec/portfolio">source</a></code> |
<code><a href="https://roquec.com/projects/portfolio-website/">project</a></code>
</p>

<p align="center">
  <a href="https://github.com/roquec/Portfolio/actions">
    <img alt="CI/CD Workflow" src="https://img.shields.io/github/actions/workflow/status/roquec/Portfolio/ci-cd.yml?logo=github&labelColor=333333&cacheSeconds=300"></a>
  <a href="https://htmlpreview.github.io/?https://gist.githubusercontent.com/roquec/3f8ee5d85053832ea374a05b301f57aa/raw/report.html">
    <img alt="Lighthouse performance badge" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Fperformance.json&logo=lighthouse&label=Performance&labelColor=333333&cacheSeconds=300"></a>
  <a href="https://htmlpreview.github.io/?https://gist.githubusercontent.com/roquec/3f8ee5d85053832ea374a05b301f57aa/raw/report.html">
    <img alt="Lighthouse accessibility badge" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Faccessibility.json&logo=lighthouse&label=Accessibility&labelColor=333333&cacheSeconds=300"></a>
  <a href="https://htmlpreview.github.io/?https://gist.githubusercontent.com/roquec/3f8ee5d85053832ea374a05b301f57aa/raw/report.html">
    <img alt="Lighthouse best-practices badge" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Fbest_practices.json&logo=lighthouse&label=Best-practices&labelColor=333333&cacheSeconds=300"></a>
  <a href="https://htmlpreview.github.io/?https://gist.githubusercontent.com/roquec/3f8ee5d85053832ea374a05b301f57aa/raw/report.html">
    <img alt="Lighthouse SEO badge" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Fseo.json&logo=lighthouse&label=SEO&labelColor=333333&cacheSeconds=300"></a>
</p>

---

Welcome to the repository of my personal portfolio website [roquec.com](https://roquec.com/). The site is built using `Jekyll`, styled to imitate `Visual Studio Code` and hosted on `GitHub Pages`. For more information check out [Portfolio Website Project](https://roquec.com/projects/portfolio-website/).

![Screenshot of roquec.com](https://roquec.com/projects/portfolio-website/thumbnail.webp)


## Preparation
Before running the website locally, follow these steps to prepare the environment.

### Installing Ruby:
1. Install Ruby latest version from [Ruby Installer](https://rubyinstaller.org/).
2. Choose `MSYS2 and MINGW development tool chain` option during installation.
3. Verify with installation `ruby -v` `gem -v`.

### Downloading Repository and Dependencies:
1. Clone portfolio repository.
```shell
git clone https://github.com/roquec/portfolio.git
```
2. Navigate to directory.
```shell
cd portfolio
```
3. Run [install script](https://github.com/roquec/portfolio/blob/main/scripts/install.ps1) to install bundler and gems.
```shell
.\scripts\install.ps1
```

## Development
Once your environment is set up, here's how to run and develop the site locally.

### Running Locally

Execute [serve script](https://github.com/roquec/portfolio/blob/main/scripts/serve.ps1) to build the site and serve it locally:

```shell
.\scripts\serve.ps1
```

This will generate the output in `./_site` and update it when the source in `src` is modified.

The site will be available at `http://127.0.0.1:4000/`.

*Note: changes to `_config.yml` file will not be automatically applied and require a manual re-build of the site*

### Project Structure

```
portfolio
  |-.github         -> Workflows and scripts used for GitHub Actions CI/CD pipeline
  |-_site           -> Autogenerated Jekyll output site directory
  |-scripts         -> Management scripts like 'serve.ps1' or 'install.ps1'
  |-src             -> Source code for Jekyll site
    |-_html         -> HTML layouts and includes
    |-_js           -> Javascript files to be bundled into scripts.js
    |-_sass         -> SASS files to be bundled into styles.css
    |-assets        -> Static assets like images, fonts...
    |-content       -> Content of the site like articles, projects and other posts
    |-_config.yml   -> Jekyll configuration file
    |-index.html    -> Root level files
    ...
```

## Deployment

This website is hosted on [GitHub Pages](https://pages.github.com/), and it is released on every new change to the `main` branch. The build and release of the website is entirely done via `GitHub Actions`. The workflow that handles the release is [ci-cd.yml](https://github.com/roquec/portfolio/blob/main/.github/workflows/ci-cd.yml).

![CI/CD Pipeline Image](https://roquec.com/projects/portfolio-website/workflow.webp)

### Build Job
This job does the following:
1. Execute [set-placeholders.ps1](https://github.com/roquec/portfolio/blob/main/.github/actions/set-placeholders.ps1) script to fill in data like the [version information](https://roquec.com/version).
2. Build the Jekyll site.
3. Execute [asset-hash.ps1](https://github.com/roquec/portfolio/blob/main/.github/actions/asset-hash.ps1) to generate hashes for all static assets and append them to the links.
4. Upload resulting artifact.

### Deploy Job
This job simply publishes the previously generated artifact (the `_site` folder) to GitHub Pages.

### Lighthouse Job
This job runs automated Lighthouse tests on the deployed site and publishes the [results](https://htmlpreview.github.io/?https://gist.githubusercontent.com/roquec/3f8ee5d85053832ea374a05b301f57aa/raw/report.html) so we can have cool badges like this:

<a href="https://htmlpreview.github.io/?https://gist.githubusercontent.com/roquec/3f8ee5d85053832ea374a05b301f57aa/raw/report.html">
  <img alt="Lighthouse performance badge" src="https://img.shields.io/endpoint?url=https%3A%2F%2Fgist.githubusercontent.com%2Froquec%2F3f8ee5d85053832ea374a05b301f57aa%2Fraw%2Fperformance.json&logo=lighthouse&label=Performance&labelColor=333333&cacheSeconds=300"></a>


## References
* [Jekyll](https://jekyllrb.com/) (site generator)
* [Visual Studio Code](https://code.visualstudio.com/) (style reference)

## License
This project is open sourced under the [MIT License](https://github.com/roquec/portfolio/blob/main/LICENSE).

## Contact
Got questions or feedback? Feel free to reach out at [&#99;&#x6f;&#110;&#116;&#97;&#99;&#116;&#64;&#114;&#x6f;&#x71;&#117;&#x65;&#99;&#x2e;&#99;&#x6f;&#109;](&#x6d;&#97;&#x69;&#x6c;&#116;&#111;&#x3a;&#99;&#x6f;&#110;&#116;&#97;&#99;&#116;&#64;&#114;&#x6f;&#x71;&#117;&#x65;&#99;&#x2e;&#99;&#x6f;&#109;) or [create an issue](https://github.com/roquec/portfolio/issues) on GitHub.
