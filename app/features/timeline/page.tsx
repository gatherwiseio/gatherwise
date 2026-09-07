import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Karla } from "next/font/google";
import styles from "./page.module.css";
import { SoftwareApplicationJsonLd, FaqJsonLd } from "../../compare/jsonld";

// Scoped to this route, same as the /compare pages this design system shares.
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
  title: "Event Timelines | Gatherwise",
  description:
    "Build the schedule for every event day, name who is responsible for each item, and share a filtered PDF or the full run of show with vendors, guests and your team.",
  alternates: { canonical: "/features/timeline" },
};

const runOfShow = [
  { time: "9:00 am", label: "Hair & makeup appointments", who: "Guests · bridal suite" },
  { time: "1:30 pm", label: "Florist load-in", who: "Vendor · Wildfield Floral" },
  { time: "3:15 pm", label: "First look", who: "Vendor · photography" },
  { time: "4:00 pm", label: "Ceremony", who: "Client team · lead planner" },
  { time: "TBD", label: "Toasts", who: "Time not set yet" },
  { time: "10:30 pm", label: "Teardown", who: "Vendor · venue ops" },
];

const steps = [
  {
    number: "01",
    title: "Add the timeline",
    body: "Open the event, choose Add timeline, give it a date and a name.",
  },
  {
    number: "02",
    title: "Add the items",
    body: "One moment per item — a time range or TBD, plus notes, links and instructions in the editor.",
  },
  {
    number: "03",
    title: "Add the other days",
    body: "Rehearsal dinner, wedding day, brunch — each day its own section inside one timeline.",
  },
  {
    number: "04",
    title: "Name who is responsible",
    body: "Client team, vendors and guests pull straight from the event's own tabs.",
  },
];

const sharing = [
  {
    title: "Manual order or by time",
    body: "Drag items to rearrange, or let the timeline sort itself automatically.",
  },
  {
    title: "View PDF for the whole weekend",
    body: "Every event day, in order, with locations and notes — ready to send or print.",
  },
  {
    title: "PDF Builder for one party",
    body: "Filter by responsible collaborator, guest or vendor, hit Update, and the preview rebuilds beside you.",
  },
  {
    title: "Choose what appears",
    body: "Toggle sections on or off so the run of show carries only what that recipient needs.",
  },
];

const faqs = [
  {
    question: "Do items need a time?",
    answer:
      "No. Time ranges are optional — leave an item as TBD until the time is set, and it stays in the schedule where you put it.",
  },
  {
    question: "Can one event have several days?",
    answer:
      "Yes. Add an event day and it becomes its own section inside the same timeline — for example Friday's rehearsal dinner and Saturday's wedding day.",
  },
  {
    question: "Where do vendors and guests come from?",
    answer:
      'The event\'s own Vendors and Guests tabs. If an item shows "No vendors yet", add them on that tab first and they appear in the dropdown.',
  },
  {
    question: "What does the client actually receive?",
    answer:
      "A PDF generated from the live timeline. Filter first and each vendor receives only the items they are named on.",
  },
  {
    question: "Can I reuse a timeline?",
    answer:
      "Yes — save a template event with your standard structure and import it into future events.",
  },
  {
    question: "Is the timeline on mobile?",
    answer:
      "Yes. The native iOS and Android app shows the same timeline on event day, so you are not carrying a laptop.",
  },
];

