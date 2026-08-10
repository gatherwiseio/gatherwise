"use client";

/**
 * "Client checklists" product motion — ported from the Claude Design project
 * `Client Checklists Abstract.dc.html` (checklist-abstract.jsx).
 *
 * The design ran on animations-v3.jsx, a ~55KB authoring engine with a scrub
 * bar, scene editor, caption layer, watercolor renderer and video export. None
 * of that ships here. The engine's contract is small — a looping authored
 * clock `T` in seconds, a `CUES` table of section start times (the running sum
 * of the scene durations in OM_SCENES), and three easings — so it is
 * reproduced in the ~40 lines below and the choreography is ported verbatim.
 *
 * Two other substitutions, both deliberate:
 *  - Playfair Display / DM Sans become the page's own Cormorant Garamond and
 *    Albert Sans, already loaded via next/font. No extra font requests.
 *  - The Unsplash avatars are served from /public instead of a third-party CDN.
 *
 * Cost control: the frame loop only runs while the figure is on screen and the
 * tab is visible, and stops entirely under prefers-reduced-motion (which holds
 * the settled last frame). The module itself is loaded lazily — see
 * ChecklistAnimationMount.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";

/* ---------------------------------------------------------------- the clock */

// Verbatim from the design's OM_SCENES. CUES[name] is the section's start —
// the running sum of the durations above it — which is what the choreography
// below is keyed to.
const SCENES: ReadonlyArray<readonly [string, number]> = [
  ["Checklist", 1.9],
  ["Assign", 2.7],
  ["Modal", 1.6],
  ["Mention", 2.9],
  ["Attach", 1.7],
  ["Send", 2.3],
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
const EIO = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
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

/* ------------------------------------------------------------------ palette */

const INK = "#241F17";
const SUB = "#8A8175";
const LINE = "#EAE4D9";
const BAR = "#EDE7DC";
const CREAM = "#FAF7F1";
// The design's own accent was #B4874A; this is the site gold, close enough in
// hue that the two would clash rather than read as one system.
const ACCENT = "#b8935f";

const SANS = "var(--gw-font-body)";
const SERIF = "var(--gw-font-display)";

type Person = { name: string; role: string; img: string };
const JESS: Person = {
  name: "Jessica Hollen",
  role: "Bride",
  img: "/index_v2/checklist/jessica.jpg",
};
const DYLAN: Person = {
  name: "Dylan Whitmore",
  role: "Groom",
  img: "/index_v2/checklist/dylan.jpg",
};
const KAIT: Person = {
  name: "Kaitlin Pittman",
  role: "Planner",
  img: "/index_v2/checklist/kaitlin.jpg",
};

const CARD_X = 580;
const CARD_W = 760;
const COMMENT = "@Jessica and @Dylan Could you review the attached quote?";
const M1: [number, number] = [0, 8];
const M2: [number, number] = [13, 19];

/* ------------------------------------------------------------------- pieces */

function Face({ person, size = 52 }: { person: Person; size?: number }) {
  return (
    <img
      src={person.img}
      alt=""
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        borderRadius: size,
        objectFit: "cover",
        display: "block",
        flex: "0 0 auto",
        boxSizing: "border-box",
        boxShadow: "0 5px 16px rgba(48,36,16,0.16)",
      }}
    />
  );
}

function Bar({ w, h = 13, c = BAR }: { w: number | string; h?: number; c?: string }) {
  return (
    <div style={{ width: w, height: h, borderRadius: 8, background: c, flex: "0 0 auto" }} />
  );
}

function Clip({ c = INK, size = 24 }: { c?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", flex: "0 0 auto" }}
    >
      <path d="M20.1 10.4 11.3 19.2a5 5 0 0 1-7.1-7.1l8.8-8.8a3.4 3.4 0 0 1 4.8 4.8l-8.8 8.8a1.7 1.7 0 0 1-2.4-2.4l8.1-8.1" />
    </svg>
  );
}

function FileIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={INK}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block", flex: "0 0 auto" }}
    >
      <path d="M14 3v5h5" />
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    </svg>
  );
}

/* -------------------------------------------------------------- the picture */

