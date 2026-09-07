import type { Metadata } from "next";
import FeaturePage from "../FeaturePage";

const SLUG = "invoicing";
const TITLE = "Event Invoicing Software for Planners | Gatherwise";
const DESCRIPTION =
  "Build invoices on the event they belong to, accept card or bank transfer, and see what's paid and outstanding at a glance. Start a free trial.";
const OG_TITLE = "Event Invoicing Software for Planners";
const OG_DESCRIPTION =
  "Build invoices on the event they belong to, accept card or bank transfer, and see what's paid and outstanding at a glance.";
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
      eyebrow="Features · Invoicing"
      title="Invoicing"
      intro="Build the invoice on the event it belongs to, switch on the payment methods you want, and offer a lower price for bank transfer. What is quoted, paid and outstanding stays visible without a second accounting tool."
      screenshotSrc={`/images/features/${SLUG}.png`}
      screenshotAlt="The Gatherwise invoice creator, with payment methods and a live invoice preview"
      hasDesktopChrome
      details={[
        {
          title: "Card or bank transfer",
          text: "Turn on the payment options you want, with the fees stated up front.",
        },
        {
          title: "Discount bank transfers",
          text: "Offer a percentage off when a client pays by transfer.",
        },
        {
          title: "Paid, on the event",
          text: "Payments land back on the event and its budget line.",
        },
      ]}
    />
  );
}
