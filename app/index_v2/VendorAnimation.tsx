"use client";

/**
 * "Vendor management" product motion — ported from the Claude Design project
 * `Vendor Management Abstract.dc.html` (vendor-abstract.jsx).
 *
 * Same deal as ChecklistAnimation, from the same design project: the original
 * runs on animations-v3.jsx, a ~55KB authoring engine with a scrub bar, scene
 * editor, caption layer and video export. None of that ships. The engine's
 * contract is small — a looping authored clock `T` in seconds, a `CUES` table
 * of scene start times (the running sum of OM_SCENES' durations), and three
 * easings — so it is reproduced below and the choreography is ported verbatim.
 *
 * Two substitutions, both matching what ChecklistAnimation already does:
 *  - Playfair Display / DM Sans become the page's own Cormorant Garamond and
 *    Albert Sans, and the design's #B4874A accent becomes the site gold.
 *  - The Unsplash avatars are the local files the checklist animation already
 *    ships, so this adds no image requests of its own.
 *
 * Cost control: the frame loop only runs while the figure is on screen and the
 * tab is visible, and stops entirely under prefers-reduced-motion (which holds
 * the settled last frame). The module is loaded lazily — see
 * VendorAnimationMount.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";

/* ---------------------------------------------------------------- the clock */

// Verbatim from the design's OM_SCENES. CUES[name] is the scene's start — the
// running sum of the durations above it — which the choreography is keyed to.
const SCENES: ReadonlyArray<readonly [string, number]> = [
  ["List", 2],
  ["Detail", 1.2],
  ["Contact", 2.7],
  ["Budget", 2.6],
  ["Comment", 4],
  ["Settle", 0.8],
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

// Keyframe track: a list of [time, value] stops the value eases between.
function track(t: number, pts: ReadonlyArray<readonly [number, number]>, e?: Ease) {
  const ez = e || EIO;
  if (t <= pts[0][0]) return pts[0][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    if (t < b[0])
      return a[1] + (b[1] - a[1]) * ez((t - a[0]) / Math.max(0.0001, b[0] - a[0]));
  }
  return pts[pts.length - 1][1];
}

const MOTION = {
  enter: (t: number, at: number, d?: number) => seg(t, at, at + (d || 0.45), EO),
  pop: (t: number, at: number, d?: number) => EB(clamp((t - at) / (d || 0.45), 0, 1)),
};

const typed = (t: number, a: number, b: number, str: string) =>
  str.slice(0, Math.round(clamp((t - a) / Math.max(0.0001, b - a), 0, 1) * str.length));

/* ------------------------------------------------------------------ palette */

const INK = "#241F17";
const SUB = "#8A8175";
const LINE = "#EAE4D9";
const BAR = "#EDE7DC";
const GOLDBG = "#FDF6EA";
const GOLDLN = "#C99A55";
const GOLDINK = "#6F5320";
// The design's own accent was #B4874A; this is the site gold, close enough in
// hue that the two would clash rather than read as one system.
const ACCENT = "#b8935f";

const SANS = "var(--gw-font-body)";
const SERIF = "var(--gw-font-display)";

type Person = { name: string; img: string };
const JESS: Person = { name: "Jessica Hollen", img: "/index_v2/checklist/jessica.jpg" };
const DYLAN: Person = { name: "Dylan Whitmore", img: "/index_v2/checklist/dylan.jpg" };
const KAIT: Person = { name: "Kaitlin Pittman", img: "/index_v2/checklist/kaitlin.jpg" };

const CW = 1920;
const CH = 1080;
const CARD_W = 1080;
const VENDOR = "Everlight Photography";
const COMMENT =
  "@Jessica and @Dylan reminder the remaining payment of $2,000 is due soon for Everlight Photography";
// character ranges of the two @mentions, so they can be tinted as they type
const M1: [number, number] = [0, 8];
const M2: [number, number] = [13, 19];
const CONTACT: ReadonlyArray<readonly [string, string]> = [
  ["First name", "Joshua"],
  ["Last name", "Green"],
  ["Email", "joshua@everlight.com"],
  ["Phone", "+1 934-934-9344"],
];

/* ------------------------------------------------------------------- pieces */

function Bar({
  w,
  h = 13,
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

function Face({ person, size = 40 }: { person: Person; size?: number }) {
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
        boxShadow: "0 5px 16px rgba(48,36,16,0.16)",
      }}
    />
  );
}

