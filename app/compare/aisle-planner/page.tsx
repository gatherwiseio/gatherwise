import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Karla } from "next/font/google";
import PhosphorCheck from "../PhosphorCheck";
import PhosphorCheckCircle from "../PhosphorCheckCircle";
import { comparisonGroups, type ComparisonCell } from "./comparison-data";
import styles from "./page.module.css";
import CompareFaq from "../CompareFaq";
import OtherComparisons from "../OtherComparisons";
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "../jsonld";

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
  title: "Aisle Planner Alternative | Gatherwise vs Aisle Planner",
  description:
    "Looking for an Aisle Planner alternative? Compare features side-by-side. Aisle Planner serves the whole events industry, Gatherwise is built specifically for event & wedding planners.",
  alternates: { canonical: "/compare/aisle-planner" },
};

const faqs = [
  {
    question:
      "Is Gatherwise a good Aisle Planner alternative?",
    answer:
      "Both are events-industry platforms that cover planning and client work, so the honest answer is that this one turns on pricing model and fit. Aisle Planner charges per project, which means your bill climbs with your book of business. Gatherwise is a flat subscription with a concurrent-event limit, and every tool in it is shaped around how event and wedding planners work rather than the wider industry.",
  },
  {
    question:
      "What does Gatherwise do differently from Aisle Planner?",
    answer:
      "The pricing structure is the clearest difference — a flat monthly plan instead of per-project fees. Beyond that, Gatherwise ships a native iOS and Android app for event day, keeps sales and planning on a single client record, and ties vendor payment due dates into the same task checklist your team already works from.",
  },
  {
    question:
      "Is Gatherwise cheaper than Aisle Planner?",
    answer:
      "At around 30 events a year, yes, and by a wide margin: Gatherwise Professional is $59/mo against roughly $164.99/mo for Aisle Planner — about $1,272 a year. Gatherwise starts at $29/mo on the entry plan. Because Aisle Planner bills per project, the gap widens the more events you take on. All figures as of mid-2026.",
  },
  {
    question:
      "How do I switch from Aisle Planner to Gatherwise?",
    answer:
      "Start the 14-day free trial and run one live event through Gatherwise in parallel — timeline, budget, guest list and seating — while Aisle Planner carries the projects already underway. Because Gatherwise is billed flat rather than per project, there's no cost to setting the next event up early. You can cancel anytime.",
  },
];

type TimelineEntry = {
  time: string;
  label: string;
  meta: string;
  accent?: "ink";
  moving?: boolean;
};

const timelineEntries: TimelineEntry[] = [
  {
    time: "2:30 PM",
    label: "Florals delivered — ballroom",
    meta: "Bloom & Co.",
  },
  {
    time: "3:15 PM",
    label: "Ceremony chairs set — 180",
    meta: "Venue team",
    accent: "ink",
  },
  {
    time: "4:00 PM",
    label: "First look — south garden",
    meta: "Moving",
    moving: true,
  },
  { time: "5:30 PM", label: "Guests arrive — welcome pour", meta: "Bar lead" },
];

