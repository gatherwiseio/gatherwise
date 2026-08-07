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
  title: "Gatherwise vs Planning Pod for Event & Wedding Planners",
  description:
    "Compare features side-by-side. Planning Pod serves venues, caterers and planners alike, Gatherwise is built specifically for event & wedding planners",
};

type EventRow = {
  label: string;
  meta: string;
  paid?: boolean;
};

const eventRows: EventRow[] = [
  { label: "Day-of timeline", meta: "38 items · shared live" },
  { label: "Task checklist", meta: "9 due this week" },
  { label: "Budget", meta: "$84,200 tracked" },
  { label: "Guest list & seating", meta: "180 guests · 18 tables" },
  { label: "Proposal, contract & invoices", meta: "Paid", paid: true },
];

const differentiators = [
  {
    number: "01",
    title: "Built for one job, not five",
    body: "Planning Pod spreads 80+ tools across venues, caterers and planners. Every screen in Gatherwise assumes one thing: you're a planner running client events.",
  },
  {
    number: "02",
    title: "Tasks that chase you",
    body: "@mentions, comments, push and due-date reminders keep the six weeks before a wedding from slipping — Planning Pod's checklists don't notify your team the same way.",
  },
  {
    number: "03",
    title: "A real app, not a bookmark",
    body: "Planning Pod runs in a mobile browser only — no iOS or Android app. Gatherwise gives you a native app built for the one place it matters most: standing in a ballroom on event day.",
  },
  {
    number: "04",
    title: "AI-assisted proposals",
    body: "Draft a polished proposal in minutes with AI assistance — a step Planning Pod's proposal builder doesn't include.",
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

const planningPodPlan: { label: string; included: boolean }[] = [
  { label: "CRM & lead pipeline", included: true },
  { label: "Proposals & contracts", included: true },
  { label: "Invoicing & payments", included: true },
  { label: "Timelines & checklists", included: true },
  { label: "Budget, guests & seating", included: true },
  { label: "Native mobile app — not included", included: false },
  { label: "AI-assisted proposals — not included", included: false },
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
              Gatherwise vs. Planning Pod
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleGold}>Gatherwise</span> is built
              for exactly one kind of business: event and wedding planners.
            </h1>
            <p className={styles.heroLede}>
              Planning Pod is a broad, 20+ tool platform built to serve venues,
              caterers and planners alike — floor plans, BEOs, CRM and more.
              Gatherwise covers the same planning ground with software shaped
              around one job only: how event and wedding planners actually run
              their business, with a native app in your pocket on event day.
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
                Native app on event day
              </span>
            </div>
          </div>
        </section>

        <section className={styles.positioning}>
          <div className={styles.wide}>
            <h2 className={`${styles.sectionTitle} ${styles.positioningTitle}`}>
              Gatherwise is built for planners. Planning Pod is built for
              everyone.
            </h2>
            <p className={styles.positioningLede}>
              Neither approach is wrong. It comes down to whether you want a
              platform flexible enough for venues and caterers too, or software
              shaped around your work alone.
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
                  budget, guests and seating — with a native app for event day,
                  not just a mobile browser.
                </p>
                <ul className={styles.posList}>
                  {[
                    "Every planning and sales tool a planner needs, nothing built for venues or caterers",
                    "Native iOS and Android app — not just a responsive website",
                    "AI-assisted proposals and automatic task reminders",
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
                  Planning Pod
                </div>
                <h3 className={styles.posTitle}>
                  An established, do-everything platform for the events industry
                </h3>
                <p className={styles.posText}>
                  Over a decade serving venues, caterers, non-profits and
                  planners alike, with 20+ tools spanning floor plans, BEOs,
                  CRM and event management. Real breadth, built to flex across
                  very different kinds of businesses.
                </p>
                <ul className={styles.posList}>
                  {[
                    "80+ features spanning venues, catering and event planning",
                    "Unlimited users included on every plan",
                    "No native mobile app — browser access only, even on a phone",
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
                Gatherwise and Planning Pod capabilities compared, grouped by
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
                    Planning Pod
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
                      <ValueCell cell={row.planningPod} />
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
              Four differences you will feel in an ordinary week.
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
              More capacity, higher price at Planning Pod&apos;s scale.
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
                      Planning Pod Enterprise 50
                    </span>
                    <span className={styles.priceAmount}>
                      $159<span className={styles.priceUnit}>/mo</span>
                    </span>
                  </div>
                  <div className={styles.pricePills}>
                    {planningPodPlan.map((item) => (
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
                    Up to 50 events at a time, billed monthly. Entry tier starts
                    at $59/mo (billed yearly) for far fewer events.
                  </span>
                </div>
              </div>
              <p className={styles.pricingNote}>
                At comparable capacity — up to 50 events — Gatherwise
                Professional is $59/mo and Planning Pod&apos;s matching tier
                runs $159/mo. Gatherwise starts at $29/mo overall. All figures
                as of mid-2026.
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
          © 2026 Gatherwise. Planning Pod is a trademark of its respective
          owner; comparison based on publicly available information.
        </span>
        <span>Effortless event planning starts here.</span>
      </footer>
    </div>
  );
}
