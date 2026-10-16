// Global surface of the shared consent script (public/consent/gw-consent.js),
// used by app/analytics.tsx.

type GwConsentState = {
  decided: boolean;
  analytics: boolean;
  marketing: boolean;
  regime: "optin" | "notice";
} | null;

interface GwConsentApi {
  get: () => GwConsentState;
  open: () => void;
  reset: () => void;
  ready: (fn: (s: GwConsentState) => void) => void;
  onChange: (fn: (s: GwConsentState) => void) => void;
}

interface Window {
  gwConsent?: GwConsentApi;
  gwConsentConfig?: Record<string, unknown>;
}
