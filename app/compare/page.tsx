import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Karla } from "next/font/google";
import { competitors } from "./competitors";
import { SoftwareApplicationJsonLd } from "./jsonld";
import shared from "./compare-shared.module.css";
import styles from "./hub.module.css";

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
  title: "Gatherwise Alternatives & Comparisons for Event Planners",
  description:
    "Compare Gatherwise with HoneyBook, Aisle Planner, Planning Pod, Timeline Genius, Harpsen and Rock Paper Coin — feature tables and pricing for event & wedding planners.",
  alternates: { canonical: "/compare" },
};

const SIGNUP = "https://app.gatherwise.io/login?m=signup";

export default function Page() {
  return (
    <div className={`${cormorant.variable} ${karla.variable} ${styles.page}`}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandName}>
            Gatherwise
          </Link>
          <span className={styles.brandTag}>Comparisons</span>
        </div>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <a href={SIGNUP} className={styles.btnPrimary}>
            Start free trial
          </a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.eyebrow}>Compare</div>
            <h1 className={styles.heroTitle}>
              Looking for an alternative to the tool you are on?{" "}
              <span className={styles.heroTitleGold}>Start here.</span>
            </h1>
            <p className={styles.heroLede}>
              Six honest, side-by-side comparisons — what each tool genuinely
              does well, where it stops, and what Gatherwise covers instead.
              Every feature table reflects publicly available information as of
              mid-2026.
            </p>
          </div>
        </section>

        <section className={styles.list}>
          <div className={styles.listInner}>
            <div className={styles.grid}>
              {competitors.map((competitor) => (
                <Link
                  key={competitor.slug}
                  href={`/compare/${competitor.slug}`}
                  className={shared.moreCard}
                >
                  <span className={shared.moreCategory}>
                    {competitor.category}
                  </span>
                  <h2 className={shared.moreName}>
                    Gatherwise vs {competitor.name}
                  </h2>
                  <p className={shared.moreText}>{competitor.summary}</p>
                  <span className={shared.moreLink}>
                    {competitor.name} alternative
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Still deciding?</h2>
            <p className={styles.ctaText}>
              Bring one live event across and see how it feels. Effortless event
              planning starts here.
            </p>
            <a href={SIGNUP} className={styles.btnGold}>
              Start free trial
            </a>
            <p className={styles.ctaFine}>Cancel anytime</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>
          © 2026 Gatherwise. All competitor names are trademarks of their
          respective owners; comparisons based on publicly available
          information.
        </span>
        <span>Effortless event planning starts here.</span>
      </footer>

      <SoftwareApplicationJsonLd />
    </div>
  );
}
