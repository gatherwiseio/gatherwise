import type { Metadata } from "next";
import FeaturePage from "../FeaturePage";

const SLUG = "seating";
const TITLE = "Wedding & Event Seating Chart Software | Gatherwise";
const DESCRIPTION =
  "Drag tables onto the room, seat guests by name, and color seats by meal choice — then export a branded PDF or share a live link. Start a free trial.";
const OG_TITLE = "Wedding & Event Seating Chart Software";
const OG_DESCRIPTION =
  "Drag tables onto the room, seat guests by name, and color seats by meal choice — then export a branded PDF or share a live link.";
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
      eyebrow="Features · Seating & layout"
      title="Seating & layout"
      intro="Drag tables onto the room, seat guests by name, and color the seats by meal choice. Change the count and the chart changes with it — then export the room, or share a live link with the venue and the caterer."
      screenshotSrc={`/images/features/${SLUG}.png`}
      screenshotAlt="A Gatherwise seating chart with tables dragged onto a room layout, seats colored by meal choice"
      details={[
        {
          title: "Seat by name",
          text: "Every chair holds a guest, so the place cards and the kitchen list write themselves.",
        },
        {
          title: "Meal colors",
          text: "Counts per table read at a glance, so catering knows the room before service.",
        },
        {
          title: "Export & share",
          text: "Send the room as a branded PDF, or a live link the venue can keep open.",
        },
      ]}
    />
  );
}
