<h1 align="center">🦖 Ducusaurus Plugin Relative Paths</h1>
<h3 align="center">Convert absolute paths to relative paths. Make the build files accessible from anywhere without a server.</h3>

<p align="center">
  <a href="https://www.npmjs.com/package/docusaurus-plugin-relative-paths">
    <img alt="npm" src="https://img.shields.io/npm/v/docusaurus-plugin-relative-paths">
  </a>
  <a href="https://github.com/ohkimur/docusaurus-plugin-relative-paths/actions/workflows/ci.yml">
    <img alt="CI" src="https://github.com/ohkimur/docusaurus-plugin-relative-paths/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
  <a href="https://github.com/ohkimur/docusaurus-plugin-relative-paths/issues">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/ohkimur/docusaurus-plugin-relative-paths">
  </a>
</p>

## Installation

If using **npm**, run the following commnad:

```sh
npm i docusaurus-plugin-relative-paths
```

If using **yarn**, run the following commnad:

```sh
yarn add docusaurus-plugin-relative-paths
```

## Usage

In `docusaurus.config.js`, add the following code:

```js
module.exports = {
  // ...
  plugins: ['docusaurus-plugin-relative-paths'],
};
