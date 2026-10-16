import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Karla } from "next/font/google";
import styles from "./page.module.css";

// Cookie policy for gatherwise.io and app.gatherwise.io. The consent banner
// (public/consent/gw-consent.js) and every footer link here. Keep the cookie
// table in step with app/analytics.tsx and the app header scripts: if a
// vendor is added or removed, change it here the same day.

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
  title: "Cookie Policy | Gatherwise",
  description:
    "How Gatherwise uses cookies and similar technologies on gatherwise.io and app.gatherwise.io, which ones we set, and how to change your choices.",
  alternates: { canonical: "/cookies" },
};

const LAST_UPDATED = "October 15, 2026";
const SIGNUP = "https://app.gatherwise.io/login?m=signup";
const PRIVACY = "https://app.gatherwise.io/legal?tab=privacy";
const CONTACT = "support@gatherwise.io";

type Row = { name: string; provider: string; purpose: string; expires: string };

const ESSENTIAL: Row[] = [
  {
    name: "gw_consent",
    provider: "Gatherwise",
    purpose: "Remembers the cookie choices you made so we do not ask again.",
    expires: "12 months (6 months if you declined)",
  },
  {
    name: "gw_region",
    provider: "Gatherwise",
    purpose: "Remembers which consent rules apply where you are, so the right notice is shown.",
    expires: "30 days",
  },
  {
    name: "Session cookies",
    provider: "Gatherwise",
    purpose: "Keep you signed in to the app and protect your session from tampering.",
    expires: "Session, or up to 1 year if you chose to stay signed in",
  },
];

const ANALYTICS: Row[] = [
  {
    name: "_ga, _ga_*",
    provider: "Google Analytics",
    purpose: "Distinguishes visitors and sessions so we can see which pages are read and where visitors come from.",
    expires: "2 years",
  },
  {
    name: "ph_*_posthog",
    provider: "PostHog",
    purpose: "Product analytics: which features are used, in what order, and where people get stuck. May include recordings of how a page is used, with typed text masked.",
    expires: "1 year",
  },
];

const ADVERTISING: Row[] = [
  {
    name: "_gcl_au",
    provider: "Google Ads",
    purpose: "Measures whether a visit that started from a Google ad led to a sign-up.",
    expires: "90 days",
  },
  {
    name: "_fbp",
    provider: "Meta (Facebook and Instagram)",
    purpose: "Measures our ads on Meta platforms and lets us show Gatherwise to people with similar interests.",
    expires: "90 days",
  },
];

