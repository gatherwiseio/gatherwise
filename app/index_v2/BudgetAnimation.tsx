"use client";

/**
 * "Budgets" product motion — ported from the Claude Design project
 * `Budgets Abstract.dc.html` (budget-abstract.jsx).
 *
 * Third port from that project, on the same terms as ChecklistAnimation and
 * VendorAnimation: the ~55KB authoring engine (animations-v3.jsx) does not
 * ship, only its contract — a looping authored clock `T` in seconds, a `CUES`
 * table of scene start times, and three easings.
 *
 * Substitutions, matching the other two: Playfair Display / DM Sans become the
 * page's own display + body fonts, and the design's #B4874A accent becomes the
 * site gold. The design's camera — a 1.0→1.04 push in on each recalculation —
 * is dropped, so the sheet holds one size and the row stays still.
 *
 * Cost control: the frame loop only runs once half the sheet has scrolled into
 * view and the tab is visible, and stops entirely under prefers-reduced-motion
 * (which holds the settled last frame). Loaded lazily — see
 * BudgetAnimationMount.
 */

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

/* ---------------------------------------------------------------- the clock */

// Verbatim from the design's OM_SCENES.
const SCENES: ReadonlyArray<readonly [string, number]> = [
  ["Sheet", 2.4],
  ["Actual", 2.6],
  ["Pay", 2.8],
  ["Settle", 1],
];

const CUES: Record<string, number> = {};
let acc = 0;
for (const [name, dur] of SCENES) {
  CUES[name] = Math.round(acc * 1000) / 1000;
  acc += dur;
}
const TOTAL = Math.round(acc * 1000) / 1000;
const C = CUES;

/* --------------------------------------------------------------- primitives */

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const EO = (t: number) => (t - 1) * (t - 1) * (t - 1) + 1;
const EB = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

type Ease = (t: number) => number;

function seg(t: number, a: number, b: number, e?: Ease) {
  return (e || EO)(clamp((t - a) / Math.max(0.0001, b - a), 0, 1));
}

const MOTION = {
  enter: (t: number, at: number, d?: number) => seg(t, at, at + (d || 0.45), EO),
  pop: (t: number, at: number, d?: number) => EB(clamp((t - at) / (d || 0.45), 0, 1)),
};

const money = (n: number) => {
  const r = Math.round(n);
  return (r < 0 ? "-$" : "$") + Math.abs(r).toLocaleString("en-US");
};

/* ------------------------------------------------------------------ palette */

const INK = "#241F17";
const LINE = "#EAE4D9";
const BAR = "#EDE7DC";
const GOLDBG = "#FDF6EA";
const GOLDLN = "#C99A55";
const GOLDINK = "#6F5320";
const ACCENT = "#b8935f";

const SANS = "var(--gw-font-body)";
const SERIF = "var(--gw-font-display)";

/* -------------------------------------------------------------------- sheet */

const CW = 1920;
const CH = 1080;
const CARD_W = 1240;
const COLS = "1.5fr 1fr 1fr 1fr 1fr 1fr";

type Row = {
  real?: string;
  est: number;
  act: number | null;
  paid: number | null;
  w: number;
};
type Cat = { name: string; collapsed?: boolean; rows: Row[] };

// est / act / paid — the coordination row is animated, the rest are fixed. The
// `w` on each other row is the width of its placeholder bar.
const CATS: ReadonlyArray<Cat> = [
  {
    name: "Wedding Planner",
    rows: [
      { real: "Coordination fees", est: 4500, act: null, paid: null, w: 0 },
      { est: 1200, act: 1200, paid: 1200, w: 148 },
      { est: 800, act: 750, paid: 0, w: 112 },
    ],
  },
  {
    name: "Beauty",
    rows: [
      { est: 2400, act: 2400, paid: 1200, w: 132 },
      { est: 900, act: 880, paid: 880, w: 104 },
      { est: 600, act: 600, paid: 0, w: 156 },
    ],
  },
  {
    name: "Rings",
    collapsed: true,
    rows: [
      { est: 6500, act: 6400, paid: 6400, w: 120 },
      { est: 1800, act: 1800, paid: 900, w: 164 },
    ],
  },
  {
    name: "Venue",
    collapsed: true,
    rows: [
      { est: 18000, act: 18000, paid: 9000, w: 140 },
      { est: 3200, act: 3150, paid: 3150, w: 108 },
      { est: 1500, act: 1500, paid: 0, w: 152 },
    ],
  },
  {
    name: "Officiant",
    collapsed: true,
    rows: [
      { est: 900, act: 900, paid: 900, w: 116 },
      { est: 350, act: 350, paid: 0, w: 96 },
    ],
  },
  {
    name: "Bride Fashion",
    collapsed: true,
    rows: [
      { est: 3800, act: 3700, paid: 3700, w: 128 },
      { est: 950, act: 950, paid: 0, w: 104 },
    ],
  },
  {
    name: "Groom Fashion",
    collapsed: true,
    rows: [
      { est: 1400, act: 1350, paid: 1350, w: 136 },
      { est: 450, act: 450, paid: 0, w: 92 },
    ],
  },
];

