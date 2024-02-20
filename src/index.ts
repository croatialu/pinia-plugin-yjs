import type { PiniaPlugin } from 'pinia'
import type * as Y from 'yjs'
import type { ShallowRef } from 'vue'
import { shallowRef, watch } from 'vue'
import { patchSharedType, patchStore } from './lib/patching'
import type { YjsStateFactoryOptions, YjsStateOptions } from './types'
import { normalizeOptions } from './normalize'

export {
  YjsStateOptions,
}

export function createPiniaYJSPlugin(
  factoryOptions: YjsStateFactoryOptions = {},
): PiniaPlugin {
  return ({ store, options,
  }) => {
    const pluginOptions = normalizeOptions(options, factoryOptions)

    // The root Y.Map that the store is written and read from.

    const docRef: ShallowRef<Y.Doc | undefined> = shallowRef(pluginOptions.doc)

    const clears: (() => void)[] = []

    watch(docRef, (doc) => {
      while (clears.length) {
        const clearFn = clears.pop()
        clearFn?.()
      }

      if (!doc || !pluginOptions.sharing)
        return

      const map = doc.getMap(`YJS-${store.$id}`)

      const clear = store.$subscribe((mutation, state) => {
        const pureState = JSON.parse(JSON.stringify(state))

        doc.transact(() =>
          patchSharedType(map, pureState))
      })

      clears.push(clear)

      const handler = () => {
        patchStore(store, map.toJSON())
      }

      map.observeDeep(handler)
      clears.push(() => {
        map.unobserveDeep(handler)
      })
    }, { immediate: true })
  }
}

export default createPiniaYJSPlugin()
