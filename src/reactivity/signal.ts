type Subscriber = () => void;

// Tracks which subscriber is currently reading signals
let activeSubscriber: Subscriber | null = null;

export function createSignal<T>(initialValue: T): [() => T, (value: T) => void] {
  let value = initialValue;
  const subscribers = new Set<Subscriber>();

  // Getter: reads the value and registers the active subscriber
  const read = (): T => {
    if (activeSubscriber) {
      subscribers.add(activeSubscriber);
    }
    return value;
  };

  // Setter: updates the value and notifies all registered subscribers
  const write = (newValue: T): void => {
    if (Object.is(value, newValue)) return; // skip if value is unchanged
    value = newValue;
    subscribers.forEach((subscriber) => subscriber());
  };

  return [read, write];
}

// Used internally by effect.ts to set the currently active subscriber
export function setActiveSubscriber(subscriber: Subscriber | null): void {
  activeSubscriber = subscriber;
}