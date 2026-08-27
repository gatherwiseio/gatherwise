import Link from "next/link";
import { others } from "./competitors";
import styles from "./compare-shared.module.css";

// Cross-links every comparison page to the other five plus the hub.
//
// This exists for crawlability as much as for readers: without it each
// /compare/* page is an orphan reachable only from the sitemap, which is the
// weakest discovery signal Google has.
export default function OtherComparisons({ slug }: { slug: string }) {
  return (
    <section className={styles.more}>
      <div className={styles.moreInner}>
        <div className={styles.eyebrow}>Other comparisons</div>
        <h2 className={styles.sectionTitle}>Weighing up more than one tool?</h2>
        <p className={styles.moreLede}>
          Most planners shortlist two or three before they switch. Here is how
          Gatherwise stacks up against the rest of them.
        </p>

        <div className={styles.moreGrid}>
          {others(slug).map((competitor) => (
            <Link
              key={competitor.slug}
              href={`/compare/${competitor.slug}`}
              className={styles.moreCard}
            >
              <span className={styles.moreCategory}>{competitor.category}</span>
              <h3 className={styles.moreName}>
                Gatherwise vs {competitor.name}
              </h3>
              <p className={styles.moreText}>{competitor.summary}</p>
              <span className={styles.moreLink}>
                {competitor.name} alternative
              </span>
            </Link>
          ))}
        </div>

        <p className={styles.moreAll}>
          Or see{" "}
          <Link href="/compare" className={styles.moreAllLink}>
            every Gatherwise comparison in one place
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
