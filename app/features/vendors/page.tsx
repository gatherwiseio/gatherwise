import type { Metadata } from "next";
import FeaturePage from "../FeaturePage";

const SLUG = "vendors";
const TITLE = "Event & Wedding Vendor Management Software | Gatherwise";
const DESCRIPTION =
  "Keep every vendor's contacts, notes and documents linked to their budget line, so the balance and the chase live in one place. Start a free trial.";
const OG_TITLE = "Event & Wedding Vendor Management Software";
const OG_DESCRIPTION =
  "Keep every vendor's contacts, notes and documents linked to their budget line, so the balance and the chase live in one place.";
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
      eyebrow="Features · Vendors & budget"
      title="Vendors & budget"
      intro="Each vendor keeps its own contacts, notes and documents — and the budget line it is attached to. Quoted, paid and remaining sit side by side, so a nudge about the balance goes out from the same place the number lives."
      screenshotSrc={`/images/features/${SLUG}.png`}
      screenshotAlt="A Gatherwise vendor profile with contacts, a linked expense, and a comment thread"
      details={[
        {
          title: "Contacts on file",
          text: "Every person at the vendor, with the notes from the last call.",
        },
        {
          title: "Linked to the budget",
          text: "Quoted, paid and remaining update as invoices settle.",
        },
        {
          title: "Collaborate here",
          text: "Comment and @mention on the vendor booking, so the chase stays with it.",
        },
      ]}
    />
  );
}
