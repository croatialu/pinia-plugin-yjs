import type { YjsStateFactoryOptions, YjsStateOptions } from './types'

function isObject(v: unknown) {
  return typeof v === 'object' && v !== null
}

export function normalizeOptions(
  options: boolean | YjsStateOptions | undefined,
  factoryOptions: YjsStateFactoryOptions,
): YjsStateOptions {
  options = isObject(options) ? options : Object.create(null)

  return new Proxy(options as object, {
    get(target, key, receiver) {
      if (key === 'key')
        return Reflect.get(target, key, receiver)

      return (
        Reflect.get(target, key, receiver)
        || Reflect.get(factoryOptions, key, receiver)
      )
    },
  })
}
