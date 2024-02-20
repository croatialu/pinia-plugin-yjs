# pinia-plugin-yjs

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

## Example

``` ts
import { createPinia } from 'pinia'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { createPiniaYJSPlugin } from 'pinia-plugin-yjs'

const ydoc = new Y.Doc()

const webrtcProvider = new WebrtcProvider('roomName', ydoc, { signaling: ['ws://localhost:4444'] })
const pinia = createPinia()

pinia.use(createPiniaYJSPlugin({ doc: ydoc }))

defineStore('todo', () => {
  // xxx
  return {
    // ...
  }
}, {
  // enable sharing
  sharing: true,
})
```

## Thanks

- [zustand-middleware-yjs](https://github.com/joebobmiles/zustand-middleware-yjs)

## License

[MIT](./LICENSE) License © 2023-PRESENT [croatialu](https://github.com/croatialu)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/pinia-plugin-yjs?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/pinia-plugin-yjs
[npm-downloads-src]: https://img.shields.io/npm/dm/pinia-plugin-yjs?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/pinia-plugin-yjs
[bundle-src]: https://img.shields.io/bundlephobia/minzip/pinia-plugin-yjs?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=pinia-plugin-yjs
[license-src]: https://img.shields.io/github/license/antfu/pinia-plugin-yjs.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/antfu/pinia-plugin-yjs/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/pinia-plugin-yjs
