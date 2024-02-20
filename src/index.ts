import type { PiniaPlugin } from 'pinia'
import type * as Y from 'yjs'
import { patchSharedType, patchStore } from './lib/patching'

interface PiniaYJSPluginOptions {
  doc: Y.Doc
}
export function createPiniaYJSPlugin({ doc }: PiniaYJSPluginOptions): PiniaPlugin {
  return ({ store }) => {
    // The root Y.Map that the store is written and read from.
    const map: Y.Map<any> = doc.getMap(`YJS-${store.$id}`)

    store.$subscribe((mutation, state) => {
      const pureState = JSON.parse(JSON.stringify(state))

      doc.transact(() =>
        patchSharedType(map, pureState))
    })

    map.observeDeep(() => {
      patchStore(store, map.toJSON())
    })
  }
}
