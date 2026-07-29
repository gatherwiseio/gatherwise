import { comparisonGroups, type ComparisonCell } from "./comparison-data";
import styles from "./page.module.css";

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
    <div className={styles.page}>
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
          <a href="#trial" className={styles.btnPrimary}>
            Start free trial
          </a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={`${styles.eyebrow} ${styles.heroEyebrow}`}>
              Gatherwise vs. Aisle Planner
            </div>
            <h1 className={styles.heroTitle}>
              Gatherwise or Aisle Planner? An honest look at both.
            </h1>
            <p className={styles.heroLede}>
              Aisle Planner has served the events industry for years, across
              planners, venues, caterers, florists and photographers. Gatherwise
              is planning and sales software built for one job only: the way
              event and wedding planners work today.
            </p>
            <div className={styles.heroActions}>
              <a href="#trial" className={styles.btnPrimaryLarge}>
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
                        ✓
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

        <section className={styles.aisleFit}>
          <div className={styles.aisleFitCard}>
            <div className={styles.eyebrow}>
              Where Aisle Planner may fit better
            </div>
            <h2 className={styles.aisleFitTitle}>
              We would rather you pick the right tool than pick us.
            </h2>
            <p className={styles.aisleFitText}>
              If a long-established name matters to you, Aisle Planner has
              earned it. Their design and floor-plan tools are genuinely mature,
              and because they also build for venues, caterers, florists and
              photographers, a planner who runs one of those businesses
              alongside their planning work can keep everything on a single
              platform. Those are good reasons to choose them, and we will say
              so.
            </p>
            <p className={styles.aisleFitClose}>
              If instead you want modern software built specifically for how
              planners work today, that is what Gatherwise is for.
            </p>
          </div>
        </section>

        <section id="pricing" className={styles.pricing}>
          <div className={styles.narrow}>
            <div className={styles.eyebrow}>Pricing snapshot</div>
            <h2 className={`${styles.sectionTitle} ${styles.pricingTitle}`}>
              For most planners, Aisle Planner costs about 3× as much.
            </h2>

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
                      Up to 50 events
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

        <section id="trial" className={styles.cta}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Start your free trial</h2>
            <p className={styles.ctaText}>
              Effortless event planning starts here. Bring one live event over
              and see how it feels.
            </p>
            <div className={styles.ctaActions}>
              <a href="#trial" className={styles.btnGold}>
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
          © 2026 Gatherwise. Aisle Planner is a trademark of its respective
          owner; comparison based on publicly available information.
        </span>
        <span>Effortless event planning starts here.</span>
      </footer>
    </div>
  );
}
