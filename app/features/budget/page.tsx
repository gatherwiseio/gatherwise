import type { Metadata } from "next";
import FeaturePage from "../FeaturePage";

const SLUG = "budget";
const TITLE = "Wedding & Event Budget Tracking Software | Gatherwise";
const DESCRIPTION =
  "Track estimated vs. actual spend by category, with paid and due in the same row — expenses link straight to your vendors. Start a free trial.";
const OG_TITLE = "Wedding & Event Budget Tracking Software";
const OG_DESCRIPTION =
  "Track estimated vs. actual spend by category, with paid and due in the same row — expenses link straight to your vendors.";
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
      eyebrow="Features · Budget"
      title="Budget"
      intro="Estimated against actual, category by category, with paid and still due in the same row. Expenses link to the vendors they came from, so the grand total moves as invoices settle — and the whole sheet exports or shares when the client asks where things stand."
      screenshotSrc={`/images/features/${SLUG}.png`}
      screenshotAlt="A Gatherwise event budget broken out by category, showing estimated vs. actual, paid and due"
      hasDesktopChrome
      details={[
        {
          title: "Estimate vs actual",
          text: "Every category shows what you planned and what it really cost.",
        },
        {
          title: "Paid and due",
          text: "Expenses tie to vendors, so the totals move as invoices settle.",
        },
        {
          title: "Export & share",
          text: "Send the client a clean statement of where the money stands.",
        },
      ]}
    />
  );
}
