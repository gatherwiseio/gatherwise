import type { Metadata } from "next";
import FeaturePage from "../FeaturePage";

const SLUG = "tasks";
const TITLE = "Event Planning Task Management Software | Gatherwise";
const DESCRIPTION =
  "Assign tasks with due dates, attachments and comments, and let reminders chase your team automatically by email and push. Start a free trial.";
const OG_TITLE = "Event Planning Task Management Software";
const OG_DESCRIPTION =
  "Assign tasks with due dates, attachments and comments, and let reminders chase your team automatically by email and push.";
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
      eyebrow="Features · Tasks & reminders"
      title="Tasks & reminders"
      intro="A task carries its own assignees, due date, attachments and conversation — so, for example, the caterer's quote is approved where the work lives. When the date gets close, the reminder goes out on its own — by email and as a push to the phone in your pocket. Anything the client does not need to see can be made invisible with one tap."
      screenshotSrc={`/images/features/${SLUG}.png`}
      screenshotAlt="A Gatherwise task with assignees, a due date, an attached quote and a comment thread"
      details={[
        {
          title: "One place to answer",
          text: "Comments, @mentions and the attached quote sit on the task itself.",
        },
        {
          title: "Nothing slips",
          text: "Due dates send their own reminders by email and push, to whoever is assigned.",
        },
        {
          title: "Behind the scenes",
          text: "Mark a task invisible and the client never sees it — the internal chase stays yours.",
        },
      ]}
    />
  );
}