const differentiators = [
  {
    number: "01",
    title: "Timelines that do more",
    body: "Filter, sort and add key details as you build — then export the entire event in one go, which Aisle Planner cannot do.",
  },
  {
    number: "02",
    title: "Tasks that chase you and your clients",
    body: "Robust task management with notifications, so nothing slips in the six weeks before a wedding. Aisle Planner lacks this.",
  },
  {
    number: "03",
    title: "A real mobile app",
    body: "Native, and built for the one place it matters most: standing in a ballroom on event day with your hands full.",
  },
  {
    number: "04",
    title: "Client login by magic link",
    body: "Your clients open their portal from one link — no password to create, reset or forget.",
  },
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
          <Link href="/" className={styles.brandName}>
            Gatherwise
          </Link>
          <span className={styles.brandTag}>Comparison</span>
        </div>
        <nav className={styles.nav}>
          <a href="#comparison" className={styles.navLink}>
            Feature table
          </a>
          <Link href="/compare" className={styles.navLink}>
            All comparisons
          </Link>
          <a href="#pricing" className={styles.navLink}>
            Pricing
          </a>
          <a href="https://app.gatherwise.io/login?m=signup" className={styles.btnPrimary}>
            Start free trial
          </a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={`${styles.eyebrow} ${styles.heroEyebrow}`}>
              The #1 Aisle Planner alternative
            </div>
            <h1 className={styles.heroTitle}>
              Replace Aisle Planner with one platform that grows with your
              business.
            </h1>
            <p className={styles.heroLede}>
              Aisle Planner has served the events industry for years, across
              planners, venues, caterers, florists and photographers. Gatherwise
              is planning and sales software built for one job only: the way
              event and wedding planners work today.
            </p>
            <div className={styles.heroActions}>
              <a href="https://app.gatherwise.io/login?m=signup" className={styles.btnPrimaryLarge}>
                Start free trial
              </a>
              <a href="#comparison" className={styles.linkQuiet}>
                See the full comparison
              </a>
            </div>
          </div>

          <div className={styles.preview}>
            <div className={styles.previewHead}>
              <div className={styles.previewTitle}>
                Harper &amp; Cole — Day Of
              </div>
              <div className={styles.previewHint}>Drag to reorder</div>
            </div>
            <ul className={styles.previewRows}>
              {timelineEntries.map((entry) => (
                <li
                  key={entry.time}
                  className={[
                    styles.previewRow,
                    entry.accent === "ink" ? styles.previewRowInk : "",
                    entry.moving ? styles.previewRowMoving : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className={styles.previewTime}>{entry.time}</span>
                  <span className={styles.previewBody}>
                    <span className={styles.previewLabel}>{entry.label}</span>
                    <span
                      className={
                        entry.moving
                          ? styles.previewMetaActive
                          : styles.previewMeta
                      }
                    >
                      {entry.meta}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.previewChips}>
              <span className={styles.chip}>Filter: vendor</span>
              <span className={styles.chip}>Sort: time</span>
              <span className={`${styles.chip} ${styles.chipSolid}`}>
                Export entire event
              </span>
            </div>
          </div>
        </section>

        <section className={styles.positioning}>
          <div className={styles.wide}>
            <h2 className={`${styles.sectionTitle} ${styles.positioningTitle}`}>
              Built just for planners — or built for everyone.
            </h2>
            <p className={styles.positioningLede}>
              Neither is wrong. It comes down to whether you want a platform for
              the whole events industry, or software shaped around your work
              alone.
            </p>
            <div className={styles.positioningGrid}>
              <div className={styles.posCard}>
                <div className={styles.posEyebrow}>Gatherwise</div>
                <h3 className={styles.posTitle}>
                  Planning and sales software for planners only
                </h3>
                <p className={styles.posText}>
                  Built narrow on purpose. Timelines, tasks, proposals,
                  invoicing, seating — every screen assumes you are a planner
                  running client events.
                </p>
                <ul className={styles.posList}>
                  {[
                    "Made for event and wedding planners, full stop",
                    "A native iOS and Android app for event day",
                    "Robust timelines and task checklists",
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
                  Aisle Planner
                </div>
                <h3 className={styles.posTitle}>
                  An established platform for the whole events industry
                </h3>
                <p className={styles.posText}>
                  A well-known name for years. It serves planners alongside
                  venues, caterers, florists and photographers — real breadth,
                  and an advantage for those businesses.
                </p>
                <ul className={styles.posList}>
                  {[
                    "Five kinds of business on one platform",
                    "Long track record and name recognition",
                    "Planners are one of the businesses it serves",
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
            <h2 className={styles.sectionTitle}>
              Side by side, as of mid-2026.
            </h2>

            <table className={styles.table}>
              <caption className={styles.srOnly}>
                Gatherwise and Aisle Planner capabilities compared, grouped by
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
                    Aisle Planner
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
                      <ValueCell cell={row.aislePlanner} />
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
            <div className={styles.eyebrow}>Why Gatherwise</div>
            <h2 className={`${styles.sectionTitle} ${styles.pricingTitle}`}>
              A lower price is only the start.
            </h2>
            <p className={styles.pricingIntro}>
              Price is a real advantage — for many planners Aisle Planner costs
              about 3× as much — but it isn&apos;t the main reason to choose
              Gatherwise.
            </p>

            <div className={styles.reasonsGrid}>
              <div className={styles.reasonCard}>
                <h3 className={styles.reasonTitle}>More affordable pricing</h3>
                <p className={styles.reasonText}>
                  Significantly more value at a lower cost — about $1,272 a year
                  less than Aisle Planner for a planner running 30 events.
                </p>
              </div>
              <div className={styles.reasonCard}>
                <h3 className={styles.reasonTitle}>Built only for planners</h3>
                <p className={styles.reasonText}>
                  Aisle Planner serves the whole events industry. We&apos;re
                  focused entirely on the workflows and needs of event and
                  wedding planners.
                </p>
              </div>
              <div className={styles.reasonCard}>
                <h3 className={styles.reasonTitle}>Real, hands-on support</h3>
                <p className={styles.reasonText}>
                  When you need help you&apos;re talking directly to our team —
                  not filing a ticket and waiting days for a reply.
                </p>
              </div>
              <div className={styles.reasonCard}>
                <h3 className={styles.reasonTitle}>
                  Fast, customer-driven innovation
                </h3>
                <p className={styles.reasonText}>
                  We ship features based on planner feedback. Instead of waiting
                  months or years, the platform is constantly evolving.
                </p>
              </div>
            </div>

            <div className={styles.pricingCard}>
              <div className={styles.pricingCardHead}>
                <h3 className={styles.pricingCardTitle}>
                  A planner running 30 events a year
                </h3>
              </div>
              <div className={styles.chart}>
                <div className={styles.chartColumn}>
                  <div className={styles.chartTrack} aria-hidden="true">
                    <span
                      className={`${styles.chartBar} ${styles.chartBarGatherwise}`}
                      style={{ height: "35.8%" }}
                    />
                  </div>
                  <span className={styles.chartValue}>$59/mo</span>
                  <span className={styles.chartLabel}>
                    Gatherwise Professional
                    <span className={styles.chartLabelSub}>
                      Up to 40 events
                    </span>
                  </span>
                </div>
                <div className={styles.chartColumn}>
                  <div className={styles.chartTrack} aria-hidden="true">
                    <span
                      className={`${styles.chartBar} ${styles.chartBarAisle}`}
                      style={{ height: "100%" }}
                    />
                  </div>
                  <span className={styles.chartValue}>$164.99/mo</span>
                  <span className={styles.chartLabel}>
                    Aisle Planner
                    <span className={styles.chartLabelSub}>
                      Up to 50 events
                    </span>
                  </span>
                </div>
              </div>
              <p className={styles.pricingNote}>
                At around 30 events a year, Gatherwise Professional is $59/mo
                and Aisle Planner is $164.99/mo — about $1,272 a year more. All
                figures accurate as of mid-2026.
              </p>
            </div>
          </div>
        </section>

        <CompareFaq competitor="Aisle Planner" faqs={faqs} />

        <OtherComparisons slug="aisle-planner" />

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
              <a href="https://app.gatherwise.io/login?m=signup" className={styles.btnGold}>
                Start free trial
              </a>
            </div>
            <p className={styles.ctaFine}>Cancel anytime</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>
          © 2026 Gatherwise. Aisle Planner is a trademark of its respective
          owner; comparison based on publicly available information.
        </span>
        <span>Effortless event planning starts here.</span>
      </footer>

      <SoftwareApplicationJsonLd />
      <BreadcrumbJsonLd slug="aisle-planner" name="Aisle Planner" />
    </div>
  );
}
