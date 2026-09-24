import { createSignal } from "./index";

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <button onClick={() => setCount(count() + 1)}>
      Count: {count}
    </button>
  );
}

const app = document.getElementById("app")!;
app.appendChild(Counter());