import type { Metadata } from "next";
import { Suspense } from "react";
import ConsentPreview from "./ConsentPreview";

// Internal review page for the cookie-consent banner. Not linked anywhere and
// kept out of search. Lets you flip between the opt-in banner (EU/UK/CH/CA)
// and the US notice bar, between the marketing-site card and the in-app bar,
// simulate a Global Privacy Control browser, reset the stored choice, and
// watch the cookie value change.

export const metadata: Metadata = {
  title: "Consent banner preview",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ConsentPreview />
    </Suspense>
  );
}
