export declare type IBody = BodyInit | Object;
declare function createFetch(): {
    setUrl(url: string): any;
    setHeaders(headers: HeadersInit): any;
    setBody(body: IBody, reset?: boolean): any;
    setParams(params: Object): any;
    mountGet(): Promise<Response>;
    mountPost(): Promise<Response>;
};
export default createFetch;
