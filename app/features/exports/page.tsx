import type { Metadata } from "next";
import FeaturePage from "../FeaturePage";

const SLUG = "exports";
const TITLE = "Branded Event PDFs & Live Pages for Planners | Gatherwise";
const DESCRIPTION =
  "Generate a branded PDF and a live page from the same event in one step, choosing exactly which sections each recipient sees. Start a free trial.";
const OG_TITLE = "Branded Event PDFs & Live Pages for Planners";
const OG_DESCRIPTION =
  "Generate a branded PDF and a live page from the same event in one step, choosing exactly which sections each recipient sees.";
const CANONICAL_URL = `https://gatherwise.io/features/${SLUG}`;
const OG_IMAGE = `https://gatherwise.io/images/features/${SLUG}.png`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `/features/${SLUG}` },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    siteName: "Gatherwise",
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function Page() {
  return (
    <FeaturePage
      slug={SLUG}
      eyebrow="Features · PDF & live page"
      title="PDF & live page"
      intro="Choose the sections to include — timeline, vendors, seating, guests, budget — preview it, and generate both a branded PDF and a live page in one step. Hand the couple a printed run of show, and keep the venue on the link so their copy never goes stale. Every export you have made stays listed for the event."
      screenshotSrc={`/images/features/${SLUG}.png`}
      screenshotAlt="The Gatherwise event export builder, choosing sections beside a live PDF and page preview"
      hasDesktopChrome
      details={[
        {
          title: "Pick the sections",
          text: "The caterer gets the timeline; the couple does not get the budget.",
        },
        {
          title: "PDF and link together",
          text: "One for the binder, one that keeps updating as plans change.",
        },
        {
          title: "Your branding",
          text: "Your logo on the cover, with every past export kept on the event.",
        },
      ]}
    />
  );
}