const COORD_ACT = 4200;
const COORD_PAID = 1400;

/* ------------------------------------------------------------------- pieces */

function Bar({
  w,
  h = 12,
  c = BAR,
  o = 1,
}: {
  w: number | string;
  h?: number;
  c?: string;
  o?: number;
}) {
  return (
    <div
      style={{ width: w, height: h, borderRadius: 8, background: c, opacity: o, flex: "0 0 auto" }}
    />
  );
}

function Num({
  v,
  b = false,
  s = 20,
  c = INK,
}: {
  v: string;
  b?: boolean;
  s?: number;
  c?: string;
}) {
  return (
    <div
      style={{
        font: (b ? "600 " : "400 ") + s + "px " + SANS,
        color: c,
        textAlign: "right",
        whiteSpace: "nowrap",
      }}
    >
      {v}
    </div>
  );
}

function NumBar({ w, c, o }: { w: number; c?: string; o?: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Bar w={w} h={11} c={c} o={o} />
    </div>
  );
}

function Chevron({ open, size = 18 }: { open: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={INK}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        display: "block",
        flex: "0 0 auto",
        transform: open ? "none" : "rotate(-90deg)",
      }}
    >
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  );
}

function Caret({ T }: { T: number }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: 2.5,
        height: 20,
        background: ACCENT,
        marginLeft: 2,
        verticalAlign: "-3px",
        opacity: Math.floor(T * 2.4) % 2 === 0 ? 0.9 : 0.12,
      }}
    />
  );
}

/* ------------------------------------------------------------- the sequence */

