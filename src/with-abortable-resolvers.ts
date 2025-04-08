import type { PromiseWithResolvers } from "./promise-with-resolvers";
import { withAbortSignal } from "./with-abort-signal";
import { withResolvers } from "./with-resolvers";

export function withAbortableResolvers<T>(
  signal?: AbortSignal,
): PromiseWithResolvers<T> {
  return withAbortSignal(withResolvers(), signal);
}
