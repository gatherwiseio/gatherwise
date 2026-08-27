import { FaqJsonLd, type Faq } from "./jsonld";
import styles from "./compare-shared.module.css";

// Renders the visible FAQ and the matching FAQPage JSON-LD from one array, so
// the two can't drift apart (Google drops structured data that doesn't match
// the rendered page).
//
// The questions are deliberately phrased the way planners search — "is X a
// good <competitor> alternative", "how do I switch from <competitor>" — since
// that is the query these pages are trying to answer.
export default function CompareFaq({
  competitor,
  faqs,
}: {
  competitor: string;
  faqs: Faq[];
}) {
  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.faqInner}>
        <div className={styles.eyebrow}>Common questions</div>
        <h2 className={styles.sectionTitle}>
          Thinking about a {competitor} alternative?
        </h2>
        <p className={styles.faqLede}>
          The four things planners ask us most before they move off{" "}
          {competitor}.
        </p>

        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <div key={faq.question} className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>{faq.question}</h3>
              <p className={styles.faqAnswer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <FaqJsonLd faqs={faqs} />
    </section>
  );
}
