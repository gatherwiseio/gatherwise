/**
 * Shared scroll/visibility gate for the index_v2 motion pieces.
 *
 * Every animation on the page wants the same two things: stay parked until the
 * viewer has actually reached it, so the sequence is caught from its opening
 * beat rather than somewhere in the middle; and cost nothing while it is off
 * screen or the tab is in the background.
 *
 * The obvious way to write that — arm inside an IntersectionObserver callback,
 * off the entry's own boundingClientRect — has a hole, and it shows up as "I
 * came back to the tab and the animation never played". An IO callback only
 * fires when the intersection ratio crosses a threshold. If the viewer stops
 * scrolling while the element is intersecting but its midpoint has not yet
 * reached the bottom of the viewport, `armed` is evaluated once, as false, and
 * nothing schedules a re-evaluation: further scrolling inside the range it has
 * already crossed fires no callback, so the piece stays parked for the rest of
 * the visit. Leaving and re-entering the tab does not rescue it either, since
 * visibilitychange only re-reads the same stale flag.
 *
 * So the arming geometry is read live from getBoundingClientRect() on scroll,
 * resize, visibilitychange and pageshow — that last one because a bfcache
 * restore ("go back") replays no effects and may fire no visibilitychange — and
 * the observer is kept only as an extra nudge for movement no scroll event
 * reports, like images above the fold settling. The scroll listener is passive,
 * coalesced to a single rAF, and dropped the moment arming succeeds: arming is
 * one-way, so steady-state cost is the observer alone, exactly as before.
 *
 * `onChange` is called only when the answer actually flips.
 */

export function watchActivation(
  el: Element,
  onChange: (active: boolean) => void,
  // how far down the element the viewport's bottom edge has to reach before it
  // counts as reached. Rect maths rather than an intersectionRatio threshold,
  // which an element taller than the viewport could never hit.
  reveal = 0.5,
): () => void {
  let armed = false;
  let active: boolean | null = null;
  let raf = 0;
  let listening = false;

  // Declared as hoisted functions: emit() drops the scroll listener the first
  // time it arms, and schedule() is what that listener is registered as.
  function detach() {
    if (!listening) return;
    listening = false;
    window.removeEventListener("scroll", schedule);
  }

  function emit() {
    const r = el.getBoundingClientRect();
    const onScreen =
      r.height > 0 && r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;

    if (!armed && onScreen) {
      armed = r.top + r.height * reveal <= window.innerHeight;
      if (armed) detach();
    }

    const next = armed && onScreen && !document.hidden;
    if (next === active) return;
    active = next;
    onChange(next);
  }

  function schedule() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      emit();
    });
  }

  window.addEventListener("scroll", schedule, { passive: true });
  listening = true;
  window.addEventListener("resize", schedule);
  window.addEventListener("pageshow", emit);
  document.addEventListener("visibilitychange", emit);

  const io = new IntersectionObserver(schedule, {
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
  });
  io.observe(el);

  emit();

  return () => {
    if (raf) cancelAnimationFrame(raf);
    detach();
    window.removeEventListener("resize", schedule);
    window.removeEventListener("pageshow", emit);
    document.removeEventListener("visibilitychange", emit);
    io.disconnect();
  };
}
