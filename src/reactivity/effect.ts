import { setActiveSubscriber } from "./signal";

export function createEffect(fn: () => void): void {
  const execute = () => {
    // Mark this function as the active subscriber before running it,
    // so any signal read inside `fn` will register `execute` as a dependency
    setActiveSubscriber(execute);
    try {
      fn();
    } finally {
      // Clear the active subscriber after running, so signals read
      // outside of an effect don't accidentally get tracked
      setActiveSubscriber(null);
    }
  };

  // Run immediately on creation to register initial dependencies
  execute();
}