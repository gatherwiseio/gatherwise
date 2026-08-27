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
  title: "Rock Paper Coin Alternative | Gatherwise vs Rock Paper Coin",
  description:
    "Looking for a Rock Paper Coin alternative? Compare features side-by-side. Rock Paper Coin handles proposals and payments, Gatherwise is an all-in-one software for event & wedding planners.",
  alternates: { canonical: "/compare/rock-paper-coin" },
};

const faqs = [
  {
    question:
      "Is Gatherwise a good Rock Paper Coin alternative?",
    answer:
      "If the paperwork is the only part of your process that lives in software, Rock Paper Coin does that job. Gatherwise suits planners who want the contracts and payments and the event they belong to in one place — timeline, budget, guest list, seating and vendor management on the same client record, rather than a second subscription bolted alongside.",
  },
  {
    question:
      "What does Gatherwise do that Rock Paper Coin doesn't?",
    answer:
      "Rock Paper Coin is built around documents moving between people: contracts out, invoices out, payments in. It has no timeline, budget, guest list or seating tool at any tier. Gatherwise has all four, plus task checklists with reminders and a native iOS and Android app — Rock Paper Coin is web-only.",
  },
  {
    question:
      "How does Gatherwise pricing compare to Rock Paper Coin?",
    answer:
      "Rock Paper Coin is cheaper on the sticker — around $41/mo against $59/mo for Gatherwise Professional — but every online payment it processes carries an added 2.5% fee, which on event-sized invoices is the larger number. Gatherwise starts at $29/mo. All figures as of mid-2026.",
  },
  {
    question:
      "How do I switch from Rock Paper Coin to Gatherwise?",
    answer:
      "Start the 14-day free trial and send your next proposal and invoice through Gatherwise while Rock Paper Coin sees out the contracts already signed in it. Build that event's timeline and seating chart in the same place and you'll know within one event whether it fits. You can cancel anytime.",
  },
];

type EventRow = {
  label: string;
  meta: string;
  paid?: boolean;
};

const eventRows: EventRow[] = [
  { label: "Client contract & deposit", meta: "Signed · 50% in", paid: true },
  { label: "Vendor contracts", meta: "7 booked · 2 awaiting" },
  { label: "Vendor payment schedule", meta: "Next due in 9 days" },
  { label: "Run of show", meta: "42 items · shared live" },
  { label: "Floor plan & seating", meta: "180 guests · 18 tables" },
];

const differentiators = [
  {
    number: "01",
    title: "Vendor money on the same checklist as vendor work",
    body: "A florist's balance due and the hour they load in belong to one booking. Here they are — payment dates arrive as tasks, beside the run of show they support.",
  },
  {
    number: "02",
    title: "The 2.5% is the number to compare",
    body: "Rock Paper Coin's subscription is the cheaper line item, but its added 2.5% processing fee scales with every deposit and balance you collect. On event-sized invoices that is the figure that decides it.",
  },
  {
    number: "03",
    title: "Built for a ballroom, not a desk",
    body: "Native iOS and Android, for the hours when you are on your feet with a clipboard in one hand. Rock Paper Coin is web-only — fine for signing a contract, less so at 4pm on load-in day.",
  },
  {
    number: "04",
    title: "Shaped for planners, not for everyone",
    body: "Serving photographers, florists and venues equally well means serving none of them specifically. Gatherwise makes the opposite trade: one trade, fitted properly.",
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
              Rock Paper Coin keeps your contracts and invoices tidy and moves
              money between you and your vendors. Gatherwise does that as well —
              and attaches every one of those documents to the event it belongs
              to, alongside the run of show, the budget, the guest list and the
              floor plan.
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
              Paperwork in one place, or the event that paperwork is for?
            </h2>
            <p className={styles.positioningLede}>
              Every planner needs contracts signed and vendors paid. The
              question is whether those documents sit in a system of their own,
              or attached to the event they belong to.
            </p>
            <div className={styles.positioningGrid}>
              <div className={styles.posCard}>
                <div className={styles.posEyebrow}>Gatherwise</div>
                <h3 className={styles.posTitle}>
                  Modern software + CRM for event and wedding planners
                </h3>
                <p className={styles.posText}>
                  Contracts and invoices are attached to an event here, not
                  filed beside one. Book a vendor and the payment dates land on
                  your checklist; open the run of show and the same vendor is
                  already on it.
                </p>
                <ul className={styles.posList}>
                  {[
                    "Proposals, contracts and online payments included",
                    "Vendor payment dates surface as tasks, not reminders you set",
                    "The run of show, floor plan and budget live in the same event",
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
                  Rock Paper Coin
                </div>
                <h3 className={styles.posTitle}>
                  A shared paperwork hub for the whole event industry
                </h3>
                <p className={styles.posText}>
                  One job, done cleanly: moving documents between the people on
                  an event. Photographers, florists, venues and planners all
                  work in it, which is the appeal — the vendor you are chasing
                  may already have an account.
                </p>
                <ul className={styles.posList}>
                  {[
                    "Strong proposals, contracts and Stripe-powered payments",
                    "QuickBooks sync, and vendors on the platform already",
                    "The documents, but not the event — no run of show, budget, guest list or floor plan",
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
              Four things that decide it, once the contract is signed.
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
                    Up to 40 events at a time. One subscription, one login.
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

        <CompareFaq competitor="Rock Paper Coin" faqs={faqs} />

        <OtherComparisons slug="rock-paper-coin" />

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

      <SoftwareApplicationJsonLd />
      <BreadcrumbJsonLd slug="rock-paper-coin" name="Rock Paper Coin" />
    </div>
  );
}