function LinkIcon({ size = 24, c = INK }: { size?: number; c?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      style={{ display: "block", flex: "0 0 auto" }}
    >
      <path d="M10 7.5H7.5a4.5 4.5 0 0 0 0 9H10M14 7.5h2.5a4.5 4.5 0 0 1 0 9H14M8.5 12h7" />
    </svg>
  );
}

function Status({
  kind,
  o = 1,
  s = 1,
}: {
  kind: "booked" | "considering";
  o?: number;
  s?: number;
}) {
  const booked = kind === "booked";
  return (
    <div
      style={{
        font: "600 15px " + SANS,
        textAlign: "center",
        display: "inline-block",
        boxSizing: "border-box",
        color: booked ? "#4F6A48" : GOLDINK,
        background: booked ? "#EAF1E5" : "#FBF1DF",
        borderRadius: 8,
        padding: "7px 14px",
        whiteSpace: "nowrap",
        opacity: o,
        transform: "scale(" + s + ")",
      }}
    >
      {booked ? "Booked" : "Considering"}
    </div>
  );
}

function Money({ v, c = INK }: { v: string; c?: string }) {
  return <div style={{ font: "500 20px " + SANS, color: c, textAlign: "right" }}>{v}</div>;
}

function Divider({ label, o = 1 }: { label: string; o?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: o }}>
      <div style={{ font: "400 20px " + SANS, color: SUB }}>{label}</div>
      <div style={{ flex: 1, height: 1, background: LINE }} />
    </div>
  );
}

function ContactCard({ title, rows }: { title: string; rows: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1.5px solid " + LINE,
        background: "#FCFAF6",
        borderRadius: 16,
        padding: "20px 22px",
      }}
    >
      <div style={{ font: "700 22px " + SANS, color: INK }}>{title}</div>
      <div
        style={{
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 28,
          rowGap: 16,
        }}
      >
        {rows}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- the sequence */

