export declare type IBody = BodyInit | Object;
export interface ICreateFetch {
    setUrl(url: string): ICreateFetch;
    setBody(body: string, reset?: boolean): ICreateFetch;
    setHeaders(headers: HeadersInit): ICreateFetch;
    setParams(params: Object): ICreateFetch;
    mountGet(): Promise<Response>;
    mountPost(): Promise<Response>;
}
declare function createFetch(): ICreateFetch;
export default createFetch;
