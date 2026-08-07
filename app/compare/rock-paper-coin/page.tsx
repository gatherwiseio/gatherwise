import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import { comparisonGroups, type ComparisonCell } from "./comparison-data";
import styles from "./page.module.css";

// Scoped to this route: the comparison design uses its own type pairing rather
// than the site-wide brand fonts.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gatherwise vs Rock Paper Coin for Event & Wedding Planners",
  description:
    "Compare features side-by-side. Rock Paper Coin handles proposals and payments, Gatherwise is an all-in-one software for event & wedding planners",
};

type EventRow = {
  label: string;
  meta: string;
  paid?: boolean;
};

const eventRows: EventRow[] = [
  { label: "Lead, proposal & contract", meta: "Signed" },
  { label: "Invoices & payments", meta: "Paid", paid: true },
  { label: "Day-of timeline", meta: "42 items · shared live" },
  { label: "Budget", meta: "$84,200 tracked" },
  { label: "Guest list & seating", meta: "180 guests · 18 tables" },
];

const differentiators = [
  {
    number: "01",
    title: "It doesn't stop at the paid invoice",
    body: "Rock Paper Coin gets a client from inquiry to signed and paid, then hands off. Gatherwise carries that same client into the timeline, budget, guest list and seating chart.",
  },
  {
    number: "02",
    title: "Event tools Rock Paper Coin doesn't have",
    body: "Timelines, task checklists, budget tracking, guest lists and seating charts are core features here — not something you bolt on with a second subscription.",
  },
  {
    number: "03",
    title: "A real mobile app",
    body: "Native iOS and Android, built for the one place it matters most: standing in a ballroom on event day with your hands full. Rock Paper Coin is web-only.",
  },
  {
    number: "04",
    title: "Purpose-built for planners",
    body: "Rock Paper Coin serves the whole event industry — photographers, florists, venues and planners alike. Gatherwise is shaped around one job: how event and wedding planners actually work.",
  },
];

const gatherwisePlan = [
  "Leads & CRM",
  "Proposals & contracts",
  "Invoicing & payments",
  "Event timelines",
  "Tasks & notifications",
  "Budget",
  "Guests & seating",
];

const rockPaperCoinPlan: { label: string; included: boolean }[] = [
  { label: "Leads & CRM", included: true },
  { label: "Proposals & contracts", included: true },
  { label: "Invoicing & payments", included: true },
  { label: "QuickBooks sync", included: true },
  { label: "Event timelines — not built in", included: false },
  { label: "Budget — not built in", included: false },
  { label: "Guests & seating — not built in", included: false },
];

function ValueCell({ cell }: { cell: ComparisonCell }) {
  if (cell.kind === "price") {
    return (
      <td className={styles.cell}>
        <span
          className={
            cell.tone === "muted" ? styles.priceMuted : styles.priceSoft
          }
        >
          {cell.lead}
          <b>{cell.amount}</b>
          {cell.trail}
        </span>
      </td>
    );
  }

  const included = cell.kind === "yes";

  return (
    <td
      className={included ? styles.cell : `${styles.cell} ${styles.cellAbsent}`}
    >
      <span
        className={`${styles.mark} ${included ? styles.markYes : styles.markNo}`}
        aria-hidden="true"
      >
        {included ? "✓" : "—"}
      </span>
      <span className={styles.srOnly}>
        {included ? "Included" : "Not included"}
      </span>
      {cell.note ? (
        <>
          {" "}
          <span className={styles.cellNote}>{cell.note}</span>
        </>
      ) : null}
    </td>
  );
}

