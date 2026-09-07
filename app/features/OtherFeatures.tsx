import Link from "next/link";
import { others } from "./features-data";
import styles from "./features-shared.module.css";

// Cross-links every /features/* page to the rest — same reasoning as
// /compare/OtherComparisons.tsx: without this, each page is only reachable
// from the sitemap, the weakest discovery signal Google has.
export default function OtherFeatures({ slug }: { slug: string }) {
  return (
    <section className={styles.more}>
      <div className={styles.moreInner}>
        <div className={styles.eyebrow}>More in Gatherwise</div>
        <h2 className={styles.sectionTitle}>Everything else on the event.</h2>
        <p className={styles.moreLede}>
          Timelines, budgets, vendors and exports all live on the same event
          record — here is the rest of what replaces the other tools in your
          stack.
        </p>

        <div className={styles.moreGrid}>
          {others(slug).map((feature) => (
            <Link
              key={feature.slug}
              href={`/features/${feature.slug}`}
              className={styles.moreCard}
            >
              <h3 className={styles.moreName}>{feature.name}</h3>
              <p className={styles.moreText}>{feature.summary}</p>
              <span className={styles.moreLink}>See how it works</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
