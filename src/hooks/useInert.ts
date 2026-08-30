import { useEffect, useRef } from "react";

/**
 * Marks an element inert — removed from the tab order and the accessibility
 * tree — while `active` is true.
 *
 * This is applied imperatively rather than as a JSX prop on purpose. React 19
 * emits `inert` as an attribute during SSR but applies it as a DOM property on
 * the client, so rendering it declaratively produces a hydration mismatch.
 * Setting it after mount sidesteps that entirely: the server and the client
 * both render no attribute, and the behaviour is attached afterwards.
 */
export function useInert<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) el.inert = active;
  }, [active]);

  return ref;
}
