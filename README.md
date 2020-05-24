AssemblyScript's Website
========================

The site is built with [VuePress](https://vuepress.vuejs.org/) and reuses its default theme to ease upgrading to newer versions.

The more important files are:

* [docs/**/*.md](./docs)<br />
  Documentation and site contents.
* [docs/.vuepress/sidebar.js](./docs/.vuepress/sidebar.js)<br />
  Sidebar contents.
* [docs/.vuepress/nav.js](./docs/.vuepress/nav.js)<br />
  Top-navigation contents.
* [docs/.vuepress/redirects](./docs/.vuepress/redirects)<br />
  Redirect map of (re)moved pages to new locations.
* [docs/.vuepress/public/](./docs/.vuepress/public)<br />
  Assets folder for images etc.
* [docs/.vuepress/styles/index.styl](./docs/.vuepress/styles/index.styl)<br />
  Additional styling rules.

Building
--------

To work on the site locally, install the dependencies and start a development server serving at [localhost:8080](http://localhost:8080/):

```sh
npm install
npm start
```

To build the site to `docs/.vuepress/dist`, i.e. to verify that it works as expected:

```sh
npm run build
```

The page is automatically rebuilt and updated on pushes to the repository.
