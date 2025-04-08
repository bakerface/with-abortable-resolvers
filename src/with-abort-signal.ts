import type { PromiseWithResolvers } from "./promise-with-resolvers";

export function withAbortSignal<T>(
  pwr: PromiseWithResolvers<T>,
  signal?: AbortSignal,
): PromiseWithResolvers<T> {
  if (!signal) {
    return pwr;
  }

  const onAbort = () => pwr.reject(signal.reason);

  pwr.promise = pwr.promise.finally(() =>
    signal.removeEventListener("abort", onAbort),
  );

  signal.addEventListener("abort", onAbort);

  if (signal.aborted) {
    onAbort();
  }

  return pwr;
}
