// FIXME: Remove when `Promise.withResolvers` is widely available.

import type {
  PromiseRejector,
  PromiseResolver,
  PromiseWithResolvers,
} from "./promise-with-resolvers";

export function withResolvers<T>(): PromiseWithResolvers<T> {
  let resolve: PromiseResolver<T> = Boolean;
  let reject: PromiseRejector = Boolean;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}
