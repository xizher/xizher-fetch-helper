/* eslint-disable @typescript-eslint/ban-types */
import { baseUtils } from '@xizher/js-utils';
class FetchStore {
    constructor() {
        this.headers = {};
        this.body = {};
        this.params = {};
    }
}
function qs(params) {
    return Object
        .entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
}
function createFetch() {
    const store = new FetchStore();
    const ret = {
        setUrl(url) {
            store.url = url;
            return ret;
        },
        setHeaders(headers) {
            baseUtils.$extend(true, store.headers, headers);
            return ret;
        },
        setBody(body, reset = false) {
            if (reset) {
                store.body = body;
            }
            else {
                baseUtils.$extend(true, store.body, body);
            }
            return ret;
        },
        setParams(params) {
            baseUtils.$extend(true, store.params, params);
            return ret;
        },
        mountGet() {
            const params = qs(store.params);
            let url = store.url;
            if (params) {
                url = `${url}?${params}`;
            }
            return fetch(url, {
                method: 'GET',
                headers: store.headers,
            });
        },
        mountPost() {
            const params = qs(store.params);
            let url = store.url;
            if (params) {
                url = `${url}?${params}`;
            }
            return fetch(url, {
                method: 'POST',
                body: store.body,
                headers: store.headers,
            });
        }
    };
    return ret;
}
export default createFetch;