function Piece({ T }: { T: number }) {
  const open = seg(T, C.Modal, C.Modal + 0.7, EIO); // list -> detail
  const openMsg = seg(T, C.Send + 0.7, C.Send + 1.3, EIO); // detail grows for the thread
  const cardH = 470 + 190 * open + 150 * openMsg;
  const cardTop = 540 - cardH / 2;

  const jIn = MOTION.pop(T, C.Assign + 1.7, 0.5) * (T > C.Assign + 1.7 ? 1 : 0);
  const dIn = MOTION.pop(T, C.Assign + 1.85, 0.5) * (T > C.Assign + 1.85 ? 1 : 0);
  const slotFade = 1 - seg(T, C.Assign + 1.7, C.Assign + 2.0);
  const dd = clamp(
    seg(T, C.Assign - 0.3, C.Assign + 0.12) - seg(T, C.Assign + 1.6, C.Assign + 1.9),
    0,
    1,
  );
  const due = MOTION.pop(T, C.Modal + 1.0, 0.55) * (T > C.Modal + 1.0 ? 1 : 0);

  const typeA = C.Mention + 0.25;
  const typeB = C.Mention + 2.3;
  const n = Math.round(clamp((T - typeA) / (typeB - typeA), 0, 1) * COMMENT.length);
  const fileIn = MOTION.pop(T, C.Attach + 0.5, 0.6) * (T > C.Attach + 0.5 ? 1 : 0);
  const fileY = (1 - clamp(seg(T, C.Attach + 0.5, C.Attach + 1.0), 0, 1)) * -40;

  const press = clamp(
    seg(T, C.Send + 0.3, C.Send + 0.42) - seg(T, C.Send + 0.42, C.Send + 0.62),
    0,
    1,
  );
  const fly = clamp(seg(T, C.Send + 0.5, C.Send + 1.15, EIO), 0, 1);
  const sent = T > C.Send + 0.5;
  const land = MOTION.enter(T, C.Send + 1.0, 0.5);
  const pingA = clamp(seg(T, C.Send + 1.3, C.Send + 2.1), 0, 1);
  const pingB = clamp(seg(T, C.Send + 1.45, C.Send + 2.25), 0, 1);

  // The design drove a camera over the card — a scale track running 1.02→1.12
  // and a vertical pan of +20/-70 — which reads as intent in a full-bleed video
  // and as drift in a page row. Dropped: the card holds one size and one
  // position, centred on the frame, and only its own content animates. Its
  // height still grows list → detail → thread, but symmetrically about the
  // centre line, so the optical centre never moves off the text beside it.
  const fade = Math.max(1 - seg(T, 0, 0.4), seg(T, TOTAL - 0.35, TOTAL));

  const commentSpans = (count: number) => {
    const out: React.ReactNode[] = [];
    const pieces: Array<[number, number]> = [
      [0, M1[0]],
      [M1[0], M1[1]],
      [M1[1], M2[0]],
      [M2[0], M2[1]],
      [M2[1], COMMENT.length],
    ];
    pieces.forEach((p, k) => {
      const a = p[0];
      const b = Math.min(p[1], count);
      if (b <= a) return;
      const txt = COMMENT.slice(a, b);
      out.push(
        k === 1 || k === 3 ? (
          <span key={k} style={{ color: ACCENT, fontWeight: 600 }}>
            {txt}
          </span>
        ) : (
          <span key={k}>{txt}</span>
        ),
      );
    });
    return out;
  };

  const labelStyle: CSSProperties = { font: "400 20px " + SANS, color: SUB };
  const rowGap: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "150px 1fr",
    alignItems: "center",
    rowGap: 22,
  };
  const cardEnter = MOTION.enter(T, 0.15, 0.6);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 1 - fade }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <div
          style={{
            position: "absolute",
            left: CARD_X,
            top: cardTop,
            width: CARD_W,
            height: cardH,
            background: "#fff",
            borderRadius: 24,
            border: "1px solid " + LINE,
            boxShadow: "0 26px 70px rgba(48,36,16,0.16)",
            opacity: cardEnter,
            transform: "translateY(" + (1 - cardEnter) * 24 + "px)",
          }}
        >
          {/* ---------------- list view ---------------- */}
          <div style={{ position: "absolute", inset: 0, opacity: 1 - open, pointerEvents: "none" }}>
            <div style={{ padding: "30px 34px 0", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ font: "600 27px " + SERIF, color: INK }}>Checklist</div>
              <div style={{ marginLeft: "auto" }}>
                <Bar w={70} h={11} />
              </div>
            </div>
            <div style={{ marginTop: 22 }}>
              {[0, 1, 2, 3, 4].map((i) => {
                const hero = i === 1;
                const e = MOTION.enter(T, 0.5 + i * 0.11, 0.5);
                const hl = hero ? clamp(seg(T, C.Assign - 0.55, C.Assign - 0.15), 0, 1) : 0;
                return (
                  <div
                    key={i}
                    style={{
                      height: 74,
                      borderTop: "1px solid #F2EDE4",
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      padding: "0 34px",
                      opacity: e,
                      transform: "translateY(" + (1 - e) * 10 + "px)",
                      background: "rgba(251,241,223," + hl * 0.85 + ")",
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 24,
                        border: "2px solid #CFC6B5",
                        flex: "0 0 auto",
                      }}
                    />
                    {hero ? (
                      <div style={{ font: "500 24px " + SANS, color: INK, whiteSpace: "nowrap" }}>
                        Review the florist quote
                      </div>
                    ) : (
                      <Bar w={[300, 0, 360, 240, 320][i]} />
                    )}
                    <div
                      style={{
                        marginLeft: "auto",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        height: 52,
                      }}
                    >
                      {hero ? (
                        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                          <div
                            style={{
                              position: "absolute",
                              right: 0,
                              width: 46,
                              height: 46,
                              borderRadius: 46,
                              border: "2px dashed #DCD4C4",
                              color: "#C6BDAC",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              font: "300 24px " + SANS,
                              opacity: slotFade,
                            }}
                          >
                            +
                          </div>
                          <div style={{ transform: "scale(" + jIn + ")", opacity: clamp(jIn, 0, 1) }}>
                            <Face person={JESS} size={46} />
                          </div>
                          <div
                            style={{
                              marginLeft: -12,
                              transform: "scale(" + dIn + ")",
                              opacity: clamp(dIn, 0, 1),
                            }}
                          >
                            <Face person={DYLAN} size={46} />
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{ width: 46, height: 46, borderRadius: 46, border: "2px dashed #E4DDD0" }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------------- detail view ---------------- */}
          <div style={{ position: "absolute", inset: 0, opacity: open }}>
            <div style={{ padding: "34px 38px 0" }}>
              <div style={{ font: "600 34px " + SERIF, color: INK }}>Review the florist quote</div>
              <div style={{ marginTop: 26, ...rowGap }}>
                <div style={labelStyle}>Assignees</div>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  {[JESS, DYLAN].map((p, i) => {
                    const ping = i === 0 ? pingA : pingB;
                    return (
                      <div
                        key={p.name}
                        style={{ display: "flex", alignItems: "center", gap: 11, position: "relative" }}
                      >
                        <div style={{ position: "relative" }}>
                          <Face person={p} size={40} />
                          <div
                            style={{
                              position: "absolute",
                              inset: -8,
                              borderRadius: 60,
                              border: "3px solid " + ACCENT,
                              opacity: ping > 0 ? 1 - ping : 0,
                              transform: "scale(" + (0.85 + ping * 0.5) + ")",
                            }}
                          />
                        </div>
                        <div style={{ font: "400 21px " + SANS, color: INK }}>{p.name}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={labelStyle}>Due date</div>
                <div
                  style={{
                    font: "600 21px " + SANS,
                    color: "#6F5320",
                    background: "#FBF1DF",
                    borderRadius: 8,
                    padding: "7px 14px",
                    justifySelf: "start",
                    transform: "scale(" + due + ")",
                    opacity: clamp(due, 0, 1),
                    transformOrigin: "left center",
                  }}
                >
                  Dec 20
                </div>
              </div>

              <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ font: "400 20px " + SANS, color: SUB }}>Description</div>
                <div style={{ flex: 1, height: 1, background: LINE }} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  paddingTop: 20,
                  opacity: seg(T, C.Modal + 0.5, C.Modal + 1.0),
                }}
              >
                <Bar w="92%" />
                <Bar w="98%" />
                <Bar w="56%" />
              </div>
            </div>

            {/* posted comment */}
            {land > 0.01 && (
              <div
                style={{
                  position: "absolute",
                  left: 38,
                  right: 38,
                  top: 452,
                  opacity: land,
                  transform: "translateY(" + (1 - land) * 14 + "px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{ font: "400 20px " + SANS, color: SUB }}>Comments</div>
                  <div style={{ flex: 1, height: 1, background: LINE }} />
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  <Face person={KAIT} size={44} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 2 }}>
                    <div style={{ font: "400 22px " + SANS, color: INK, lineHeight: 1.4 }}>
                      {commentSpans(COMMENT.length)}
                    </div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 16px",
                        borderRadius: 10,
                        border: "1px solid " + LINE,
                        background: CREAM,
                        width: "fit-content",
                      }}
                    >
                      <div style={{ font: "500 18px " + SANS, color: INK }}>
                        Blossom &amp; Vine Quote.pdf
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* composer */}
            <div
              style={{
                position: "absolute",
                left: 38,
                right: 38,
                bottom: 30,
                borderRadius: 16,
                border: "1.5px solid " + (T > C.Mention - 0.25 && !sent ? ACCENT : LINE),
                boxShadow:
                  T > C.Mention - 0.25 && !sent ? "0 0 0 4px rgba(184,147,95,0.10)" : "none",
                padding: "20px 22px 16px",
                background: "#fff",
              }}
            >
              <div
                style={{
                  minHeight: 34,
                  font: "400 22px " + SANS,
                  color: INK,
                  lineHeight: 1.4,
                  opacity: fly > 0.96 ? 1 : 1 - fly,
                  transform: "translateY(" + (fly > 0.96 ? 0 : fly * -110) + "px)",
                }}
              >
                {fly > 0.96 ? (
                  <span style={{ color: "#BCB3A2" }}>Write a comment…</span>
                ) : n > 0 ? (
                  commentSpans(n)
                ) : (
                  <span style={{ color: "#BCB3A2" }}>Write a comment…</span>
                )}
                {!sent && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 2.5,
                      height: 24,
                      background: ACCENT,
                      marginLeft: 2,
                      verticalAlign: "-4px",
                      opacity: Math.floor(T * 2) % 2 === 0 ? 0.9 : 0.15,
                    }}
                  />
                )}
              </div>

              {fileIn > 0.02 && fly < 0.96 && (
                <div
                  style={{
                    marginTop: 16,
                    opacity: (1 - fly) * clamp(fileIn, 0, 1),
                    transform:
                      "translateY(" + (fileY + fly * -110) + "px) scale(" + fileIn + ")",
                    transformOrigin: "left center",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "11px 16px",
                      borderRadius: 10,
                      border: "1px solid " + LINE,
                      background: CREAM,
                    }}
                  >
                    <FileIcon />
                    <div style={{ font: "500 18px " + SANS, color: INK }}>
                      Blossom &amp; Vine Quote.pdf
                    </div>
                  </div>
                </div>
              )}

              <div style={{ marginTop: 18, display: "flex", alignItems: "center" }}>
                <Clip c={T > C.Attach && T < C.Attach + 1.2 ? ACCENT : INK} />
                <div style={{ marginLeft: "auto", position: "relative" }}>
                  <div
                    style={{
                      padding: "12px 32px",
                      borderRadius: 10,
                      background: ACCENT,
                      color: "#fff",
                      font: "600 19px " + SANS,
                      transform: "scale(" + (1 - press * 0.07) + ")",
                    }}
                  >
                    Send
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: -6,
                      borderRadius: 16,
                      border: "3px solid " + ACCENT,
                      opacity: fly > 0 && fly < 1 ? (1 - fly) * 0.8 : 0,
                      transform: "scale(" + (1 + fly * 0.35) + ")",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* assignee dropdown — full names with roles */}
        {dd > 0.01 && (
          <div
            style={{
              position: "absolute",
              left: CARD_X + CARD_W - 340,
              top: cardTop + 168,
              width: 320,
              background: "#fff",
              borderRadius: 16,
              border: "1px solid " + LINE,
              boxShadow: "0 28px 64px rgba(48,36,16,0.22)",
              overflow: "hidden",
              opacity: dd,
              transform: "translateY(" + (1 - dd) * 12 + "px)",
            }}
          >
            {([
              [JESS, C.Assign + 0.6],
              [DYLAN, C.Assign + 1.15],
            ] as Array<[Person, number]>).map(([p, at]) => {
              const on = T > at - 0.4;
              return (
                <div
                  key={p.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 16px",
                    background: on ? "#FBF4E8" : "#fff",
                  }}
                >
                  <Face person={p} size={40} />
                  <div style={{ font: "500 19px " + SANS, color: INK }}>{p.name}</div>
                  <div style={{ font: "400 17px " + SANS, color: SUB, marginLeft: "auto" }}>
                    ({p.role})
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- the driver */

// The design's stage is 1920×1080 with the card centred and a lot of air either
// side — right for a full-bleed video, dead space in a page row. This is the
// window onto it, and now that the camera is gone and the card no longer
// travels, the window is exactly the card: its full width, and its tallest
// state (810, the settled thread). No padding, so the box the row lays out IS
// the card — its left edge lands on the column's left edge, flush with the
// section title above. Shorter states centre inside the height; the soft
// shadow spills past all four edges, since .gw-anim does not clip.
// Keep in sync with the aspect-ratio on .gw-anim.
const VIEW_W = CARD_W; // 760
const VIEW_H = 810;
const VIEW_X = CARD_X; // 580
const VIEW_Y = 540 - VIEW_H / 2; // 135

export default function ChecklistAnimation() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [k, setK] = useState(0);
  const [t, setT] = useState(0);

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
    // Held on the first frame until half the card has scrolled into view, so
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
          // card taller than the viewport could never reach
          const r = entry.boundingClientRect;
          armed = r.top + r.height / 2 <= window.innerHeight;
        }
        onScreen ? start() : stop();
      },
      // enough steps that the check re-runs as the card scrolls up, not just
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

  return (
    <div ref={boxRef} className="gw-anim">
      {k > 0 && (
        <div
          className="gw-anim__stage"
          style={{
            transform: `translate(${-VIEW_X * k}px, ${-VIEW_Y * k}px) scale(${k})`,
          }}
        >
          <Piece T={t} />
        </div>
      )}
    </div>
  );
}
