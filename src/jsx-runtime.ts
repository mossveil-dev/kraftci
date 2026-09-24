import { createEffect } from "./reactivity/effect";

type Props = Record<string, unknown> & { children?: unknown };

// Called by TypeScript for every JSX element, e.g. <div id="app">...</div>
export function jsx(
  type: string | ((props: Props) => Node),
  props: Props
): Node {
  // If `type` is a function, it's a component — just call it
  if (typeof type === "function") {
    return type(props);
  }

  // Otherwise, `type` is a tag name string — create a real DOM element
  const element = document.createElement(type);
  const { children, ...attributes } = props;

  for (const [key, value] of Object.entries(attributes)) {
    if (key.startsWith("on") && typeof value === "function") {
      // e.g. onClick -> click
      element.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
    } else if (typeof value === "function") {
      // Reactive attribute, e.g. value={count}
      createEffect(() => {
        element.setAttribute(key, String((value as () => unknown)()));
      });
    } else {
      element.setAttribute(key, String(value));
    }
  }

  appendChildren(element, children);
  return element;
}

function appendChildren(parent: Node, children: unknown): void {
  if (children == null) return;

  if (Array.isArray(children)) {
    children.forEach((child) => appendChildren(parent, child));
    return;
  }

  if (typeof children === "function") {
    // Reactive text, e.g. {count}
    const textNode = document.createTextNode("");
    createEffect(() => {
      textNode.textContent = String((children as () => unknown)());
    });
    parent.appendChild(textNode);
    return;
  }

  if (children instanceof Node) {
    parent.appendChild(children);
    return;
  }

  // Static string/number
  parent.appendChild(document.createTextNode(String(children)));
}

export { jsx as jsxs }; // used by TS for elements with multiple children

export function Fragment(props: Props): Node {
  const fragment = document.createDocumentFragment();
  appendChildren(fragment, props.children);
  return fragment;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Allow any standard HTML tag for now (e.g. div, button, span, etc.)
      [elemName: string]: Record<string, unknown>;
    }
    interface Element extends Node {}
  }
}