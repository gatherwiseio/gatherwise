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
  title: "HoneyBook Alternative | Gatherwise vs HoneyBook",
  description:
    "Looking for a HoneyBook alternative? Compare features side-by-side. HoneyBook serves all kinds of businesses, Gatherwise is built specifically for event & wedding planners.",
  alternates: { canonical: "/compare/honeybook" },
};

const faqs = [
  {
    question:
      "Is Gatherwise a good HoneyBook alternative for event and wedding planners?",
    answer:
      "It comes down to what you need after the contract is signed. HoneyBook is a capable clientflow CRM — leads, proposals, contracts, invoicing and payments — and Gatherwise covers that same ground. The difference is that Gatherwise keeps going into the event itself: day-of timelines, task checklists, budgets, guest lists, seating charts and vendor management all sit on the same client record. If HoneyBook is handling your sales but you still run the actual event out of spreadsheets, that gap is what Gatherwise is for.",
  },
  {
    question:
      "What does Gatherwise do that HoneyBook doesn't?",
    answer:
      "Everything on the planning side. Drag-and-drop day-of timelines with reusable templates and a live share URL for vendors, task checklists with @mentions and due-date reminders, budget tracking, guest lists and RSVPs, seating charts and floor plans, and vendor management with vendor payments that appear on the checklist. HoneyBook is built for service businesses of every kind, so none of that is in its scope.",
  },
  {
    question:
      "How does Gatherwise pricing compare to HoneyBook?",
    answer:
      "Gatherwise starts at $29/mo, and the Professional plan is $59/mo for up to 40 events at a time. HoneyBook runs roughly $29–$109/mo depending on plan. The two land within about $10 a month of each other — the real difference is how many other subscriptions you are still paying for alongside. All figures as of mid-2026.",
  },
  {
    question:
      "How do I switch from HoneyBook to Gatherwise?",
    answer:
      "Most planners don't move everything at once. Start the 14-day free trial, run your next event end to end in Gatherwise while HoneyBook finishes the work already in flight, then move the rest across between seasons. You can cancel anytime.",
  },
];

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
    title: "It doesn't stop at the contract",
    body: "HoneyBook takes a client from inquiry to signed and paid, then hands off. Gatherwise carries that same client into the timeline, budget, guest list and seating chart.",
  },
  {
    number: "02",
    title: "Event tools HoneyBook doesn't have",
    body: "Timelines, budget tracking, guest lists, RSVPs and seating charts are core features here — not something you bolt on with a second subscription.",
  },
  {
    number: "03",
    title: "One client record, end to end",
    body: "The lead who signs the proposal is the same record whose seating chart you build. Nothing gets re-entered into a separate planning tool.",
  },
  {
    number: "04",
    title: "Purpose-built for planners",
    body: "HoneyBook serves interior designers, web designers and independent consultants alike. Gatherwise is shaped around one job: how event and wedding planners actually work.",
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

const honeybookPlan: { label: string; included: boolean }[] = [
  { label: "Leads & CRM", included: true },
  { label: "Proposals & contracts", included: true },
  { label: "Invoicing & payments", included: true },
  { label: "Scheduling & automations", included: true },
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
              Gatherwise vs. HoneyBook
            </div>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroTitleMuted}>HoneyBook</span> runs your
              client flow.{" "}
              <span className={styles.heroTitleGold}>Gatherwise</span> runs the
              whole event.
            </h1>
            <p className={styles.heroLede}>
              HoneyBook is excellent at the sales side — leads, proposals,
              contracts and payments. Gatherwise does all of that too, then keeps
              going into the part HoneyBook was never built for: timelines,
              budgets, guests and seating.
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
              A clientflow tool, or the whole planning platform.
            </h2>
            <p className={styles.positioningLede}>
              Both win you the client and get you paid. The question is what
              happens next — whether your software follows you into planning the
              event, or stops at the signed contract.
            </p>
            <div className={styles.positioningGrid}>
              <div className={styles.posCard}>
                <div className={styles.posEyebrow}>Gatherwise</div>
                <h3 className={styles.posTitle}>
                  Modern software + CRM for event and wedding planners
                </h3>
                <p className={styles.posText}>
                  Built for planners, on purpose. Leads, proposals, contracts and
                  invoicing sit on the same client record as the timeline,
                  budget, guests and seating — so nothing is re-entered twice.
                </p>
                <ul className={styles.posList}>
                  {[
                    "Sales and CRM as capable as a dedicated clientflow tool",
                    "Timelines, budgets, guests and seating built in",
                    "One record from first inquiry to final seating chart",
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
                  HoneyBook
                </div>
                <h3 className={styles.posTitle}>
                  Polished clientflow software for every service business
                </h3>
                <p className={styles.posText}>
                  A deservedly popular way to run leads, proposals, contracts,
                  payments, scheduling and automations. Photographers, coaches
                  and freelancers love it — but it stops where event execution
                  begins.
                </p>
                <ul className={styles.posList}>
                  {[
                    "Strong sales, contracts, payments and automations",
                    "Scheduling and workflow tools built in",
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
                Gatherwise and HoneyBook capabilities compared, grouped by area.
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
                    HoneyBook
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
                      <ValueCell cell={row.honeybook} />
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
                    Up to 40 events at a time. One subscription, one login.
                  </span>
                </div>

                <div className={styles.priceCol}>
                  <div className={styles.priceColHead}>
                    <span className={`${styles.pricePlan} ${styles.pricePlanAlt}`}>
                      HoneyBook Essentials
                    </span>
                    <span className={styles.priceAmount}>
                      $49<span className={styles.priceUnit}>/mo</span>
                    </span>
                  </div>
                  <div className={styles.pricePills}>
                    {honeybookPlan.map((item) => (
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
                    Unlimited clients and projects. Clientflow only — no event
                    tools.
                  </span>
                </div>
              </div>
              <p className={styles.pricingNote}>
                Within about $10 a month of each other — the difference is
                everything that happens after the contract is signed. Gatherwise
                starts at $29/mo; HoneyBook runs about $29–$109/mo by plan. All
                figures as of mid-2026.
              </p>
            </div>
          </div>
        </section>

        <CompareFaq competitor="HoneyBook" faqs={faqs} />

        <OtherComparisons slug="honeybook" />

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
          © 2026 Gatherwise. HoneyBook is a trademark of its respective owner;
          comparison based on publicly available information.
        </span>
        <span>Effortless event planning starts here.</span>
      </footer>

      <SoftwareApplicationJsonLd />
      <BreadcrumbJsonLd slug="honeybook" name="HoneyBook" />
    </div>
  );
}