function Table({ rows }: { rows: Row[] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Set by</th>
            <th>Purpose</th>
            <th>Expires</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td>{r.name}</td>
              <td>{r.provider}</td>
              <td>{r.purpose}</td>
              <td>{r.expires}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
          <span className={styles.brandTag}>Legal</span>
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

      <main className={styles.main}>
        <article className={styles.article}>
          <p className={styles.eyebrow}>Legal</p>
          <h1 className={styles.title}>Cookie Policy</h1>
          <p className={styles.meta}>Last updated {LAST_UPDATED}</p>
          <p className={styles.lede}>
            This policy explains how Gatherwise, Inc. (&ldquo;Gatherwise&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;) uses cookies and similar
            technologies on gatherwise.io and app.gatherwise.io, what they do,
            and the choices you have. It should be read together with our{" "}
            <a href={PRIVACY}>Privacy Policy</a>.
          </p>

          <nav className={styles.toc} aria-label="On this page">
            <a href="#what">What cookies are</a>
            <a href="#categories">The cookies we use</a>
            <a href="#third-parties">Third parties</a>
            <a href="#choices">Your choices</a>
            <a href="#regions">Regional rights</a>
            <a href="#changes">Changes</a>
            <a href="#contact">Contact</a>
          </nav>

          <section id="what" className={styles.section}>
            <h2 className={styles.h2}>What cookies are</h2>
            <p className={styles.p}>
              Cookies are small text files a website stores on your device so
              it can recognise you later. Some are set by us (first-party
              cookies) and some by services we use (third-party cookies). We
              also use closely related technologies such as pixels, local
              storage and software development kits, and this policy covers
              those too. Cookies that last only until you close your browser
              are session cookies; the rest are persistent and expire after a
              set time, shown in the tables below.
            </p>
          </section>

          <section id="categories" className={styles.section}>
            <h2 className={styles.h2}>The cookies we use</h2>
            <p className={styles.p}>
              We group cookies into three categories. Essential cookies are
              always on. The other two are only used with your permission where
              the law requires it, and can be turned off at any time.
            </p>

            <h3 className={styles.h3}>Essential</h3>
            <p className={styles.p}>
              Required for the site and the app to work: signing in, keeping
              your session secure, and remembering the choices you make on
              this page. They cannot be switched off because the service would
              not function without them.
            </p>
            <Table rows={ESSENTIAL} />

            <h3 className={styles.h3}>Analytics</h3>
            <p className={styles.p}>
              Help us understand how the site and the app are used, so we can
              improve them. The data is aggregated and we do not use it to
              identify you unless you are signed in to your own account.
            </p>
            <Table rows={ANALYTICS} />

            <h3 className={styles.h3}>Advertising</h3>
            <p className={styles.p}>
              Let us measure whether our advertising works, including which
              ads led to a sign-up, and show Gatherwise to people who may be
              interested in it. We do not sell personal
              information for money, but under some laws sharing data with
              advertising platforms counts as a &ldquo;sale&rdquo; or
              &ldquo;sharing&rdquo;, and you can opt out as described below.
            </p>
            <Table rows={ADVERTISING} />
          </section>

          <section id="third-parties" className={styles.section}>
            <h2 className={styles.h2}>Third parties</h2>
            <p className={styles.p}>
              The analytics and advertising cookies above are set by companies
              that process data on our behalf or for their own purposes under
              their own policies:
            </p>
            <dl className={styles.defs}>
              <div className={styles.def}>
                <dt>Google</dt>
                <dd>
                  Analytics and Ads.{" "}
                  <a href="https://policies.google.com/technologies/cookies" rel="noopener" target="_blank">
                    How Google uses cookies
                  </a>
                </dd>
              </div>
              <div className={styles.def}>
                <dt>Meta</dt>
                <dd>
                  Facebook and Instagram advertising.{" "}
                  <a href="https://www.facebook.com/privacy/policies/cookies" rel="noopener" target="_blank">
                    Meta cookie policy
                  </a>
                </dd>
              </div>
              <div className={styles.def}>
                <dt>PostHog</dt>
                <dd>
                  Product analytics.{" "}
                  <a href="https://posthog.com/privacy" rel="noopener" target="_blank">
                    PostHog privacy policy
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          <section id="choices" className={styles.section}>
            <h2 className={styles.h2}>Your choices</h2>
            <p className={styles.p}>
              You can change your cookie settings at any time. Essential cookies
              stay on; everything else follows your choice.
            </p>
            <dl className={styles.defs}>
              <div className={styles.def}>
                <dt>Cookie settings</dt>
                <dd>
                  Open the preferences panel from the link at the bottom of
                  any page on gatherwise.io, or from My account &rsaquo; Privacy
                  inside the app. One choice applies to both.
                  <div>
                    <button type="button" className={styles.button} data-gw-consent="open">
                      Open cookie settings
                    </button>
                  </div>
                </dd>
              </div>
              <div className={styles.def}>
                <dt>Global Privacy Control</dt>
                <dd>
                  If your browser sends a Global Privacy Control signal, we
                  treat it as an opt-out of advertising cookies automatically.
                </dd>
              </div>
              <div className={styles.def}>
                <dt>Your browser</dt>
                <dd>
                  Most browsers let you block or delete cookies in their
                  settings. Blocking essential cookies will stop you signing
                  in to the app.
                </dd>
              </div>
              <div className={styles.def}>
                <dt>Vendor opt-outs</dt>
                <dd>
                  You can also opt out directly with{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener" target="_blank">
                    Google Analytics
                  </a>
                  ,{" "}
                  <a href="https://adssettings.google.com" rel="noopener" target="_blank">
                    Google Ads
                  </a>{" "}
                  and{" "}
                  <a href="https://www.facebook.com/adpreferences/ad_settings" rel="noopener" target="_blank">
                    Meta
                  </a>
                  .
                </dd>
              </div>
            </dl>
            <p className={styles.p}>
              If you withdraw consent, we stop setting the affected cookies
              from that point. Cookies already on your device remain until
              they expire or you delete them.
            </p>
          </section>

          <section id="regions" className={styles.section}>
            <h2 className={styles.h2}>Regional rights</h2>
            <h3 className={styles.h3}>European Economic Area, United Kingdom and Switzerland</h3>
            <p className={styles.p}>
              We ask for your consent before setting any analytics or
              advertising cookie, and you can decline with one click. Consent
              is the legal basis for those cookies; essential cookies rely on
              our legitimate interest in running a secure service. You have
              the right to withdraw consent at any time and to complain to your
              local data protection authority.
            </p>
            <h3 className={styles.h3}>Canada</h3>
            <p className={styles.p}>
              Visitors in Canada are also asked before any analytics or
              advertising cookie is set, in line with federal privacy law and
              Quebec&rsquo;s Law 25.
            </p>
            <h3 className={styles.h3}>United States</h3>
            <p className={styles.p}>
              Analytics and advertising cookies are on by default and you can
              turn them off at any time using the options above. Residents of
              California and other states with privacy laws have the right to
              opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of
              personal information for targeted advertising. To exercise it,
              turn off advertising in cookie settings (the link at the bottom
              of any page, or My account &rsaquo; Privacy in the app), or send
              a Global Privacy Control signal from your browser. We do not knowingly sell or share the
              personal information of anyone under 16.
            </p>
          </section>

          <section id="changes" className={styles.section}>
            <h2 className={styles.h2}>Changes to this policy</h2>
            <p className={styles.p}>
              When we add or remove a cookie or change how one is used, we
              update this page and the date at the top. If the change affects
              a choice you made, you will be asked again the next time you
              visit.
            </p>
          </section>

          <section id="contact" className={styles.section}>
            <h2 className={styles.h2}>Contact</h2>
            <p className={styles.p}>
              Questions about cookies or privacy: email{" "}
              <a href={`mailto:${CONTACT}`}>{CONTACT}</a>. Gatherwise, Inc. is
              the controller of the personal data described in this policy.
            </p>
          </section>
        </article>
      </main>

      <footer className={styles.footer}>
        <span>© 2026 Gatherwise, Inc.</span>
        <span>
          <a href={PRIVACY} style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}>
            Privacy
          </a>
          {" · "}
          <a href="#cookie-settings" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}>
            Cookie settings
          </a>
        </span>
      </footer>
    </div>
  );
}
