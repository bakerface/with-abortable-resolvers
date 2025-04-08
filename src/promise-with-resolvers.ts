export type PromiseResolver<T> = (value: T | PromiseLike<T>) => void;
export type PromiseRejector = (reason?: any) => void;

export interface PromiseWithResolvers<T> {
  promise: Promise<T>;
  resolve: PromiseResolver<T>;
  reject: PromiseRejector;
}
