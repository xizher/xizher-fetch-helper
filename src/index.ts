/* eslint-disable @typescript-eslint/ban-types */
import { baseUtils } from '@xizher/js-utils'

export type IBody = BodyInit | Object

export interface ICreateFetch {
  setUrl (url: string) : ICreateFetch
  setBody (body: string, reset?: boolean) : ICreateFetch
  setHeaders (headers: HeadersInit) : ICreateFetch
  setParams (params: Object) : ICreateFetch
  mountGet () : Promise<Response>
  mountPost () : Promise<Response>
}

class FetchStore {
  public url: string
  public headers: HeadersInit = {}
  public body: IBody = {}
  public params: Object = {}
}

function qs (params: Object) : string {
  return Object
    .entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}

function createFetch () : ICreateFetch {
  const store = new FetchStore()
  const ret = {
    setUrl (url: string) {
      store.url = url
      return ret
    },
    setHeaders (headers: HeadersInit) {
      baseUtils.$extend(true, store.headers, headers)
      return ret
    },
    setBody (body: IBody, reset = false) {
      if (reset) {
        store.body = body
      } else {
        baseUtils.$extend(true, store.body, body)
      }
      return ret
    },
    setParams (params: Object) {
      baseUtils.$extend(true, store.params, params)
      return ret
    },
    mountGet () {
      const params = qs(store.params)
      let url = store.url
      if (params) {
        url = `${url}?${store.params}`
      }
      return fetch(url, {
        method: 'GET',
        headers: store.headers,
      })
    },
    mountPost () {
      const params = qs(store.params)
      let url = store.url
      if (params) {
        url = `${url}?${store.params}`
      }
      return fetch(url, {
        method: 'POST',
        body: store.body as BodyInit,
        headers: store.headers,
      })
    }
  }
  return ret
}

export default createFetch
