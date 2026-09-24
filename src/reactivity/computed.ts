import { createSignal } from "./signal";
import { createEffect } from "./effect";

export function createComputed<T>(fn: () => T): () => T {
  // Internally, a computed value is just a signal that gets
  // updated automatically whenever its dependencies change
  const [read, write] = createSignal<T>(fn());

  createEffect(() => {
    write(fn());
  });

  return read;
}