function Piece({ T }: { T: number }) {
  // Each panel's reveal. The card's height is the sum of what is open, so
  // these drive the layout as well as the fades.
  const open = seg(T, C.Detail, C.Detail + 0.7, EIO);
  const openC = seg(T, C.Contact - 0.1, C.Contact + 0.6, EIO);
  const openN = seg(T, C.Contact + 1.85, C.Contact + 2.35, EIO);
  const openB = seg(T, C.Budget - 0.1, C.Budget + 0.6, EIO);
  const openM = seg(T, C.Comment - 0.1, C.Comment + 0.6, EIO);
  const openP = seg(T, C.Comment + 2.85, C.Comment + 3.4, EIO);

  const H_LIST = 500;
  // The design's own base was 372, which left ~60px of empty card below the
  // comment composer once every panel was open — invisible in a full-bleed
  // video frame, obvious as a white lip in a page row. Trimmed to the header
  // and field grid plus a bottom padding matching the sides.
  const H_FIELDS = 311;
  const cardH =
    H_LIST +
    (H_FIELDS - H_LIST) * open +
    244 * openC +
    146 * openN +
    284 * openB +
    233 * openM +
    130 * openP;
  const cardTop = 540 - cardH / 2;

  const bookedPop = MOTION.pop(T, C.List + 1.1, 0.45) * (T > C.List + 1.1 ? 1 : 0);
  const hl = clamp(seg(T, C.Detail - 0.5, C.Detail - 0.1), 0, 1);

  const cStart = C.Contact + 0.6;
  const cStep = 0.3;
  const contactVals = CONTACT.map((row, i) => {
    const a = cStart + i * cStep;
    return {
      label: row[0],
      text: typed(T, a, a + cStep * 0.85, row[1]),
      active: T > a && T < a + cStep,
    };
  });

  const linkIn = MOTION.pop(T, C.Budget + 0.45, 0.5) * (T > C.Budget + 0.45 ? 1 : 0);
  const rowIn = MOTION.enter(T, C.Budget + 0.8, 0.45);
  const payGrow = seg(T, C.Budget + 1.2, C.Budget + 2.1, EIO);
  const paid = Math.round(payGrow * 2000);
  const fmt = (n: number) => "$" + n.toLocaleString("en-US") + ".00";

  const typeA = C.Comment + 0.5;
  const typeB = C.Comment + 2.4;
  const press = clamp(
    seg(T, C.Comment + 2.65, C.Comment + 2.77) - seg(T, C.Comment + 2.77, C.Comment + 2.97),
    0,
    1,
  );
  const fly = clamp(seg(T, C.Comment + 2.85, C.Comment + 3.4, EIO), 0, 1);
  const sent = T > C.Comment + 2.85;
  const land = MOTION.enter(T, C.Comment + 3.25, 0.45);
  const n = Math.round(clamp((T - typeA) / (typeB - typeA), 0, 1) * COMMENT.length);

  // The comment is one string; the two @mention ranges get the accent as the
  // typing passes through them.
  const commentSpans = (count: number) => {
    const out: React.ReactNode[] = [];
    const parts: Array<[number, number]> = [
      [0, M1[0]],
      [M1[0], M1[1]],
      [M1[1], M2[0]],
      [M2[0], M2[1]],
      [M2[1], COMMENT.length],
    ];
    parts.forEach((p, k) => {
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

  const fade = Math.max(1 - seg(T, 0, 0.4), seg(T, TOTAL - 0.35, TOTAL));
  const appear = MOTION.enter(T, 0.15, 0.6);

  const caret = (h: number) => (
    <span
      style={{
        display: "inline-block",
        width: 2.5,
        height: h,
        background: ACCENT,
        marginLeft: 2,
        verticalAlign: "-3px",
        opacity: Math.floor(T * 2.4) % 2 === 0 ? 0.9 : 0.12,
      }}
    />
  );

  const grid2: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "190px 1fr",
    alignItems: "center",
    rowGap: 18,
  };
  const fieldLabel: CSSProperties = { font: "400 19px " + SANS, color: SUB };
  const fieldVal: CSSProperties = { font: "400 21px " + SANS, color: INK };

  return (
    // The design clipped this wrapper to the 1920x1080 stage, which suited a
    // full-bleed video export. Here the slot does the framing and deliberately
    // does not clip, so clipping at the stage bounds only served to slice the
    // card's shadow: settled, the card is 1010 of the 1080 tall, and the
    // shadow reaches 96px past its bottom edge.
    <div style={{ position: "absolute", inset: 0, opacity: 1 - fade }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width: CW,
          height: CH,
          marginLeft: -CW / 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: (CW - CARD_W) / 2,
            top: cardTop,
            width: CARD_W,
            height: cardH,
            background: "#fff",
            borderRadius: 24,
            border: "1px solid " + LINE,
            boxShadow: "0 26px 70px rgba(48,36,16,0.16)",
            overflow: "hidden",
            opacity: appear,
            transform: "translateY(" + (1 - appear) * 24 + "px)",
          }}
        >
          {/* ---------- All vendors list ---------- */}
          <div style={{ position: "absolute", inset: 0, opacity: 1 - open, pointerEvents: "none" }}>
            <div style={{ padding: "30px 36px 0", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ font: "600 28px " + SERIF, color: INK }}>All vendors</div>
              <div style={{ marginLeft: "auto" }}>
                <Bar w={80} h={11} />
              </div>
            </div>
            <div
              style={{
                marginTop: 20,
                padding: "0 36px",
                display: "grid",
                gridTemplateColumns: "200px 170px 1fr",
                gap: 26,
                font: "600 13px " + SANS,
                letterSpacing: ".13em",
                color: "#B0A794",
              }}
            >
              <div>CATEGORY</div>
              <div>STATUS</div>
              <div>VENDOR</div>
            </div>
            <div style={{ marginTop: 14 }}>
              {[0, 1, 2, 3, 4].map((i) => {
                const hero = i === 1;
                const e = MOTION.enter(T, 0.35 + i * 0.075, 0.45);
                return (
                  <div
                    key={i}
                    style={{
                      height: 72,
                      borderTop: "1px solid #F2EDE4",
                      display: "grid",
                      gridTemplateColumns: "200px 170px 1fr",
                      gap: 26,
                      alignItems: "center",
                      padding: "0 36px",
                      opacity: e,
                      transform: "translateY(" + (1 - e) * 10 + "px)",
                      background: hero ? "rgba(251,241,223," + hl * 0.85 + ")" : "transparent",
                    }}
                  >
                    <Bar w={[130, 118, 104, 138, 96][i]} h={11} />
                    <div style={{ display: "flex" }}>
                      {hero ? (
                        bookedPop > 0.02 ? (
                          <Status kind="booked" s={bookedPop} />
                        ) : (
                          <Status kind="considering" />
                        )
                      ) : (
                        <Status kind={i === 3 ? "booked" : "considering"} o={0.4} />
                      )}
                    </div>
                    {hero ? (
                      <div style={{ font: "500 24px " + SANS, color: INK, whiteSpace: "nowrap" }}>
                        {VENDOR}
                      </div>
                    ) : (
                      <Bar w={[300, 0, 260, 340, 220][i]} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------- vendor detail ---------- */}
          <div style={{ position: "absolute", inset: 0, opacity: open }}>
            <div style={{ padding: "32px 38px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ font: "600 34px " + SERIF, color: INK }}>{VENDOR}</div>
                <Status kind="booked" />
              </div>

              <div style={{ marginTop: 24, ...grid2 }}>
                <div style={fieldLabel}>Category</div>
                <div style={fieldVal}>Photography</div>
                <div style={fieldLabel}>Address</div>
                <div style={fieldVal}>1417 Ashbury Street, San Francisco, CA 94117</div>
                <div style={fieldLabel}>Instagram</div>
                <div style={fieldVal}>@everlight.photo</div>
                <div style={fieldLabel}>Facebook</div>
                <Bar w={320} />
                <div style={fieldLabel}>Website</div>
                <Bar w={260} />
              </div>

              {/* Contact cards */}
              <div style={{ marginTop: 26, opacity: openC, height: openC * 218, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
                  <ContactCard
                    title="Contact #2"
                    rows={contactVals.map((f) => (
                      <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <div style={{ font: "400 17px " + SANS, color: SUB }}>{f.label}</div>
                        <div
                          style={{
                            font: "400 20px " + SANS,
                            color: INK,
                            minHeight: 26,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {f.text}
                          {f.active ? caret(21) : null}
                        </div>
                      </div>
                    ))}
                  />
                  <ContactCard
                    title="Contact #1"
                    rows={[0, 1, 2, 3].map((i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <Bar w={[86, 84, 62, 60][i]} h={10} c="#E5DED1" />
                        <Bar w={[120, 108, 168, 146][i]} h={13} />
                      </div>
                    ))}
                  />
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginTop: 22, opacity: openN, height: openN * 120, overflow: "hidden" }}>
                <Divider label="Notes" />
                <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 20 }}>
                  <Bar w="94%" />
                  <Bar w="88%" />
                  <Bar w="62%" />
                </div>
              </div>

              {/* Linked budget */}
              <div style={{ marginTop: 24, opacity: openB, height: openB * 258, overflow: "hidden" }}>
                <div
                  style={{
                    border: "1.5px solid " + GOLDLN,
                    background: GOLDBG,
                    borderRadius: 16,
                    padding: "22px 24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      opacity: linkIn,
                      transform: "scale(" + (0.94 + 0.06 * clamp(linkIn, 0, 1)) + ")",
                      transformOrigin: "left center",
                    }}
                  >
                    <LinkIcon />
                    <div style={{ font: "700 22px " + SANS, color: INK }}>
                      Linked with Expense on your Budget
                    </div>
                    <div
                      style={{
                        marginLeft: "auto",
                        padding: "9px 18px",
                        borderRadius: 8,
                        background: "#fff",
                        border: "1px solid " + LINE,
                        font: "600 16px " + SANS,
                        color: INK,
                      }}
                    >
                      Open on Budget
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 18,
                      background: "#fff",
                      borderRadius: 10,
                      border: "1px solid " + LINE,
                      overflow: "hidden",
                      opacity: rowIn,
                      transform: "translateY(" + (1 - rowIn) * 12 + "px)",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.7fr 1fr 1fr 1fr",
                        gap: 18,
                        padding: "14px 20px",
                        borderBottom: "1px solid " + LINE,
                        font: "400 16px " + SANS,
                        color: SUB,
                      }}
                    >
                      <div>Expense Name</div>
                      <div style={{ textAlign: "right" }}>Actual (Quote)</div>
                      <div style={{ textAlign: "right" }}>Total Paid</div>
                      <div style={{ textAlign: "right" }}>Remaining</div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.7fr 1fr 1fr 1fr",
                        gap: 18,
                        padding: "16px 20px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ font: "400 20px " + SANS, color: INK }}>{VENDOR}</div>
                      <Money v="$4,000.00" />
                      <Money v={fmt(paid)} c={GOLDINK} />
                      <Money v={fmt(4000 - paid)} />
                    </div>
                    <div
                      style={{
                        padding: "0 20px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          height: 8,
                          borderRadius: 8,
                          background: "#F3EDE2",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{ height: "100%", width: payGrow * 50 + "%", background: ACCENT }}
                        />
                      </div>
                      <div style={{ font: "500 16px " + SANS, color: SUB }}>
                        {Math.round(payGrow * 50)}% paid
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div
                style={{
                  marginTop: 22,
                  opacity: openM,
                  height: openM * 207 + openP * 130,
                  overflow: "hidden",
                }}
              >
                <Divider label="Comments" />
                {land > 0.01 && (
                  <div
                    style={{
                      marginTop: 20,
                      display: "flex",
                      gap: 16,
                      opacity: land,
                      transform: "translateY(" + (1 - land) * 14 + "px)",
                    }}
                  >
                    <Face person={KAIT} size={44} />
                    <div style={{ flex: 1, paddingTop: 2 }}>
                      <div style={{ font: "400 21px " + SANS, color: INK, lineHeight: 1.45 }}>
                        {commentSpans(COMMENT.length)}
                      </div>
                      <div
                        style={{
                          marginTop: 12,
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Face person={JESS} size={28} />
                        <Face person={DYLAN} size={28} />
                        <div style={{ font: "400 17px " + SANS, color: SUB }}>notified</div>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  style={{
                    marginTop: 20,
                    borderRadius: 16,
                    background: "#fff",
                    border: "1.5px solid " + (!sent ? ACCENT : LINE),
                    boxShadow: !sent ? "0 0 0 4px rgba(184,147,95,0.10)" : "none",
                    padding: "20px 22px 14px",
                  }}
                >
                  <div
                    style={{
                      minHeight: 62,
                      font: "400 21px " + SANS,
                      color: INK,
                      lineHeight: 1.45,
                      opacity: fly > 0.96 ? 1 : 1 - fly,
                      transform: "translateY(" + (fly > 0.96 ? 0 : fly * -110) + "px)",
                    }}
                  >
                    {fly > 0.96 || n === 0 ? (
                      <span style={{ color: "#BCB3A2" }}>Write a comment…</span>
                    ) : (
                      commentSpans(n)
                    )}
                    {!sent ? caret(22) : null}
                  </div>
                  <div style={{ marginTop: 10, display: "flex", alignItems: "center" }}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- the driver */

// The design's stage is 1920×1080 with the card centred and a lot of air either
// side — right for a full-bleed video, dead space in a page row. This is the
// window onto it, and with the design's camera removed (it shrank the stage to
// keep the growing record in frame, which read as the whole row resizing) the
// card sits at a constant scale and only grows downward and upward from its
// centre. So the window is exactly the card: its full width, and its tallest
// state — every panel open. Shorter states centre inside the height, matching
// how the checklist card behaves, and the soft shadow spills past all four
// edges since the slot does not clip.
// Keep in sync with the aspect-ratio on .gw-vanim.
const VIEW_W = CARD_W; // 1080
// every panel open: 311 + 244 + 146 + 284 + 233 + 130
const VIEW_H = 1348;
const VIEW_X = CW / 2 - VIEW_W / 2; // 420
const VIEW_Y = CH / 2 - VIEW_H / 2; // -164.5

export default function VendorAnimation() {
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
    <div ref={boxRef} className="gw-vanim">
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
