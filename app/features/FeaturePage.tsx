import Link from "next/link";
import { Cormorant_Garamond, Karla } from "next/font/google";
import styles from "./features-shared.module.css";
import OtherFeatures from "./OtherFeatures";

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

export type FeatureDetail = {
  title: string;
  text: string;
};

export type FeaturePageProps = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  screenshotSrc: string;
  screenshotAlt: string;
  /** True when the screenshot already shows its own browser/laptop chrome —
   * skips the added dark frame so it doesn't double up on window chrome. */
  hasDesktopChrome?: boolean;
  details: FeatureDetail[];
};

// Shared body for every app/features/<slug>/page.tsx. Each route's page.tsx
// still owns its own `metadata` export (Next.js needs that at the page's own
// module scope) and just renders this with its content.
export default function FeaturePage({
  slug,
  eyebrow,
  title,
  intro,
  screenshotSrc,
  screenshotAlt,
  hasDesktopChrome = false,
  details,
}: FeaturePageProps) {
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
          <div className={styles.wide}>
            <div className={styles.eyebrow}>{eyebrow}</div>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroLede}>{intro}</p>
            <div className={styles.heroActions}>
              <a
                href="https://app.gatherwise.io/login?m=signup"
                className={styles.btnPrimaryLarge}
              >
                Start free trial
              </a>
              <a
                href="https://calendly.com/alex-gatherwise/30min"
                className={styles.btnGhost}
                style={{ color: "var(--gw-ink)", borderColor: "rgb(var(--gw-ink-rgb) / 0.35)" }}
              >
                Talk to a human first
              </a>
            </div>
          </div>
        </section>

        <section className={styles.showcase}>
          <div className={styles.wide}>
            <div className={styles.showcaseInner}>
              <div className={hasDesktopChrome ? styles.showcaseBare : styles.showcaseFrame}>
                <img src={screenshotSrc} alt={screenshotAlt} />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.details}>
          <div className={styles.wide}>
            <div className={styles.detailsGrid}>
              {details.map((d) => (
                <div key={d.title}>
                  <h3 className={styles.detailTitle}>{d.title}</h3>
                  <p className={styles.detailText}>{d.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <OtherFeatures slug={slug} />

        <section className={styles.cta}>
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Start your free trial</h2>
            <p className={styles.ctaText}>
              Bring one live event over and see how it feels to run it in
              Gatherwise.
            </p>
            <div className={styles.ctaActions}>
              <a
                href="https://app.gatherwise.io/login?m=signup"
                className={styles.btnGold}
              >
                Start free trial
              </a>
              <a
                href="https://calendly.com/alex-gatherwise/30min"
                className={styles.btnGhost}
              >
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
    </div>
  );
}
