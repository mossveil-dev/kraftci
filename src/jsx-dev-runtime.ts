import { jsx, jsxs, Fragment } from "./jsx-runtime";

export function jsxDEV(
  type: Parameters<typeof jsx>[0],
  props: Parameters<typeof jsx>[1]
): ReturnType<typeof jsx> {
  return jsx(type, props);
}

export { Fragment };