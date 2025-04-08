## withAbortableResolvers

The purpose of this package is to provide an ergonomic way to create abortable
promises in TypeScript. Consider the following example:

``` TypeScript
import { withAbortableResolvers } from "with-abortable-resolvers";

export function sleep<T>(ms: number, signal?: AbortSignal): Promise<void> {
  const { promise, resolve } = withAbortableResolvers<T>(signal);
  const handle = setTimeout(resolve, ms);
  return promise.finally(() => clearTimeout(handle));
}
```

In addition to drastically reducing the lines of code to implement abortable
async functions, this handles a few edge cases that are often overlooked. The
most common of these is forgetting to check if the AbortSignal was already
aborted prior to the async function call. Compare the above sleep
implementation to the equivalent implementation using the Promise contructor:

``` TypeScript
async function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    function cleanup() {
      clearTimeout(handle);
      signal?.removeEventListener("abort", onAbort);
    }

    function onAbort() {
      cleanup();
      reject(signal?.reason);
    }

    function onTimeout() {
      cleanup();
      resolve();
    }

    const handle = setTimeout(onTimeout, ms);

    signal?.addEventListener("abort", onAbort);

    if (signal?.aborted) {
      return onAbort();
    }
  });
}
```