function Piece({ T, cardRef }: { T: number; cardRef: React.Ref<HTMLDivElement> }) {
  /* typing the actual amount */
  const tA = C.Actual + 0.4;
  const tB = C.Actual + 1.7;
  const digits = String(COORD_ACT);
  const typedN = Math.round(clamp((T - tA) / (tB - tA), 0, 1) * digits.length);
  const typingActive = T > tA && typedN < digits.length;
  const actLocked = T >= tB;
  const coordAct = actLocked
    ? COORD_ACT
    : typedN > 0
      ? parseInt(digits.slice(0, typedN), 10)
      : 0;

  /* paying the first third */
  const pA = C.Pay + 0.5;
  const pB = C.Pay + 1.6;
  const pDigits = String(COORD_PAID);
  const paidN = Math.round(clamp((T - pA) / (pB - pA), 0, 1) * pDigits.length);
  const payTyping = T > pA && paidN < pDigits.length;
  const paidLocked = T >= pB;
  const coordPaid = paidLocked
    ? COORD_PAID
    : paidN > 0
      ? parseInt(pDigits.slice(0, paidN), 10)
      : 0;

  /* totals recomputed from the live values */
  const tot = { est: 0, act: 0, paid: 0 };
  const catTot = CATS.map((cat) => {
    const s = { est: 0, act: 0, paid: 0 };
    cat.rows.forEach((r) => {
      const act = r.real ? coordAct : (r.act ?? 0);
      const paid = r.real ? coordPaid : (r.paid ?? 0);
      s.est += r.est;
      s.act += act;
      s.paid += paid;
    });
    tot.est += s.est;
    tot.act += s.act;
    tot.paid += s.paid;
    return s;
  });
  const diff = tot.est - tot.act;
  const due = tot.act - tot.paid;
  const coordDiff = 4500 - coordAct;
  const coordDue = coordAct - coordPaid;

  const hl = clamp(seg(T, C.Actual - 0.4, C.Actual - 0.05), 0, 1);
  // a ring that blooms on the grand total each time it recalculates
  const flashT = (at: number) => clamp(seg(T, at, at + 0.25) - seg(T, at + 0.5, at + 1.1), 0, 1);
  const totalFlash = Math.max(flashT(C.Actual + 1.7), flashT(C.Pay + 1.6));

  const appear = MOTION.enter(T, 0.15, 0.6);
  const fade = Math.max(1 - seg(T, 0, 0.4), seg(T, TOTAL - 0.35, TOTAL));

  const head: CSSProperties = {
    font: "600 13px " + SANS,
    letterSpacing: ".12em",
    color: "#B0A794",
    textAlign: "right",
  };
  const rowGrid: CSSProperties = {
    display: "grid",
    gridTemplateColumns: COLS,
    gap: 20,
    alignItems: "center",
  };

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - fade }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: CW,
          height: CH,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          ref={cardRef}
          style={{
            width: CARD_W,
            background: "#fff",
            borderRadius: 24,
            border: "1px solid " + LINE,
            boxShadow: "0 26px 70px rgba(48,36,16,0.16)",
            overflow: "hidden",
            opacity: appear,
            transform: "translateY(" + (1 - appear) * 24 + "px)",
          }}
        >
          <div style={{ padding: "28px 34px 0", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ font: "600 28px " + SERIF, color: INK }}>Budget</div>
            <div style={{ marginLeft: "auto" }}>
              <Bar w={80} h={11} />
            </div>
          </div>

          {/* column heads */}
          <div style={{ marginTop: 20, padding: "0 34px 12px", ...rowGrid }}>
            <div
              style={{
                font: "600 13px " + SANS,
                letterSpacing: ".12em",
                color: "#B0A794",
              }}
            >
              CATEGORY
            </div>
            <div style={head}>ESTIMATED</div>
            <div style={head}>ACTUAL</div>
            <div style={head}>DIFFERENCE</div>
            <div style={head}>PAID</div>
            <div style={head}>DUE</div>
          </div>

          {/* grand total */}
          <div
            style={{
              margin: "0 34px",
              padding: "18px 20px",
              borderRadius: 12,
              background: GOLDBG,
              border: "1.5px solid " + GOLDLN,
              boxShadow:
                "0 0 0 " + totalFlash * 5 + "px rgba(184,147,95," + totalFlash * 0.16 + ")",
              ...rowGrid,
            }}
          >
            <div style={{ font: "700 22px " + SANS, color: INK }}>Grand total</div>
            <Num v={money(tot.est)} b s={22} />
            <Num v={money(tot.act)} b s={22} />
            <Num v={money(diff)} b s={22} c={diff < 0 ? "#A2503C" : "#4F6A48"} />
            <Num v={money(tot.paid)} b s={22} c={GOLDINK} />
            <Num v={money(due)} b s={22} />
          </div>

          {/* categories */}
          <div style={{ marginTop: 18, paddingBottom: 26 }}>
            {CATS.map((cat, ci) => {
              const ce = MOTION.enter(T, 0.4 + ci * 0.12, 0.5);
              void catTot[ci];
              return (
                <div
                  key={cat.name}
                  style={{ opacity: ce, transform: "translateY(" + (1 - ce) * 10 + "px)" }}
                >
                  <div
                    style={{
                      padding: "13px 54px 13px 34px",
                      borderTop: "1px solid #F2EDE4",
                      background: "#FBF9F5",
                      ...rowGrid,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Chevron open={!cat.collapsed} />
                      <div style={{ font: "600 21px " + SANS, color: INK }}>{cat.name}</div>
                    </div>
                    <NumBar w={92} c="#E2DACC" />
                    <NumBar w={92} c="#E2DACC" />
                    <NumBar w={70} c="#E2DACC" />
                    <NumBar w={86} c="#E2DACC" />
                    <NumBar w={86} c="#E2DACC" />
                  </div>
                  {!cat.collapsed &&
                    cat.rows.map((r, ri) => {
                      const isCoord = !!r.real;
                      return (
                        <div
                          key={ri}
                          style={{
                            padding: "12px 54px 12px 68px",
                            borderTop: "1px solid #F6F2EA",
                            background: isCoord
                              ? "rgba(251,241,223," + hl * 0.9 + ")"
                              : "transparent",
                            ...rowGrid,
                          }}
                        >
                          {isCoord ? (
                            <div style={{ font: "400 20px " + SANS, color: INK }}>{r.real}</div>
                          ) : (
                            <Bar w={r.w} />
                          )}
                          {isCoord ? <Num v={money(r.est)} /> : <NumBar w={r.w * 0.5} />}
                          {isCoord ? (
                            <div
                              style={{
                                textAlign: "right",
                                font: "400 20px " + SANS,
                                color: INK,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {actLocked
                                ? money(coordAct)
                                : typedN > 0
                                  ? "$" + digits.slice(0, typedN)
                                  : T > tA - 0.2
                                    ? ""
                                    : "—"}
                              {typingActive || (T > tA - 0.25 && typedN === 0) ? (
                                <Caret T={T} />
                              ) : null}
                            </div>
                          ) : (
                            <NumBar w={r.w * 0.46} />
                          )}
                          {isCoord ? (
                            <Num
                              v={coordAct ? money(coordDiff) : "—"}
                              c={coordDiff < 0 ? "#A2503C" : "#4F6A48"}
                            />
                          ) : (
                            <NumBar w={r.w * 0.34} />
                          )}
                          {isCoord ? (
                            <div
                              style={{
                                textAlign: "right",
                                font: "400 20px " + SANS,
                                color: GOLDINK,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {paidLocked
                                ? money(coordPaid)
                                : paidN > 0
                                  ? "$" + pDigits.slice(0, paidN)
                                  : coordAct
                                    ? T > pA - 0.2
                                      ? ""
                                      : "$0"
                                    : "—"}
                              {payTyping || (T > pA - 0.25 && paidN === 0 && T < pA + 0.2) ? (
                                <Caret T={T} />
                              ) : null}
                            </div>
                          ) : (
                            <NumBar w={r.w * 0.42} />
                          )}
                          {isCoord ? (
                            <Num v={coordAct ? money(coordDue) : "—"} />
                          ) : (
                            <NumBar w={r.w * 0.42} />
                          )}
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- the driver */

// The window onto the design's 1920×1080 stage. The sheet never changes size —
// nothing expands or collapses, only values and opacities do — so with the
// design's push-in camera removed the window is simply the card: its authored
// width, and its one height. That height is content-driven (seven categories,
// two of them expanded) rather than a number the design states, so it is
// measured off the built sheet instead of guessed. VIEW_H_HINT is only the
// pre-measurement reservation, and matches the aspect-ratio on .gw-banim.
const VIEW_W = CARD_W; // 1240
const VIEW_H_HINT = 840;

export default function BudgetAnimation() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [k, setK] = useState(0);
  const [t, setT] = useState(0);
  const [viewH, setViewH] = useState(VIEW_H_HINT);

  // Read the sheet's real height off the DOM and let it define the window.
  // Layout effect, so the corrected box lands in the same paint the card does —
  // and the card only exists once k is measured, hence the dependency.
  useLayoutEffect(() => {
    const h = cardRef.current?.offsetHeight;
    if (h) setViewH(h);
  }, [k]);

  // Fit the fixed 1920×1080 coordinate space to whatever width the column has.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setK(el.clientWidth / VIEW_W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // One rAF loop, running only while the figure is actually on screen and the
  // tab is in front. Reduced motion holds the settled final frame instead.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(TOTAL - 0.5);
      return;
    }

    let raf = 0;
    let last = 0;
    let time = 0;
    let onScreen = false;
    // Held on the first frame until half the sheet has scrolled into view, so
    // the sequence is always caught from its opening beat rather than
    // somewhere in the middle. After that first arming, any sliver on screen
    // is enough to keep it running.
    let armed = false;

    const step = (ts: number) => {
      if (!last) last = ts;
      time = (time + (ts - last) / 1000) % TOTAL;
      last = ts;
      setT(time);
      raf = requestAnimationFrame(step);
    };
    const start = () => {
      if (raf || !armed || !onScreen || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        onScreen = entry.isIntersecting;

        if (!armed && onScreen) {
          // rect maths rather than an intersectionRatio threshold, which a
          // sheet taller than the viewport could never reach
          const r = entry.boundingClientRect;
          armed = r.top + r.height / 2 <= window.innerHeight;
        }
        onScreen ? start() : stop();
      },
      // enough steps that the check re-runs as the sheet scrolls up, not just
      // when it first touches the edge
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    io.observe(el);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const viewX = CW / 2 - VIEW_W / 2; // 340
  const viewY = CH / 2 - viewH / 2;

  return (
    <div
      ref={boxRef}
      className="gw-banim"
      style={{ aspectRatio: `${VIEW_W} / ${viewH}` }}
    >
      {k > 0 && (
        <div
          className="gw-anim__stage"
          style={{
            transform: `translate(${-viewX * k}px, ${-viewY * k}px) scale(${k})`,
          }}
        >
          <Piece T={t} cardRef={cardRef} />
        </div>
      )}
    </div>
  );
}
