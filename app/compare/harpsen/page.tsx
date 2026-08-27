import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Karla } from "next/font/google";
import { comparisonGroups, type ComparisonCell } from "./comparison-data";
import styles from "./page.module.css";
import CompareFaq from "../CompareFaq";
import OtherComparisons from "../OtherComparisons";
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "../jsonld";
import PhosphorCheck from "../PhosphorCheck";
import PhosphorCheckCircle from "../PhosphorCheckCircle";

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
  title: "Harpsen Alternative | Gatherwise vs Harpsen",
  description:
    "Looking for a Harpsen alternative? Compare features side-by-side. Harpsen is a low-cost, wedding-only CRM, Gatherwise is an all-in-one software for event & wedding planners.",
  alternates: { canonical: "/compare/harpsen" },
};

const faqs = [
  {
    question:
      "Is Gatherwise a good Harpsen alternative?",
    answer:
      "If you have outgrown a sales-only tool, yes. Harpsen is inexpensive and covers the client-facing side of a wedding business — inquiries, proposals, contracts and invoicing. Gatherwise covers that same ground and then the planning half Harpsen doesn't reach: day-of timelines, task checklists, budgets, guest lists, seating charts and vendor management.",
  },
  {
    question:
      "What does Gatherwise do that Harpsen doesn't?",
    answer:
      "The event itself. Drag-and-drop timelines with templates and a live vendor share URL, task checklists with @mentions and due-date reminders, budget tracking, guest lists and RSVPs, seating charts and floor plans, vendor payments tied to the checklist, and a native iOS and Android app for event day.",
  },
  {
    question:
      "Is Gatherwise more expensive than Harpsen?",
    answer:
      "On the sticker price, yes — Harpsen competes on being cheap. Gatherwise starts at $29/mo and Professional is $59/mo for up to 40 events at a time. The comparison worth making is against Harpsen plus whatever you currently pay for timelines, seating and budgets, since those are separate subscriptions alongside it. All figures as of mid-2026.",
  },
  {
    question:
      "How do I switch from Harpsen to Gatherwise?",
    answer:
      "Start the 14-day free trial and run your next wedding through Gatherwise start to finish — inquiry, proposal, timeline, seating chart and final invoice — while Harpsen keeps the current book. You can cancel anytime.",
  },
];

type EventRow = {
  label: string;
  meta: string;
  paid?: boolean;
};

const eventRows: EventRow[] = [
  { label: "Lead, proposal & contract", meta: "Signed" },
  { label: "Day-of timeline", meta: "42 items · shared live" },
  { label: "Budget", meta: "$84,200 tracked" },
  { label: "Guest list & seating", meta: "180 guests · 18 tables" },
  { label: "Invoices & payments", meta: "Paid", paid: true },
];

const differentiators = [
  {
    number: "01",
    title: "Built for every event, not just weddings",
    body: "Harpsen is a wedding-only CRM, start to finish. Gatherwise runs corporate, social and nonprofit events on the same client record, the same subscription.",
  },
  {
    number: "02",
    title: "A phone that keeps up on event day",
    body: "Native iOS and Android, built for the one place it matters most: standing in a ballroom with your hands full. Harpsen is web-only.",
  },
  {
    number: "03",
    title: "Tasks that chase you, not the other way",
    body: "@mentions, comments, push and due-date reminders keep the six weeks before an event from slipping — Harpsen's reminders stop at the basics.",
  },
  {
    number: "04",
    title: "Money that moves on its own",
    body: "AI-assisted proposals and vendor payments tied to the checklist mean due dates surface as tasks automatically, instead of a separate thing to track.",
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
              Gatherwise vs. Harpsen
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleGold}>Gatherwise</span>{" "}
              is a modern, beautifully designed software for wedding &amp;
              event planners.
            </h1>
            <p className={styles.heroLede}>
              Gatherwise is planning software built to feel as polished as
              the events you run — budgets, guest lists, seating, contracts
              and vendor payments in one beautifully designed place, plus
              corporate and social events, a native mobile app for event day,
              and AI-assisted proposals.
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
              Beautifully designed, and built for every event.
            </h2>
            <p className={styles.positioningLede}>
              Gatherwise is a premium, beautifully designed platform for
              planners who want their business to feel as polished as the
              events they run — not just a wedding-only bargain tool.
            </p>
            <div className={styles.positioningGrid}>
              <div className={styles.posCard}>
                <div className={styles.posEyebrow}>Gatherwise</div>
                <h3 className={styles.posTitle}>
                  Modern software + CRM for every event you plan
                </h3>
                <p className={styles.posText}>
                  Built for planners, on purpose — weddings included, but not
                  weddings only. Timelines, tasks, budgets, guests, seating,
                  proposals and invoicing all sit on the same client record.
                </p>
                <ul className={styles.posList}>
                  {[
                    "Weddings, corporate and social events on one CRM",
                    "Native iOS and Android app for event day",
                    "AI-assisted proposals and automatic vendor-payment reminders",
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
                  Harpsen
                </div>
                <h3 className={styles.posTitle}>
                  A genuinely capable wedding-only CRM at a flat, unbeatable
                  price
                </h3>
                <p className={styles.posText}>
                  Harpsen packs CRM, budgets, guest lists, seating and
                  contracts into one flat-rate subscription — a serious
                  option for a wedding-only business watching every dollar.
                </p>
                <ul className={styles.posList}>
                  {[
                    "Unlimited events, clients and team members for $12/mo",
                    "Guest list, seating and vendor tools other CRMs skip",
                    "Wedding-only, web-based — no corporate or social events, no app",
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
                Gatherwise and Harpsen capabilities compared, grouped by area.
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
                    Harpsen
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
                      <ValueCell cell={row.harpsen} />
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>

            <p className={styles.tableNote}>
              Comparison reflects publicly available information as of
              mid-2026. Confirm all details before publish.
            </p>
          </div>
        </section>

        <section className={styles.wins}>
          <div className={styles.wide}>
            <div className={styles.eyebrow}>Where Gatherwise wins</div>
            <h2 className={`${styles.sectionTitle} ${styles.winsTitle}`}>
              Four differences that come down to quality and design.
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

        <CompareFaq competitor="Harpsen" faqs={faqs} />

        <OtherComparisons slug="harpsen" />

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
          © 2026 Gatherwise. Harpsen is a trademark of its respective owner;
          comparison based on publicly available information.
        </span>
        <span>Effortless event planning starts here.</span>
      </footer>

      <SoftwareApplicationJsonLd />
      <BreadcrumbJsonLd slug="harpsen" name="Harpsen" />
    </div>
  );
}
