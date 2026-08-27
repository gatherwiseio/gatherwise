// JSON-LD emitters for the comparison pages.
//
// Every payload is serialised through this one helper so the "</script>"
// break-out escape is applied consistently.

export type Faq = { question: string; answer: string };

// JSON.stringify happily emits a literal "<" which would close the surrounding
// <script> tag early; < is the standard escape and stays valid JSON.
function serialize(payload: unknown): string {
  return JSON.stringify(payload).replace(/</g, "\\u003c");
}

function JsonLd({ payload }: { payload: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(payload) }}
    />
  );
}

const SITE = "https://gatherwise.io";

/** The product itself. Identical on every page, keyed to a stable @id so the
    repeated mentions collapse into one entity rather than six. */
export function SoftwareApplicationJsonLd() {
  return (
    <JsonLd
      payload={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${SITE}/#software`,
        name: "Gatherwise",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Event planning software and CRM",
        operatingSystem: "Web, iOS, Android",
        url: SITE,
        description:
          "All-in-one event planning software and CRM for event and wedding planners — timelines, tasks, budgets, guest lists, seating charts, proposals, contracts, invoicing and vendor management in one place.",
        offers: {
          "@type": "Offer",
          price: "29.00",
          priceCurrency: "USD",
          category: "subscription",
          url: `${SITE}/#pricing`,
        },
      }}
    />
  );
}

/** Breadcrumb trail: Home → Compare → this comparison. */
export function BreadcrumbJsonLd({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  return (
    <JsonLd
      payload={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          {
            "@type": "ListItem",
            position: 2,
            name: "Compare",
            item: `${SITE}/compare`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `Gatherwise vs ${name}`,
            item: `${SITE}/compare/${slug}`,
          },
        ],
      }}
    />
  );
}

/** FAQPage. Fed the same array the visible FAQ renders from — Google requires
    the structured data to match what the user can actually see. */
export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  return (
    <JsonLd
      payload={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}
