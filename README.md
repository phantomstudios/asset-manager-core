# @asset-manager/core

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

Package one-liner overview.

## Introduction

Loading and retrieving assets.

```typescript
import AssetManager from "@asset-manager/core";
import { AudioPlayer } from "@asset-manager/tone";

// Get an instance to the manager and set the loaders
const manager = AssetManager.getInstance();
manager.setLoaders({
  audio: AudioPlayer,
});

// Set the assets to load
manager.setAssets([
  {
    id: "splash",
    type: "audio",
    url: "splash.mp3",
    preload: true,
  },
]);

// Elsewhere in your app you can grab assets from the manager
const player = AssetManager.getInstance().get<AudioPlayer>("splash");
```

## Installation

Install this package with `npm`.

```bash
npm i @asset-manager/core
```

The core asset manager does not include any 'loaders'. You may want to load an official loader or create your own.

```bash
npm i @asset-manager/three
```

[npm-image]: https://img.shields.io/npm/v/@asset-manager/core.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@asset-manager/core
[npm-downloads-image]: https://img.shields.io/npm/dm/@asset-manager/core.svg
[npm-downloads-url]: https://npmcharts.com/compare/@asset-manager/core?minimal=true
[ci-image]: https://github.com/phantomstudios/asset-manager-core/workflows/Test/badge.svg
[ci-url]: https://github.com/phantomstudios/asset-manager-core/actions