export default function Page() {
  return (
    <div className={`${cormorant.variable} ${karla.variable} ${styles.page}`}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Gatherwise</span>
          <span className={styles.brandTag}>Comparison</span>
        </div>
        <nav className={styles.nav}>
          <a href="#comparison" className={styles.navLink}>
            Feature table
          </a>
          <a href="#pricing" className={styles.navLink}>
            Pricing
          </a>
          <a
            href="https://app.gatherwise.io/login?m=signup"
            className={styles.btnPrimary}
          >
            Start free trial
          </a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={`${styles.eyebrow} ${styles.heroEyebrow}`}>
              Gatherwise vs. Rock Paper Coin
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleMuted}>Rock Paper Coin</span> runs
              your payments.{" "}
              <span className={styles.heroTitleGold}>Gatherwise</span> runs the
              whole event.
            </h1>
            <p className={styles.heroLede}>
              Rock Paper Coin is a focused proposals-to-payments tool for event
              professionals — contracts, invoicing and Stripe-powered payment
              processing. Gatherwise does that too, then keeps going into the
              part Rock Paper Coin was never built for: timelines, budgets,
              guests and seating.
            </p>
            <div className={styles.heroActions}>
              <a
                href="https://app.gatherwise.io/login?m=signup"
                className={styles.btnPrimaryLarge}
              >
                Start free trial
              </a>
              <a href="#comparison" className={styles.linkQuiet}>
                See the full comparison
              </a>
            </div>
            <p className={styles.heroTagline}>
              Effortless event planning starts here.
            </p>
          </div>

          <div className={styles.eventCard}>
            <div className={styles.eventHead}>
              <div className={styles.eventTitle}>Harper &amp; Cole — one event</div>
              <div className={styles.eventTag}>All in Gatherwise</div>
            </div>
            <div className={styles.eventRows}>
              {eventRows.map((row) => (
                <div
                  key={row.label}
                  className={`${styles.eventRow} ${
                    row.paid ? styles.eventRowPaid : ""
                  }`}
                >
                  <span className={styles.eventLabel}>{row.label}</span>
                  <span
                    className={row.paid ? styles.eventMetaPaid : styles.eventMeta}
                  >
                    {row.meta}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.eventTags}>
              <span className={styles.eventChip}>One login</span>
              <span className={styles.eventChip}>One client record</span>
              <span className={`${styles.eventChip} ${styles.eventChipSolid}`}>
                Sold and planned in one place
              </span>
            </div>
          </div>
        </section>

        <section className={styles.positioning}>
          <div className={styles.wide}>
            <h2 className={`${styles.sectionTitle} ${styles.positioningTitle}`}>
              A payments tool, or the whole planning platform.
            </h2>
            <p className={styles.positioningLede}>
              Both win you the client and get you paid. The question is what
              happens next — whether your software follows you into planning
              the event, or stops at the paid invoice.
            </p>
            <div className={styles.positioningGrid}>
              <div className={styles.posCard}>
                <div className={styles.posEyebrow}>Gatherwise</div>
                <h3 className={styles.posTitle}>
                  Modern software + CRM for event and wedding planners
                </h3>
                <p className={styles.posText}>
                  Built for planners, on purpose. Leads, proposals, contracts
                  and invoicing sit on the same client record as the timeline,
                  budget, guests and seating — so nothing is re-entered twice.
                </p>
                <ul className={styles.posList}>
                  {[
                    "Sales and payments as capable as a dedicated invoicing tool",
                    "Timelines, budgets, guests and seating built in",
                    "One record from first inquiry to final seating chart",
                  ].map((item) => (
                    <li key={item} className={styles.posItem}>
                      <span className={styles.posMark} aria-hidden="true">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${styles.posCard} ${styles.posCardAlt}`}>
                <div className={`${styles.posEyebrow} ${styles.posEyebrowAlt}`}>
                  Rock Paper Coin
                </div>
                <h3 className={styles.posTitle}>
                  A payments-first platform for event professionals
                </h3>
                <p className={styles.posText}>
                  Built around one job done well: getting proposals signed and
                  invoices paid. Photographers, florists, venues and planners
                  all use it for the same reason — clean contracts and fast,
                  low-fee payment processing.
                </p>
                <ul className={styles.posList}>
                  {[
                    "Strong proposals, contracts and Stripe-powered payments",
                    "QuickBooks sync and flexible processing fees",
                    "No timelines, budgets, guest lists or seating — pair it with other tools",
                  ].map((item) => (
                    <li
                      key={item}
                      className={`${styles.posItem} ${styles.posItemAlt}`}
                    >
                      <span className={styles.posMarkAlt} aria-hidden="true">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="comparison" className={styles.comparison}>
          <div className={styles.narrow}>
            <div className={styles.eyebrow}>Feature by feature</div>
            <h2 className={styles.sectionTitle}>Side by side, as of mid-2026.</h2>

            <table className={styles.table}>
              <caption className={styles.srOnly}>
                Gatherwise and Rock Paper Coin capabilities compared, grouped by
                area.
              </caption>
              <colgroup>
                <col className={styles.colCapability} />
                <col className={styles.colProduct} />
                <col className={styles.colProduct} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className={styles.thCapability}>
                    Capability
                  </th>
                  <th scope="col" className={styles.thProduct}>
                    Gatherwise
                  </th>
                  <th
                    scope="col"
                    className={`${styles.thProduct} ${styles.thProductAlt}`}
                  >
                    Rock Paper Coin
                  </th>
                </tr>
              </thead>
              {comparisonGroups.map((group) => (
                <tbody key={group.title}>
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={3}
                      className={styles.groupHead}
                    >
                      {group.title}
                    </th>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.capability}>
                      <th scope="row" className={styles.rowCapability}>
                        {row.capability}
                        {row.detail ? (
                          <span className={styles.rowDetail}>{row.detail}</span>
                        ) : null}
                      </th>
                      <ValueCell cell={row.gatherwise} />
                      <ValueCell cell={row.rockPaperCoin} />
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>

            <p className={styles.tableNote}>
              Comparison reflects publicly available information as of mid-2026.
              Confirm all details before publish.
            </p>
          </div>
        </section>

        <section className={styles.wins}>
          <div className={styles.wide}>
            <div className={styles.eyebrow}>Where Gatherwise wins</div>
            <h2 className={`${styles.sectionTitle} ${styles.winsTitle}`}>
              Four differences you will feel on every event.
            </h2>
            <div className={styles.winsGrid}>
              {differentiators.map((item) => (
                <div key={item.number} className={styles.winCard}>
                  <div className={styles.winNumber} aria-hidden="true">
                    {item.number}
                  </div>
                  <h3 className={styles.winTitle}>{item.title}</h3>
                  <p className={styles.winText}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className={styles.pricing}>
          <div className={styles.narrow}>
            <div className={styles.eyebrow}>Pricing snapshot</div>
            <h2 className={`${styles.sectionTitle} ${styles.pricingTitle}`}>
              Similar price. Very different amount of work covered.
            </h2>

            <div className={styles.pricingCard}>
              <div className={styles.pricingCardHead}>
                <h3 className={styles.pricingCardTitle}>
                  A planner running 30 events a year
                </h3>
              </div>
              <div className={styles.priceCols}>
                <div className={styles.priceCol}>
                  <div className={styles.priceColHead}>
                    <span className={styles.pricePlan}>
                      Gatherwise Professional
                    </span>
                    <span className={styles.priceAmount}>
                      $59<span className={styles.priceUnit}>/mo</span>
                    </span>
                  </div>
                  <div className={styles.pricePills}>
                    {gatherwisePlan.map((item) => (
                      <span key={item} className={styles.pricePill}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <span className={styles.priceFoot}>
                    Up to 50 events at a time. One subscription, one login.
                  </span>
                </div>

                <div className={styles.priceCol}>
                  <div className={styles.priceColHead}>
                    <span className={`${styles.pricePlan} ${styles.pricePlanAlt}`}>
                      Rock Paper Coin Premium
                    </span>
                    <span className={styles.priceAmount}>
                      $41<span className={styles.priceUnit}>/mo</span>
                    </span>
                  </div>
                  <div className={styles.pricePills}>
                    {rockPaperCoinPlan.map((item) => (
                      <span
                        key={item.label}
                        className={
                          item.included
                            ? `${styles.pricePill} ${styles.pricePillInk}`
                            : styles.pricePillOut
                        }
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>
                  <span className={styles.priceFoot}>
                    Plus a 2.5% fee on every payment processed. Sales &amp;
                    payments only — no event planning tools.
                  </span>
                </div>
              </div>
              <p className={styles.pricingNote}>
                Rock Paper Coin looks cheaper on paper — but every online
                payment carries an added 2.5% processing fee, and there is no
                timeline, budget, guest list or seating tool at any tier.
                Gatherwise starts at $29/mo. All figures as of mid-2026.
              </p>
            </div>
          </div>
        </section>

        <section id="trial" className={styles.cta}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Start your free trial</h2>
            <p className={styles.ctaText}>
              Effortless event planning starts here. Bring one live event over
              and see how it feels.
            </p>
            <div className={styles.ctaActions}>
              <a
                href="https://app.gatherwise.io/login?m=signup"
                className={styles.btnGold}
              >
                Start free trial
              </a>
              <a href="#comparison" className={styles.btnGhost}>
                Talk to a human first
              </a>
            </div>
            <p className={styles.ctaFine}>Cancel anytime</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>
          © 2026 Gatherwise. Rock Paper Coin is a trademark of its respective
          owner; comparison based on publicly available information.
        </span>
        <span>Effortless event planning starts here.</span>
      </footer>
    </div>
  );
}
