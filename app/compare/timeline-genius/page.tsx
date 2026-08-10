import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import PhosphorCheck from "../PhosphorCheck";
import PhosphorCheckCircle from "../PhosphorCheckCircle";
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
  title: "Gatherwise vs Timeline Genius for Event & Wedding Planners",
  description:
    "Compare features side-by-side. Timeline Genius runs timelines, Gatherwise is an all-in-one software for event & wedding planners",
};

type EventRow = {
  label: string;
  meta: string;
  paid?: boolean;
};

const eventRows: EventRow[] = [
  { label: "Day-of timeline", meta: "42 items · shared live" },
  { label: "Task checklist", meta: "9 due this week" },
  { label: "Budget", meta: "$84,200 tracked" },
  { label: "Guest list & seating", meta: "180 guests · 18 tables" },
  { label: "Proposal, contract & invoices", meta: "Paid", paid: true },
];

const differentiators = [
  {
    number: "01",
    title: "The whole event, not just the day",
    body: "Budget, guest list, seating and vendor payments live beside the timeline — so you stop stitching four tools together for one wedding.",
  },
  {
    number: "02",
    title: "Sales tools included",
    body: "Leads, proposals, contracts and invoicing are part of the same subscription. Timeline Genius leaves that to a separate CRM.",
  },
  {
    number: "03",
    title: "A real mobile app",
    body: "Native iOS and Android, built for the one place it matters most: standing in a ballroom on event day with your hands full.",
  },
  {
    number: "04",
    title: "Tasks that chase you",
    body: "@mentions, comments, push and due-date reminders keep the six weeks before a wedding from slipping — not just the twelve hours of it.",
  },
];

const gatherwisePlan = [
  "Timelines",
  "Tasks & notifications",
  "Budget",
  "Guests & seating",
  "CRM & lead inquiries",
  "Proposals & contracts",
  "Invoicing & payments",
];

const timelineGeniusPlan: { label: string; included: boolean }[] = [
  { label: "Timelines", included: true },
  { label: "Checklists", included: true },
  { label: "Budget — buy elsewhere", included: false },
  { label: "Guests & seating — buy elsewhere", included: false },
  { label: "CRM & lead inquiries — buy elsewhere", included: false },
  { label: "Proposals & contracts — buy elsewhere", included: false },
  { label: "Invoicing & payments — buy elsewhere", included: false },
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
      <span className={styles.cellContent}>
        <span
          className={`${styles.mark} ${included ? styles.markYes : styles.markNo}`}
          aria-hidden="true"
        >
          {included ? <PhosphorCheck size={14} /> : "—"}
        </span>
        <span className={styles.srOnly}>
          {included ? "Included" : "Not included"}
        </span>
        {cell.note ? <span className={styles.cellNote}>{cell.note}</span> : null}
      </span>
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
              Gatherwise vs. Timeline Genius
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleMuted}>Timeline Genius</span> runs
              your timeline.{" "}
              <span className={styles.heroTitleGold}>Gatherwise</span> runs the
              whole business.
            </h1>
            <p className={styles.heroLede}>
              Timeline Genius does one thing and does it well: event timelines
              and checklists. Gatherwise covers that same ground and everything
              around it — tasks, budgets, guests, seating, proposals and
              invoicing — in one place.
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
                Export entire event
              </span>
            </div>
          </div>
        </section>

        <section className={styles.positioning}>
          <div className={styles.wide}>
            <h2 className={`${styles.sectionTitle} ${styles.positioningTitle}`}>
              A timeline tool, or the whole planning platform.
            </h2>
            <p className={styles.positioningLede}>
              Neither approach is wrong. It comes down to whether the timeline is
              the only part of your process that needs software.
            </p>
            <div className={styles.positioningGrid}>
              <div className={styles.posCard}>
                <div className={styles.posEyebrow}>Gatherwise</div>
                <h3 className={styles.posTitle}>
                  Modern software + CRM for event and wedding planners
                </h3>
                <p className={styles.posText}>
                  Built for planners, on purpose. Timelines, tasks, budgets,
                  guests, seating, proposals and invoicing all sit on the same
                  client record — so nothing is re-entered twice.
                </p>
                <ul className={styles.posList}>
                  {[
                    "Timelines as strong as a dedicated timeline tool",
                    "Planning tools and CRM in one place",
                    "A native iOS and Android app for event day",
                  ].map((item) => (
                    <li key={item} className={styles.posItem}>
                      <span className={styles.posMark} aria-hidden="true">
                        <PhosphorCheckCircle size={18} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${styles.posCard} ${styles.posCardAlt}`}>
                <div className={`${styles.posEyebrow} ${styles.posEyebrowAlt}`}>
                  Timeline Genius
                </div>
                <h3 className={styles.posTitle}>
                  A focused, well-made tool for wedding day timelines
                </h3>
                <p className={styles.posText}>
                  Ten-plus years of doing one job properly: detailed day-of
                  runsheets, vendor-specific views, bulk time shifting and day-of
                  text reminders. Planners who love it, love it for good reason.
                </p>
                <ul className={styles.posList}>
                  {[
                    "Timelines and checklists, deeply developed",
                    "Vendor rolodex and day-of text reminders",
                    "No CRM, budgets, guests or seating — pair it with other tools",
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
                Gatherwise and Timeline Genius capabilities compared, grouped by
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
                    Timeline Genius
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
                      <ValueCell cell={row.timelineGenius} />
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

        <section className={styles.fit}>
          <div className={styles.fitCard}>
            <div className={styles.eyebrow}>
              Where Timeline Genius may fit better
            </div>
            <h2 className={styles.fitTitle}>
              We would rather you pick the right tool than pick us.
            </h2>
            <p className={styles.fitText}>
              If the timeline is genuinely the only part of your process that
              needs software — your CRM, budgets and guest lists already work the
              way you like — Timeline Genius is a well-built, focused tool with
              more than a decade behind it.
            </p>
            <p className={styles.fitClose}>
              If you would rather get rid of dozens of tools and run the whole
              event — and the whole business — from one place, that is what
              Gatherwise is for.
            </p>
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
                      Timeline Genius Unlimited
                    </span>
                    <span className={styles.priceAmount}>
                      $54.95<span className={styles.priceUnit}>/mo</span>
                    </span>
                  </div>
                  <div className={styles.pricePills}>
                    {timelineGeniusPlan.map((item) => (
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
                    Unlimited events, or $194.95 for five. Timelines only.
                  </span>
                </div>
              </div>
              <p className={styles.pricingNote}>
                Within about $4 a month of each other — the difference is how
                many other subscriptions you still need. Gatherwise starts at
                $29/mo. All figures as of mid-2026.
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
              <a href="#comparison" className={styles.btnGhost}>
                Talk to a human first
              </a>
              <a
                href="https://app.gatherwise.io/login?m=signup"
                className={styles.btnGold}
              >
                Start free trial
              </a>
            </div>
            <p className={styles.ctaFine}>Cancel anytime</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>
          © 2026 Gatherwise. Timeline Genius is a trademark of its respective
          owner; comparison based on publicly available information.
        </span>
        <span>Effortless event planning starts here.</span>
      </footer>
    </div>
  );
}