export default function Page() {
  return (
    <div className={`${cormorant.variable} ${karla.variable} ${styles.page}`}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandName}>
            Gather<span className={styles.brandAccent}>wise</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/" className={`${styles.navLink} ${styles.navLinkActive}`}>
            Features
          </Link>
          <Link href="/#pricing" className={styles.navLink}>
            Pricing
          </Link>
          <Link href="/compare" className={styles.navLink}>
            Comparison
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
            <div className={styles.eyebrow}>Features · Timelines</div>
            <h1 className={styles.heroTitle}>
              From the first hair appointment to the{" "}
              <span className={styles.heroTitleAccent}>last dance</span>.
            </h1>
            <p className={styles.heroLede}>
              Every event in Gatherwise has its own timeline. Build the
              schedule for each event day, name the vendor, guest or
              collaborator responsible for every item, and send each of them a
              version with only their own call times on it.
            </p>
            <div className={styles.heroActions}>
              <a
                href="https://app.gatherwise.io/login?m=signup"
                className={styles.btnPrimaryLarge}
              >
                Start free trial
              </a>
              <a href="#sharing" className={styles.linkQuiet}>
                See how sharing works
              </a>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>
                Saturday, November 8 — Wedding day
              </span>
              <span className={styles.panelTag}>42 items</span>
            </div>
            {runOfShow.map((item) => (
              <div key={item.time + item.label} className={styles.panelRow}>
                <span className={styles.panelTime}>{item.time}</span>
                <span>
                  <span className={styles.panelLabel}>{item.label}</span>
                  <span className={styles.panelWho}>{item.who}</span>
                </span>
              </div>
            ))}
            <div className={styles.panelChips}>
              <span className={styles.chip}>3 event days</span>
              <span className={`${styles.chip} ${styles.chipSolid}`}>
                Shared as PDF
              </span>
            </div>
          </div>
        </section>

        <section className={styles.steps}>
          <div className={styles.stepsHead}>
            <div className={styles.eyebrow}>How it works</div>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleOnDark}`}>
              Four steps, then you share it.
            </h2>
          </div>
          <div className={styles.stepsGrid}>
            <div className={styles.stepsPair}>
              {steps.slice(0, 2).map((step) => (
                <div key={step.number} className={styles.winCard}>
                  <div className={styles.winNumber} aria-hidden="true">
                    {step.number}
                  </div>
                  <h3 className={styles.winTitle}>{step.title}</h3>
                  <p className={styles.winText}>{step.body}</p>
                </div>
              ))}
            </div>
            <div className={styles.stepsPair}>
              {steps.slice(2, 4).map((step) => (
                <div key={step.number} className={styles.winCard}>
                  <div className={styles.winNumber} aria-hidden="true">
                    {step.number}
                  </div>
                  <h3 className={styles.winTitle}>{step.title}</h3>
                  <p className={styles.winText}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sharing" className={styles.sharing}>
          <div className={styles.wide}>
            <div className={styles.eyebrow}>Sorting, filtering &amp; sharing</div>
            <h2 className={styles.sectionTitle}>
              One schedule. A version for everyone on it.
            </h2>

            <p className={styles.sharingLede}>
              Drag items into the order the day actually runs, or let them
              sort by time. Then choose Share: View PDF hands you the whole
              run of show, and PDF Builder narrows it to one responsible
              collaborator, guest or vendor — so the florist receives the
              florist&apos;s call times and the couple receives the whole
              weekend.
            </p>
            <div className={styles.checklist}>
              {sharing.map((item) => (
                <div key={item.title} className={styles.checklistItem}>
                  <span className={styles.checklistCheck} aria-hidden="true">
                    ✓
                  </span>
                  <span>
                    <span className={styles.checklistTitle}>{item.title}</span>
                    <span className={styles.checklistBody}>{item.body}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.shots}>
              <figure>
                <img
                  src="/images/timeline-share-menu.png"
                  alt="A Gatherwise timeline with the Share menu open, showing View PDF and PDF Builder"
                />
                <figcaption className={styles.shotCaption}>
                  Share gives you two ways out: View PDF for the full run of
                  show, or PDF Builder.
                </figcaption>
              </figure>
              <figure>
                <img
                  src="/images/timeline-pdf-builder.png"
                  alt="The Gatherwise PDF Builder filtering a timeline by responsible vendor beside a live PDF preview"
                />
                <figcaption className={styles.shotCaption}>
                  PDF Builder: filter by responsible collaborator, guest or
                  vendor and the preview updates.
                </figcaption>
              </figure>
            </div>

            <div className={styles.callout}>
              <div className={styles.eyebrow}>Pro tip</div>
              <h3 className={styles.calloutTitle}>
                Save time using Timeline Templates
              </h3>
              <p className={styles.calloutText}>
                Create a template event with your standard structure — hair
                and makeup, ceremony, reception, teardown — and import it into
                every new client.
              </p>
              <p className={styles.calloutText}>
                It saves hours on each event, and the timeline you have
                refined over fifty weddings becomes the starting point for the
                fifty-first.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.faq}>
          <div className={styles.wide}>
            <div className={styles.eyebrow}>Good to know</div>
            <h2 className={styles.sectionTitle}>
              Questions planners ask first.
            </h2>
            <div className={styles.faqGrid}>
              {faqs.map((item) => (
                <div key={item.question} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{item.question}</h3>
                  <p className={styles.faqAnswer}>{item.answer}</p>
                </div>
              ))}
            </div>
            <p className={styles.faqFoot}>
              Still deciding? Read the full walkthrough in{" "}
              <a href="https://app.gatherwise.io/docs/building-event-timelines">
                Building event timelines
              </a>
              , or write to support@gatherwise.io.
            </p>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Start your free trial</h2>
            <p className={styles.ctaText}>
              Bring one live event over, build its timeline, and send the
              first filtered PDF today.
            </p>
            <div className={styles.ctaActions}>
              <a
                href="https://app.gatherwise.io/login?m=signup"
                className={styles.btnGold}
              >
                Start free trial
              </a>
              <a href="#sharing" className={styles.btnGhost}>
                Talk to a human first
              </a>
            </div>
            <p className={styles.ctaFine}>Cancel anytime</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>© 2026 Gatherwise. Feature availability as of mid-2026.</span>
        <span>Effortless event planning starts here.</span>
      </footer>

      <SoftwareApplicationJsonLd />
      <FaqJsonLd faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
    </div>
  );
}
