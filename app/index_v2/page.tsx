import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import "./index_v2.css";

// Scoped to this route: the homepage design uses its own editorial type pairing
// (Cormorant Garamond + Karla) rather than the site-wide brand fonts. The CSS
// variables are consumed by index_v2.css via --gw-font-display / --gw-font-body.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Gatherwise — Event Planning Software & CRM Built for Wedding Planners",
  description:
    "Gatherwise is all-in-one event planning software for wedding and event planners: drag-and-drop day-of timelines, seating charts and floor plans, guest lists, vendor management, budgets, proposals, contracts and invoicing. 14-day free trial.",
};

// --- Link map (from the handoff / gatherwise.io) ------------------------------
// Auth CTAs all route to the signup entry point.
const SIGNUP = "https://app.gatherwise.io/login?m=signup";
const DEMO = "https://calendly.com/ajl5/30min";
const CONTACT = "https://calendly.com/alex-gatherwise/30min?back=1";
const DOCS = "https://gatherwise.io/docs";
const LEGAL = "https://gatherwise.io/legal";
const ABOUT = "https://gatherwise.io/";
const APPSTORE = "https://apps.apple.com/us/app/gatherwise/id6755325275";
const INSTAGRAM = "https://www.instagram.com/gatherwiseio/";
const FACEBOOK =
  "https://www.facebook.com/people/Gatherwise-Inc/61583507273024/";

// target="_blank" for all external destinations; auth + in-page anchors stay same-tab.
const EXT = `target="_blank" rel="noopener noreferrer"`;

const LOGO =
  "https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1715799780276x587257126953273300/logo-no-background.png";

const PAGE_HTML = `
<a href="#main" class="gwv2-skip" style="position: absolute; left: -9999px; top: 0; background: var(--gw-ink); color: var(--gw-parchment); padding: 12px 18px; font-size: 14px; z-index: 100">Skip to content</a>

<header data-nav="" style="position: sticky; top: 0; z-index: 50; background: var(--gw-cream); padding: 16px var(--gw-gutter); transition: padding .18s ease, box-shadow .18s ease, background .18s ease">
  <div style="max-width: 1180px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px; position: relative">
    <a href="#main" style="display: flex; align-items: center; gap: 10px; text-decoration: none; flex: none">
      <img src="${LOGO}" alt="Gatherwise" style="height: 30px; width: auto; display: block">
    </a>
    <nav data-desktop-nav="" aria-label="Primary" style="display: flex; align-items: center; gap: 30px">
      <div style="display: flex; align-items: center; gap: 26px; font-size: 14.5px; letter-spacing: 0.01em">
        <a class="gwv2-navlink" href="#timelines" style="text-decoration: none; color: var(--gw-muted)">Features</a>
        <a class="gwv2-navlink" href="#pricing" style="text-decoration: none; color: var(--gw-muted)">Pricing</a>
        <a class="gwv2-navlink" href="${DEMO}" ${EXT} style="text-decoration: none; color: var(--gw-muted)">Book Demo</a>
      </div>
      <div style="display: flex; align-items: center; gap: 16px">
        <a href="${SIGNUP}" style="text-decoration: none; font-size: 14.5px; font-weight: 600; color: var(--gw-ink)">Log In</a>
        <a class="gw-btn gw-btn--primary" href="${SIGNUP}">Start free trial</a>
      </div>
    </nav>
    <details class="gwv2-menu">
      <summary aria-label="Menu" style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: transparent; border: 1px solid rgb(var(--gw-ink-rgb) / 0.18); border-radius: var(--gw-radius); cursor: pointer; list-style: none">
        <span style="display: grid; gap: 4px">
          <span style="display: block; width: 18px; height: 1.5px; background: var(--gw-ink)"></span>
          <span style="display: block; width: 18px; height: 1.5px; background: var(--gw-ink)"></span>
          <span style="display: block; width: 18px; height: 1.5px; background: var(--gw-ink)"></span>
        </span>
      </summary>
      <nav data-mobile-nav="" aria-label="Primary mobile" style="position: absolute; top: calc(100% + 14px); left: 0; right: 0; display: grid; gap: 2px; background: var(--gw-cream); border-top: 1px solid rgb(var(--gw-ink-rgb) / 0.12); padding-top: 14px; z-index: 60">
        <a href="#timelines" style="text-decoration: none; padding: 12px 2px; font-size: 16px; color: var(--gw-ink)">Features</a>
        <a href="#pricing" style="text-decoration: none; padding: 12px 2px; font-size: 16px; color: var(--gw-ink)">Pricing</a>
        <a href="${DEMO}" ${EXT} style="text-decoration: none; padding: 12px 2px; font-size: 16px; color: var(--gw-ink)">Book Demo</a>
        <a href="${SIGNUP}" style="text-decoration: none; padding: 12px 2px; font-size: 16px; color: var(--gw-ink)">Log In</a>
        <a class="gw-btn gw-btn--large" href="${SIGNUP}" style="margin-top: 10px">Start free trial</a>
      </nav>
    </details>
  </div>
</header>

<main id="main">

  <!-- hero -->
  <section style="padding: clamp(40px, 6vw, 76px) var(--gw-gutter) clamp(48px, 6vw, 84px)">
    <div data-hero-grid="" style="max-width: 1300px; margin: 0 auto; display: grid; gap: clamp(36px, 5vw, 60px); grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: center">
      <div>
        <p class="gw-eyebrow" style="margin: 0 0 20px">EVENT PLANNING SOFTWARE FOR EVENT PROS</p>
        <h1 class="gw-heading gw-heading--display"><span class="gw-heading__accent">Effortless</span> event planning starts here.</h1>
        <p style="font-size: clamp(17px, 1.4vw, 19px); line-height: 1.65; color: var(--gw-muted); margin: 22px 0 0; max-width: 34em; text-wrap: pretty">All your timelines, vendors, invoices, and clients—organized in one platform built just for planners.</p>

        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin: 32px 0 0; max-width: 30em">
          <input id="hero-email" type="email" placeholder="you@yourstudio.com" autocomplete="email" aria-label="Work email" style="flex: 1 1 200px; min-width: 0; height: 52px; padding: 0 16px; font-family: var(--gw-font-body); font-size: 15.5px; color: var(--gw-ink); background: #fff; border: 1px solid rgb(var(--gw-ink-rgb) / 0.22); border-radius: var(--gw-radius)">
          <a class="gw-btn gw-btn--large" href="${SIGNUP}" style="height: 52px; flex: 0 0 auto">Start free trial</a>
        </div>

        <p style="font-size: 13.5px; line-height: 1.6; color: var(--gw-muted-soft); margin: 16px 0 0; letter-spacing: 0.01em">14-day free trial · Cancel anytime</p>
      </div>

      <figure style="margin: 0">
        <div style="border: 1px solid rgb(var(--gw-ink-rgb) / 0.14); border-radius: 4px; overflow: hidden; background: #fff; box-shadow: 0 40px 90px -50px rgb(var(--gw-ink-rgb) / 0.55)">
          <img src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1765470815825x300707809592979140/gw.webp" width="1536" height="930" alt="The Gatherwise planner dashboard showing an event's timeline, tasks, vendors and budget side by side." style="display: block; width: 100%; height: auto; aspect-ratio: 1536 / 930; object-fit: cover">
        </div>
      </figure>
    </div>
  </section>

  <!-- smart timelines -->
  <section id="timelines" style="background: var(--gw-parchment); padding: var(--gw-section-y) var(--gw-gutter); border-top: 1px solid rgb(var(--gw-ink-rgb) / 0.08); border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.08)">
    <div style="max-width: 1180px; margin: 0 auto">
      <div style="max-width: 44em">
        <p class="gw-eyebrow" style="margin: 0 0 18px">Event timeline software</p>
        <h2 class="gw-heading gw-heading--section">The day-of timeline, <span class="gw-heading__accent">drag and drop</span> — then one click per vendor.</h2>
        <p style="font-size: 17.5px; line-height: 1.7; color: var(--gw-muted); margin: 20px 0 0; text-wrap: pretty">Build the run of show once. Move a block and everything after it shifts with it. When it's final, export the version each responsible party actually needs — the photographer's, the caterer's, the couple's — without rebuilding a thing in a document.</p>
      </div>

      <figure style="margin: clamp(32px, 4vw, 52px) 0 0">
        <div style="border: 1px solid rgb(var(--gw-ink-rgb) / 0.16); border-radius: 4px; overflow: hidden; background: #fff; box-shadow: 0 44px 100px -54px rgb(var(--gw-ink-rgb) / 0.6)">
          <div style="display: flex; align-items: center; gap: 6px; padding: 10px 13px; background: var(--gw-cream); border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.1)">
            <span style="width: 9px; height: 9px; border-radius: 50%; background: rgb(var(--gw-ink-rgb) / 0.16)"></span>
            <span style="width: 9px; height: 9px; border-radius: 50%; background: rgb(var(--gw-ink-rgb) / 0.16)"></span>
            <span style="width: 9px; height: 9px; border-radius: 50%; background: rgb(var(--gw-ink-rgb) / 0.16)"></span>
            <span style="margin-left: 12px; font-size: 11px; letter-spacing: 0.06em; color: var(--gw-muted-soft)">app.gatherwise.io/timeline</span>
          </div>
          <div role="img" aria-label="Placeholder for a screenshot of the drag-and-drop day-of timeline." style="aspect-ratio: 16 / 9; display: grid; place-items: center; background: repeating-linear-gradient(135deg, rgb(var(--gw-ink-rgb) / 0.03) 0 12px, transparent 12px 24px); border: 1px dashed var(--gw-gold); margin: 12px; text-align: center; padding: 24px">
            <div>
              <p class="gw-eyebrow" style="margin: 0 0 10px">Screenshot needed</p>
              <p style="font-family: var(--gw-font-display); font-size: clamp(22px, 3vw, 34px); color: var(--gw-ink); margin: 0; line-height: 1.15">day-of timeline — drag and drop</p>
              <p style="font-size: 13.5px; color: var(--gw-muted-soft); margin: 12px 0 0">16:9 · mid-drag, with the per-vendor export menu open</p>
            </div>
          </div>
        </div>
      </figure>

      <div style="display: grid; gap: 1px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); margin: clamp(32px, 4vw, 48px) 0 0; background: rgb(var(--gw-ink-rgb) / 0.15)">
        <div class="gw-win">
          <div class="gw-win__number" aria-hidden="true">01</div>
          <h3 class="gw-win__title">Move one block, not twelve</h3>
          <p class="gw-win__text">Ceremony runs long? Drag it. Everything downstream shifts, and the version every vendor sees updates with it.</p>
        </div>
        <div class="gw-win">
          <div class="gw-win__number" aria-hidden="true">02</div>
          <h3 class="gw-win__title">One click per vendor</h3>
          <p class="gw-win__text">Export a clean timeline for each responsible party — hair and makeup, photo, catering, the couple — filtered to what they need.</p>
        </div>
        <div class="gw-win">
          <div class="gw-win__number" aria-hidden="true">03</div>
          <h3 class="gw-win__title">One version of the truth</h3>
          <p class="gw-win__text">No more "which PDF is current." The timeline lives in one place and the exports come out of it.</p>
        </div>
      </div>

      <p style="margin: 28px 0 0"><a class="gw-btn gw-btn--link" href="${SIGNUP}">Try it free</a></p>
    </div>
  </section>

  <!-- lead to booked -->
  <section id="sales" style="padding: var(--gw-section-y) var(--gw-gutter)">
    <div style="max-width: 1180px; margin: 0 auto">
      <div style="max-width: 44em">
        <p class="gw-eyebrow" style="margin: 0 0 18px">Event planner SALES FEATURES</p>
        <h2 class="gw-heading gw-heading--section">From <span class="gw-heading__accent">lead</span> to booked to paid, without leaving the file.</h2>
        <p style="font-size: 17.5px; line-height: 1.7; color: var(--gw-muted); margin: 20px 0 0; text-wrap: pretty">The inquiry that lands on your site becomes the questionnaire, the proposal, the contract and the invoice — all attached to the same couple. Start from an event template so the fifteenth wedding doesn't get built like the first.</p>
      </div>

      <div style="display: grid; gap: clamp(32px, 4vw, 56px); grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: start; margin: clamp(32px, 4vw, 48px) 0 0">
        <ol style="list-style: none; margin: 0; padding: 0; display: grid; gap: 0">
          <li style="display: grid; grid-template-columns: auto 1fr; gap: 18px; padding-bottom: 22px; border-left: 1px solid rgb(var(--gw-ink-rgb) / 0.14); margin-left: 13px; padding-left: 24px; position: relative">
            <span aria-hidden="true" style="position: absolute; left: -6px; top: 4px; width: 11px; height: 11px; border-radius: 50%; background: var(--gw-gold)"></span>
            <div style="grid-column: 1 / -1">
              <h3 style="font-family: var(--gw-font-display); font-size: 22px; font-weight: 500; margin: 0 0 6px">Lead inquiry form</h3>
              <p style="font-size: 15.5px; line-height: 1.65; color: var(--gw-muted); margin: 0">Put a form on your site. Inquiries arrive as real leads, not another email to triage.</p>
            </div>
          </li>
          <li style="display: grid; grid-template-columns: auto 1fr; gap: 18px; padding-bottom: 22px; border-left: 1px solid rgb(var(--gw-ink-rgb) / 0.14); margin-left: 13px; padding-left: 24px; position: relative">
            <span aria-hidden="true" style="position: absolute; left: -6px; top: 4px; width: 11px; height: 11px; border-radius: 50%; background: var(--gw-gold)"></span>
            <div style="grid-column: 1 / -1">
              <h3 style="font-family: var(--gw-font-display); font-size: 22px; font-weight: 500; margin: 0 0 6px">Questionnaire</h3>
              <p style="font-size: 15.5px; line-height: 1.65; color: var(--gw-muted); margin: 0">Ask the discovery questions once, in writing. Answers land on the couple's record.</p>
            </div>
          </li>
          <li style="display: grid; grid-template-columns: auto 1fr; gap: 18px; padding-bottom: 22px; border-left: 1px solid rgb(var(--gw-ink-rgb) / 0.14); margin-left: 13px; padding-left: 24px; position: relative">
            <span aria-hidden="true" style="position: absolute; left: -6px; top: 4px; width: 11px; height: 11px; border-radius: 50%; background: var(--gw-gold)"></span>
            <div style="grid-column: 1 / -1">
              <h3 style="font-family: var(--gw-font-display); font-size: 22px; font-weight: 500; margin: 0 0 6px">Proposal</h3>
              <p style="font-size: 15.5px; line-height: 1.65; color: var(--gw-muted); margin: 0">Send the scope and the price from the same place the work will live.</p>
            </div>
          </li>
          <li style="display: grid; grid-template-columns: auto 1fr; gap: 18px; padding-bottom: 22px; border-left: 1px solid rgb(var(--gw-ink-rgb) / 0.14); margin-left: 13px; padding-left: 24px; position: relative">
            <span aria-hidden="true" style="position: absolute; left: -6px; top: 4px; width: 11px; height: 11px; border-radius: 50%; background: var(--gw-gold)"></span>
            <div style="grid-column: 1 / -1">
              <h3 style="font-family: var(--gw-font-display); font-size: 22px; font-weight: 500; margin: 0 0 6px">Contract</h3>
              <p style="font-size: 15.5px; line-height: 1.65; color: var(--gw-muted); margin: 0">Signed and stored against the event, not in a folder you'll search for in June.</p>
            </div>
          </li>
          <li style="display: grid; grid-template-columns: auto 1fr; gap: 18px; margin-left: 13px; padding-left: 24px; position: relative">
            <span aria-hidden="true" style="position: absolute; left: -6px; top: 4px; width: 11px; height: 11px; border-radius: 50%; background: var(--gw-gold)"></span>
            <div style="grid-column: 1 / -1">
              <h3 style="font-family: var(--gw-font-display); font-size: 22px; font-weight: 500; margin: 0 0 6px">Invoice &amp; paid</h3>
              <p style="font-size: 15.5px; line-height: 1.65; color: var(--gw-muted); margin: 0">Send invoices, auto-remind clients, take payment. Deposits and balances tracked per event.</p>
            </div>
          </li>
        </ol>

        <div class="gw-event">
          <div class="gw-event__head">
            <div class="gw-event__title">Farkas × Whitmore, Sept 12</div>
            <div class="gw-event__tag">One record</div>
          </div>
          <div class="gw-event__rows">
            <div class="gw-event__row"><span class="gw-event__label">Inquiry received</span><span class="gw-event__meta">Lead form · Mar 4</span></div>
            <div class="gw-event__row"><span class="gw-event__label">Questionnaire returned</span><span class="gw-event__meta">Mar 6</span></div>
            <div class="gw-event__row"><span class="gw-event__label">Proposal sent</span><span class="gw-event__meta">From template · Mar 7</span></div>
            <div class="gw-event__row"><span class="gw-event__label">Contract signed</span><span class="gw-event__meta">Mar 9</span></div>
            <div class="gw-event__row gw-event__row--paid"><span class="gw-event__label">Deposit invoice paid</span><span class="gw-event__meta gw-event__meta--paid">Paid</span></div>
          </div>
          <div class="gw-event__tags">
            <span class="gw-chip">One record</span>
            <span class="gw-chip">Timeline linked</span>
            <span class="gw-chip">Budget linked</span>
            <span class="gw-chip gw-chip--solid">No re-typing</span>
          </div>
        </div>
      </div>

      <p style="margin: 28px 0 0"><a class="gw-btn gw-btn--link" href="${SIGNUP}">Try it free</a></p>
    </div>
  </section>

  <!-- everything in one place -->
  <section id="everything" style="background: var(--gw-parchment); padding: var(--gw-section-y) var(--gw-gutter); border-top: 1px solid rgb(var(--gw-ink-rgb) / 0.08); border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.08)">
    <div style="max-width: 1180px; margin: 0 auto">
      <div style="max-width: 44em">
        <p class="gw-eyebrow" style="margin: 0 0 18px">All-in-one event management</p>
        <h2 class="gw-heading gw-heading--section">Everything a planner needs, <span class="gw-heading__accent">in one place</span>.</h2>
      </div>

      <div class="ev-tabs" style="margin: clamp(30px, 4vw, 44px) 0 0">
        <input type="radio" name="ev-tab" id="ev-tab-checklists" class="ev-radio" checked>
        <input type="radio" name="ev-tab" id="ev-tab-vendors" class="ev-radio">
        <input type="radio" name="ev-tab" id="ev-tab-budget" class="ev-radio">
        <div class="ev-tablist" role="tablist" aria-label="Product screenshots">
          <label class="ev-tab" for="ev-tab-checklists">Client checklists</label>
          <label class="ev-tab" for="ev-tab-vendors">Vendor management</label>
          <label class="ev-tab" for="ev-tab-budget">Budget management</label>
        </div>
        <div class="ev-frame">
          <div class="ev-chrome">
            <span class="ev-dot"></span><span class="ev-dot"></span><span class="ev-dot"></span>
            <span class="ev-url ev-url--checklists">app.gatherwise.io/checklists</span>
            <span class="ev-url ev-url--vendors">app.gatherwise.io/vendors</span>
            <span class="ev-url ev-url--budget">app.gatherwise.io/budget</span>
          </div>
          <figure class="ev-panel ev-panel--checklists" style="margin: 0">
            <img loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1763627985886x561011803363365300/checklists.png" alt="A client checklist in Gatherwise with tasks, comments from the couple and file attachments." style="display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover">
          </figure>
          <figure class="ev-panel ev-panel--vendors" style="margin: 0">
            <img loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1764021115690x589582533571415500/vendor.png" alt="Vendor management in Gatherwise listing vendors, linked budgets and booking status." style="display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover">
          </figure>
          <figure class="ev-panel ev-panel--budget" style="margin: 0">
            <img loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1763886279635x400659780785638660/budget.png" alt="Budget management in Gatherwise showing budget, actual spend, paid and outstanding by category." style="display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover">
          </figure>
        </div>
      </div>

      <div style="display: grid; gap: 1px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); margin: clamp(34px, 4vw, 52px) 0 0; background: rgb(var(--gw-ink-rgb) / 0.12); border: 1px solid rgb(var(--gw-ink-rgb) / 0.12)">
        <div style="background: var(--gw-cream); padding: 26px 24px">
          <h3 style="font-family: var(--gw-font-display); font-size: 21px; font-weight: 500; margin: 0 0 8px">Client checklists</h3>
          <p style="font-size: 15px; line-height: 1.6; color: var(--gw-muted); margin: 0">Tasks your couples can comment on, with attachments in the thread.</p>
        </div>
        <div style="background: var(--gw-cream); padding: 26px 24px">
          <h3 style="font-family: var(--gw-font-display); font-size: 21px; font-weight: 500; margin: 0 0 8px">Guest management</h3>
          <p style="font-size: 15px; line-height: 1.6; color: var(--gw-muted); margin: 0">Guest lists, RSVPs and meal choices that feed straight into seating.</p>
        </div>
        <div style="background: var(--gw-cream); padding: 26px 24px">
          <h3 style="font-family: var(--gw-font-display); font-size: 21px; font-weight: 500; margin: 0 0 8px">Vendor management</h3>
          <p style="font-size: 15px; line-height: 1.6; color: var(--gw-muted); margin: 0">Contacts, linked budgets, collaboration and booking status per event.</p>
        </div>
        <div style="background: var(--gw-cream); padding: 26px 24px">
          <h3 style="font-family: var(--gw-font-display); font-size: 21px; font-weight: 500; margin: 0 0 8px">Budgets</h3>
          <p style="font-size: 15px; line-height: 1.6; color: var(--gw-muted); margin: 0">Budget, actual, paid and still due — by category, per event.</p>
        </div>
        <div style="background: var(--gw-cream); padding: 26px 24px">
          <h3 style="font-family: var(--gw-font-display); font-size: 21px; font-weight: 500; margin: 0 0 8px">Client portal</h3>
          <p style="font-size: 15px; line-height: 1.6; color: var(--gw-muted); margin: 0">Clients log in to see timelines, layouts and tasks — and collaborate there.</p>
        </div>
        <div style="background: var(--gw-cream); padding: 26px 24px">
          <h3 style="font-family: var(--gw-font-display); font-size: 21px; font-weight: 500; margin: 0 0 8px">Event templates</h3>
          <p style="font-size: 15px; line-height: 1.6; color: var(--gw-muted); margin: 0">Reuse your run of show, tasks and checklists on the next booking.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- beautiful layouts -->
  <section id="layouts" style="padding: var(--gw-section-y) var(--gw-gutter)">
    <div style="max-width: 1180px; margin: 0 auto; display: grid; gap: clamp(32px, 4vw, 60px); grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: center">
      <div>
        <p class="gw-eyebrow" style="margin: 0 0 18px">Seating chart software</p>
        <h2 class="gw-heading gw-heading--section">Seating charts and floor plans <span class="gw-heading__accent">worth sharing</span>.</h2>
        <p style="font-size: 17.5px; line-height: 1.7; color: var(--gw-muted); margin: 20px 0 0; text-wrap: pretty">Lay out tables against the real room, seat the guest list you already have, and send vendors and clients a clean, modern layout in one click — not a photo of a sketch.</p>
        <ul style="list-style: none; margin: 24px 0 0; padding: 0; display: grid; gap: 10px">
          <li style="display: flex; gap: 12px; font-size: 15.5px; line-height: 1.55; color: var(--gw-ink)"><span aria-hidden="true" style="color: var(--gw-gold)">✓</span>Tables and floor plans drawn to the room</li>
          <li style="display: flex; gap: 12px; font-size: 15.5px; line-height: 1.55; color: var(--gw-ink)"><span aria-hidden="true" style="color: var(--gw-gold)">✓</span>Seats pulled from your guest list and meal choices</li>
          <li style="display: flex; gap: 12px; font-size: 15.5px; line-height: 1.55; color: var(--gw-ink)"><span aria-hidden="true" style="color: var(--gw-gold)">✓</span>Share with vendors and clients in one click</li>
        </ul>
        <p style="margin: 28px 0 0"><a class="gw-btn gw-btn--link" href="${SIGNUP}">Try it free</a></p>
      </div>
      <figure style="margin: 0">
        <div style="border: 1px solid rgb(var(--gw-ink-rgb) / 0.14); border-radius: 4px; overflow: hidden; background: #fff; box-shadow: 0 40px 90px -50px rgb(var(--gw-ink-rgb) / 0.55)">
          <img loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1763628268864x189125627234465020/layout.png" alt="A Gatherwise reception floor plan with round tables, a head table and seated guests." style="display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover">
        </div>
      </figure>
    </div>
  </section>

  <!-- built for planners -->
  <section id="why" style="background: var(--gw-parchment); padding: var(--gw-section-y) var(--gw-gutter); border-top: 1px solid rgb(var(--gw-ink-rgb) / 0.08); border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.08)">
    <div style="max-width: 1180px; margin: 0 auto">
      <div style="max-width: 44em">
        <p class="gw-eyebrow" style="margin: 0 0 18px">Not a generic CRM</p>
        <h2 class="gw-heading gw-heading--section">Built for the way <span class="gw-heading__accent">planners</span> actually work.</h2>
        <p style="font-size: 17.5px; line-height: 1.7; color: var(--gw-muted); margin: 20px 0 0; text-wrap: pretty">Generic client-management tools are good at pipelines and bad at events. They have no seating, no floor plans, no guest lists, no day-of timeline — so that half of the job ends up back in spreadsheets and documents.</p>
      </div>
      <div style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); margin: clamp(30px, 4vw, 44px) 0 0">
        <div class="gw-poscard">
          <div class="gw-eyebrow">Gatherwise</div>
          <h3 class="gw-poscard__title">Event planning software</h3>
          <p class="gw-poscard__text">One record per event, holding the sales side and the production side together.</p>
          <ul class="gw-poscard__list">
            <li class="gw-poscard__item"><span class="gw-poscard__bullet" aria-hidden="true">✓</span>Drag-and-drop day-of timelines, exported per vendor</li>
            <li class="gw-poscard__item"><span class="gw-poscard__bullet" aria-hidden="true">✓</span>Seating charts and floor plans drawn to the room</li>
            <li class="gw-poscard__item"><span class="gw-poscard__bullet" aria-hidden="true">✓</span>Guest lists, RSVPs and meal choices</li>
            <li class="gw-poscard__item"><span class="gw-poscard__bullet" aria-hidden="true">✓</span>Budgets, invoices and payments per event</li>
            <li class="gw-poscard__item"><span class="gw-poscard__bullet" aria-hidden="true">✓</span>A client portal your couples actually use</li>
          </ul>
        </div>
        <div class="gw-poscard gw-poscard--alt">
          <div class="gw-eyebrow gw-eyebrow--muted">A generic client-management tool</div>
          <h3 class="gw-poscard__title">Contacts and a pipeline</h3>
          <p class="gw-poscard__text">Fine for tracking a deal. Then the actual event happens somewhere else.</p>
          <ul class="gw-poscard__list">
            <li class="gw-poscard__item gw-poscard__item--alt"><span class="gw-poscard__bullet gw-poscard__bullet--alt" aria-hidden="true">•</span>No day-of timeline</li>
            <li class="gw-poscard__item gw-poscard__item--alt"><span class="gw-poscard__bullet gw-poscard__bullet--alt" aria-hidden="true">•</span>No seating charts or floor plans</li>
            <li class="gw-poscard__item gw-poscard__item--alt"><span class="gw-poscard__bullet gw-poscard__bullet--alt" aria-hidden="true">•</span>No guest lists or meal choices</li>
            <li class="gw-poscard__item gw-poscard__item--alt"><span class="gw-poscard__bullet gw-poscard__bullet--alt" aria-hidden="true">•</span>Event budgets live in a spreadsheet</li>
            <li class="gw-poscard__item gw-poscard__item--alt"><span class="gw-poscard__bullet gw-poscard__bullet--alt" aria-hidden="true">•</span>Clients get emailed attachments</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- mobile / event day -->
  <section id="mobile" style="background: var(--gw-ink); color: var(--gw-parchment); padding: var(--gw-section-y) var(--gw-gutter) 0">
    <div style="max-width: 1180px; margin: 0 auto; display: grid; gap: clamp(32px, 4vw, 60px); grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: center">
      <div>
        <p class="gw-eyebrow" style="margin: 0 0 18px">Event planning app</p>
        <h2 class="gw-heading gw-heading--section" style="color: var(--gw-parchment)">On the day, it's <span class="gw-heading__accent">in your hand</span>.</h2>
        <p style="font-size: 17.5px; line-height: 1.7; color: rgb(var(--gw-parchment-rgb) / 0.75); margin: 20px 0 0; max-width: 30em; text-wrap: pretty">Real-time notifications, client messages, and the timeline, guest list and vendor contacts with you on the floor.</p>
        <a href="${APPSTORE}" ${EXT} style="display: inline-block; margin: 28px 0 0; text-decoration: none">
          <img loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1763629012028x916350660990181800/App%20Store.png" alt="Download Gatherwise on the App Store" style="height: 48px; width: auto; display: block">
        </a>
      </div>
      <figure style="margin: 0; display: flex; justify-content: center; align-self: end">
        <img loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1763628803505x608196859878909200/mobile-screens.png" alt="Two Gatherwise phone screens showing day-of notifications and a client message thread." style="display: block; width: 100%; max-width: 420px; height: auto">
      </figure>
    </div>
  </section>

  <!-- testimonial -->
  <section id="testimonials" style="padding: var(--gw-section-y) var(--gw-gutter)">
    <div style="max-width: 1180px; margin: 0 auto">
      <p class="gw-eyebrow" style="margin: 0 0 18px">From planners</p>
      <div style="display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))">
        <figure style="margin: 0; background: var(--gw-parchment); border: 1px solid rgb(var(--gw-ink-rgb) / 0.1); border-top: 3px solid var(--gw-gold); padding: clamp(26px, 3vw, 42px); grid-column: 1 / -1; max-width: 1000px; display: grid; gap: clamp(26px, 3vw, 44px); grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); align-items: start">
          <img loading="lazy" src="/index_v2/paige-farkas.jpeg" alt="Paige Farkas of Farkas Events walking with a planning clipboard." style="display: block; width: 100%; max-width: 340px; aspect-ratio: 4 / 5; object-fit: cover; object-position: 50% 30%; border: 1px solid rgb(var(--gw-ink-rgb) / 0.1)">
          <div>
          <blockquote style="margin: 0">
            <p style="font-family: var(--gw-font-display); font-weight: 500; font-size: clamp(26px, 3.2vw, 38px); line-height: 1.22; color: var(--gw-ink); margin: 0; text-wrap: pretty">“An absolute game changer as a solo planner managing multiple couples. Budgets, tasks and vendors finally link together — and the drag-and-drop timeline is the standout.”</p>
          </blockquote>
          <figcaption style="display: flex; align-items: center; gap: 14px; margin: 26px 0 0">
            <img loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1776888406327x121972771338876960/farkas.png" alt="Farkas Events" style="width: auto; height: 46px; max-width: 120px; object-fit: contain; flex: none">
            <span style="font-size: 14.5px; line-height: 1.5; color: var(--gw-muted)"><strong style="color: var(--gw-ink); font-weight: 700">Paige Farkas</strong><br>Owner &amp; Lead Planner, Farkas Events</span>
          </figcaption>
          <details style="margin: 24px 0 0; border-top: 1px solid rgb(var(--gw-ink-rgb) / 0.12); padding-top: 18px">
            <summary style="cursor: pointer; font-size: 13.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gw-gold)">Read the full review</summary>
            <div style="margin: 16px 0 0; display: grid; gap: 14px; max-width: 60em">
              <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0">As a solo planner managing multiple couples at once, Gatherwise has been an absolute game changer. Everything I used to keep in three different places now lives on one event — the budget, the task list, the vendors — and they link to each other, so I'm not reconciling a spreadsheet against my notes the week of.</p>
              <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0">My clients can log in and collaborate without the usual back-and-forth, which alone has saved me hours every week. And the drag-and-drop timeline is the standout — I build it once, move things when the day changes, and everyone gets the version that's actually current.</p>
            </div>
          </details>
          </div>
        </figure>
      </div>
    </div>
  </section>

  <!-- pricing -->
  <section id="pricing" style="background: var(--gw-parchment); padding: var(--gw-section-y) var(--gw-gutter); border-top: 1px solid rgb(var(--gw-ink-rgb) / 0.08)">
    <div style="max-width: 1180px; margin: 0 auto">
      <div style="max-width: 44em">
        <p class="gw-eyebrow" style="margin: 0 0 18px">Pricing</p>
        <h2 class="gw-heading gw-heading--section">Simple, <span class="gw-heading__accent">transparent</span> pricing.</h2>
        <p style="font-size: 17.5px; line-height: 1.7; color: var(--gw-muted); margin: 20px 0 0; text-wrap: pretty">Choose the best plan for your team. Pay by the month and cancel at any time.</p>
        <p style="font-family: var(--gw-font-display); font-size: clamp(22px, 2.4vw, 28px); line-height: 1.3; color: var(--gw-ink); margin: 22px 0 0">Every plan includes every feature. The tiers only change how much you can run at once.</p>
      </div>

      <div style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); margin: clamp(30px, 4vw, 44px) 0 0; align-items: start">

        <div style="background: var(--gw-cream); border: 1px solid rgb(var(--gw-ink-rgb) / 0.12); padding: clamp(24px, 2.6vw, 32px); display: grid; gap: 22px; align-content: start">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 26px">
            <img loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1773284079566x357118163132713150/tier-starter.svg" alt="" style="height: 34px; width: auto">
          </div>
          <div class="gw-price">
            <div class="gw-price__head">
              <span class="gw-price__plan">Starter</span>
              <span class="gw-price__amount">$29<span class="gw-price__unit">/mo</span></span>
            </div>
            <div class="gw-price__pills">
              <span class="gw-pill">15 active projects</span>
              <span class="gw-pill">1 admin + 1 team member</span>
              <span class="gw-pill">1 questionnaire</span>
              <span class="gw-pill">Every feature included</span>
            </div>
            <span class="gw-price__foot">For a solo planner with a full but finite season.</span>
          </div>
          <a class="gw-btn gw-btn--large" href="${SIGNUP}" style="width: 100%">Sign up</a>
        </div>

        <div style="background: var(--gw-cream); border: 1px solid var(--gw-gold); box-shadow: 0 30px 70px -44px rgb(var(--gw-ink-rgb) / 0.55); padding: clamp(24px, 2.6vw, 32px); display: grid; gap: 22px; align-content: start">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 26px">
            <img loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1773284092251x187625892602347520/tier-professional.svg" alt="" style="height: 34px; width: auto">
            <span class="gw-chip gw-chip--solid">Most popular</span>
          </div>
          <div class="gw-price">
            <div class="gw-price__head">
              <span class="gw-price__plan">Professional</span>
              <span class="gw-price__amount">$59<span class="gw-price__unit">/mo</span></span>
            </div>
            <div class="gw-price__pills">
              <span class="gw-pill">50 active projects</span>
              <span class="gw-pill">2 admins + 2 team members</span>
              <span class="gw-pill">3 questionnaires</span>
              <span class="gw-pill">Every feature included</span>
            </div>
            <span class="gw-price__foot">For a small studio running several couples at once.</span>
          </div>
          <a class="gw-btn gw-btn--large" href="${SIGNUP}" style="width: 100%">Sign up</a>
        </div>

        <div style="background: var(--gw-cream); border: 1px solid rgb(var(--gw-ink-rgb) / 0.12); padding: clamp(24px, 2.6vw, 32px); display: grid; gap: 22px; align-content: start">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 26px">
            <img loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1773284103472x485964426262794000/tier-elite.svg" alt="" style="height: 34px; width: auto">
          </div>
          <div class="gw-price">
            <div class="gw-price__head">
              <span class="gw-price__plan">Elite</span>
              <span class="gw-price__amount">$149<span class="gw-price__unit">/mo</span></span>
            </div>
            <div class="gw-price__pills">
              <span class="gw-pill">Unlimited projects</span>
              <span class="gw-pill">Unlimited admins &amp; team</span>
              <span class="gw-pill">Unlimited questionnaires</span>
              <span class="gw-pill">Every feature included</span>
            </div>
            <span class="gw-price__foot">For a team with no ceiling on the season.</span>
          </div>
          <a class="gw-btn gw-btn--large" href="${SIGNUP}" style="width: 100%">Sign up</a>
        </div>
      </div>

      <div style="margin: clamp(28px, 3vw, 40px) 0 0; background: var(--gw-cream); border: 1px solid rgb(var(--gw-ink-rgb) / 0.12); padding: clamp(24px, 2.6vw, 34px)">
        <h3 class="gw-eyebrow" style="margin: 0 0 18px">Included on every plan</h3>
        <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 10px 26px; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr))">
          <li style="display: flex; gap: 10px; font-size: 15px; color: var(--gw-ink)"><span aria-hidden="true" style="color: var(--gw-gold)">✓</span>Client lead inquiry form</li>
          <li style="display: flex; gap: 10px; font-size: 15px; color: var(--gw-ink)"><span aria-hidden="true" style="color: var(--gw-gold)">✓</span>Unlimited clients</li>
          <li style="display: flex; gap: 10px; font-size: 15px; color: var(--gw-ink)"><span aria-hidden="true" style="color: var(--gw-gold)">✓</span>Timeline creation</li>
          <li style="display: flex; gap: 10px; font-size: 15px; color: var(--gw-ink)"><span aria-hidden="true" style="color: var(--gw-gold)">✓</span>Task checklists</li>
          <li style="display: flex; gap: 10px; font-size: 15px; color: var(--gw-ink)"><span aria-hidden="true" style="color: var(--gw-gold)">✓</span>Vendor management</li>
          <li style="display: flex; gap: 10px; font-size: 15px; color: var(--gw-ink)"><span aria-hidden="true" style="color: var(--gw-gold)">✓</span>Client invoicing</li>
          <li style="display: flex; gap: 10px; font-size: 15px; color: var(--gw-ink)"><span aria-hidden="true" style="color: var(--gw-gold)">✓</span>Payment processing</li>
          <li style="display: flex; gap: 10px; font-size: 15px; color: var(--gw-ink)"><span aria-hidden="true" style="color: var(--gw-gold)">✓</span>Event templates</li>
          <li style="display: flex; gap: 10px; font-size: 15px; color: var(--gw-ink)"><span aria-hidden="true" style="color: var(--gw-gold)">✓</span>Guest management</li>
          <li style="display: flex; gap: 10px; font-size: 15px; color: var(--gw-ink)"><span aria-hidden="true" style="color: var(--gw-gold)">✓</span>Seating and layout</li>
        </ul>
      </div>

      <div style="margin: 20px 0 0">
        <div class="gw-callout">
          <div class="gw-eyebrow">Priced for a seasonal business</div>
          <h2 class="gw-callout__title">A flat monthly rate — not per event, not per project.</h2>
          <p class="gw-callout__text">Planning work is seasonal; software billing usually is not. Gatherwise is a flat monthly rate — not per event, not per project — so a six-wedding weekend in May costs exactly what a quiet January costs.</p>
          <p class="gw-callout__text">Change plans as your load changes, and cancel any month. Your past events stay where you left them.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" style="padding: var(--gw-section-y) var(--gw-gutter)">
    <div style="max-width: 860px; margin: 0 auto">
      <p class="gw-eyebrow" style="margin: 0 0 18px">Questions</p>
      <h2 class="gw-heading gw-heading--section">Before you <span class="gw-heading__accent">start</span>.</h2>

      <div style="margin: clamp(28px, 3vw, 40px) 0 0; border-top: 1px solid rgb(var(--gw-ink-rgb) / 0.14)">
        <details style="border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.14)">
          <summary style="cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 22px 0; font-family: var(--gw-font-display); font-size: clamp(20px, 2.2vw, 25px); font-weight: 500; color: var(--gw-ink)"><h3 style="margin: 0; font: inherit">Is this built for wedding planners specifically?</h3><span aria-hidden="true" style="color: var(--gw-gold); font-family: var(--gw-font-body); font-size: 20px; flex: none">+</span></summary>
          <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0 0 24px; max-width: 60em">Yes — weddings are what it's shaped around, which is why it has day-of timelines, seating and floor plans, and guest lists rather than a generic pipeline. Planners who run corporate and social events use it for the same reasons.</p>
        </details>
        <details style="border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.14)">
          <summary style="cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 22px 0; font-family: var(--gw-font-display); font-size: clamp(20px, 2.2vw, 25px); font-weight: 500; color: var(--gw-ink)"><h3 style="margin: 0; font: inherit">How does the 14-day free trial work?</h3><span aria-hidden="true" style="color: var(--gw-gold); font-family: var(--gw-font-body); font-size: 20px; flex: none">+</span></summary>
          <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0 0 24px; max-width: 60em">Fourteen days, every feature, no credit card. Build a real event in it — that's the only way to know. There's no free tier after the trial, so if it isn't earning its keep you simply don't continue.</p>
        </details>
        <details style="border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.14)">
          <summary style="cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 22px 0; font-family: var(--gw-font-display); font-size: clamp(20px, 2.2vw, 25px); font-weight: 500; color: var(--gw-ink)"><h3 style="margin: 0; font: inherit">What counts toward my project limit?</h3><span aria-hidden="true" style="color: var(--gw-gold); font-family: var(--gw-font-body); font-size: 20px; flex: none">+</span></summary>
          <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0 0 24px; max-width: 60em">Only <em>active</em> events. Once an event is over you archive it — it stops counting toward your limit but stays fully intact, so last season's timelines, layouts and invoices are still there to look up or copy from. In practice the limit is how many events you're running at once, not how many you've ever run.</p>
        </details>
        <details style="border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.14)">
          <summary style="cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 22px 0; font-family: var(--gw-font-display); font-size: clamp(20px, 2.2vw, 25px); font-weight: 500; color: var(--gw-ink)"><h3 style="margin: 0; font: inherit">Can I import my existing clients and vendors?</h3><span aria-hidden="true" style="color: var(--gw-gold); font-family: var(--gw-font-body); font-size: 20px; flex: none">+</span></summary>
          <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0 0 24px; max-width: 60em">Bring your list and we'll help you get it in during the trial — send it over in whatever shape it's currently in. If you'd rather not hand it off, most solo planners add clients as each event starts and are current within a week.</p>
        </details>
        <details style="border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.14)">
          <summary style="cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 22px 0; font-family: var(--gw-font-display); font-size: clamp(20px, 2.2vw, 25px); font-weight: 500; color: var(--gw-ink)"><h3 style="margin: 0; font: inherit">Do my clients need an account to view timelines and layouts?</h3><span aria-hidden="true" style="color: var(--gw-gold); font-family: var(--gw-font-body); font-size: 20px; flex: none">+</span></summary>
          <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0 0 24px; max-width: 60em">Clients log in to the client portal to comment on tasks, attach files and collaborate. If you just need someone to <em>see</em> a timeline or layout — a vendor, a venue contact — you export and send it, no account needed.</p>
        </details>
        <details style="border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.14)">
          <summary style="cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 22px 0; font-family: var(--gw-font-display); font-size: clamp(20px, 2.2vw, 25px); font-weight: 500; color: var(--gw-ink)"><h3 style="margin: 0; font: inherit">Is there a mobile app?</h3><span aria-hidden="true" style="color: var(--gw-gold); font-family: var(--gw-font-body); font-size: 20px; flex: none">+</span></summary>
          <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0 0 24px; max-width: 60em">Yes, on iOS — real-time notifications, client messages, and your event information on the floor. It's the day-of companion to the full app, not a replacement for it.</p>
        </details>
        <details style="border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.14)">
          <summary style="cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 22px 0; font-family: var(--gw-font-display); font-size: clamp(20px, 2.2vw, 25px); font-weight: 500; color: var(--gw-ink)"><h3 style="margin: 0; font: inherit">What happens in my slow season — can I change plans?</h3><span aria-hidden="true" style="color: var(--gw-gold); font-family: var(--gw-font-body); font-size: 20px; flex: none">+</span></summary>
          <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0 0 24px; max-width: 60em">Move up or down between plans as your load changes, and cancel any month. Billing is a flat monthly rate, so a heavy May doesn't cost more than a quiet January — and your past events stay where you left them.</p>
        </details>
      </div>
    </div>
  </section>

  <!-- closing CTA -->
  <section class="gw-cta">
    <div class="gw-cta__inner">
      <h2 class="gw-cta__title">Trusted by Planners across the U.S. and Canada</h2>
      <p class="gw-cta__text">Join planners across the U.S. and Canada who trust Gatherwise to impress clients, stay organized, and save hours.</p>
      <div class="gw-cta__actions">
        <a class="gw-btn gw-btn--gold" href="${SIGNUP}">Start 14-day trial</a>
        <a class="gw-btn gw-btn--ghost" href="${DEMO}" ${EXT}>Book a demo</a>
      </div>
      <p class="gw-cta__fine">14-day free trial · No credit card required · Cancel anytime</p>
    </div>
  </section>

</main>

<!-- footer -->
<footer style="background: var(--gw-ink); color: rgb(var(--gw-parchment-rgb) / 0.7); padding: clamp(48px, 6vw, 72px) var(--gw-gutter) 0; border-top: 1px solid rgb(var(--gw-parchment-rgb) / 0.14)">
  <div style="max-width: 1180px; margin: 0 auto; display: grid; gap: 36px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); padding-bottom: 44px">
    <div style="grid-column: 1 / -1; min-width: 200px; max-width: 420px">
      <img loading="lazy" src="${LOGO}" alt="Gatherwise" style="height: 28px; width: auto; display: block; filter: brightness(0) invert(1); opacity: 0.9">
      <p style="font-size: 15px; line-height: 1.65; color: rgb(var(--gw-parchment-rgb) / 0.6); margin: 18px 0 0; max-width: 26em">Event planning software and CRM for planners — solo or with a team. Timelines, seating, guests, vendors, budgets and billing in one place.</p>
      <div style="display: flex; gap: 14px; margin: 22px 0 0">
        <a class="gwv2-social" href="${INSTAGRAM}" ${EXT} style="font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none; border-bottom: 1px solid rgb(var(--gw-parchment-rgb) / 0.25); padding-bottom: 2px">Instagram</a>
        <a class="gwv2-social" href="${FACEBOOK}" ${EXT} style="font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none; border-bottom: 1px solid rgb(var(--gw-parchment-rgb) / 0.25); padding-bottom: 2px">Facebook</a>
      </div>
    </div>
    <nav aria-label="Product" style="display: grid; gap: 12px; align-content: start">
      <h2 style="font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gw-gold); margin: 0 0 4px; font-family: var(--gw-font-body); font-weight: 700">Product</h2>
      <a class="gwv2-footlink" href="#timelines" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Smart timelines</a>
      <a class="gwv2-footlink" href="#layouts" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Seating &amp; layouts</a>
      <a class="gwv2-footlink" href="#sales" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Proposals &amp; invoicing</a>
      <a class="gwv2-footlink" href="#everything" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">All features</a>
      <a class="gwv2-footlink" href="#mobile" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Mobile app</a>
      <a class="gwv2-footlink" href="#pricing" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Pricing</a>
    </nav>
    <nav aria-label="Resources" style="display: grid; gap: 12px; align-content: start">
      <h2 style="font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gw-gold); margin: 0 0 4px; font-family: var(--gw-font-body); font-weight: 700">Resources</h2>
      <a class="gwv2-footlink" href="${DOCS}" ${EXT} style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Docs</a>
      <a class="gwv2-footlink" href="${DOCS}" ${EXT} style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Help center</a>
      <a class="gwv2-footlink" href="#faq" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">FAQ</a>
      <a class="gwv2-footlink" href="${DEMO}" ${EXT} style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Book a demo</a>
    </nav>
    <nav aria-label="Company" style="display: grid; gap: 12px; align-content: start">
      <h2 style="font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gw-gold); margin: 0 0 4px; font-family: var(--gw-font-body); font-weight: 700">Company</h2>
      <a class="gwv2-footlink" href="${ABOUT}" ${EXT} style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">About</a>
      <a class="gwv2-footlink" href="${CONTACT}" ${EXT} style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Contact</a>
      <a class="gwv2-footlink" href="${SIGNUP}" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Log In</a>
      <a class="gwv2-footlink" href="${SIGNUP}" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Start free trial</a>
    </nav>
    <nav aria-label="Legal" style="display: grid; gap: 12px; align-content: start">
      <h2 style="font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gw-gold); margin: 0 0 4px; font-family: var(--gw-font-body); font-weight: 700">Legal</h2>
      <a class="gwv2-footlink" href="${LEGAL}" ${EXT} style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Privacy</a>
      <a class="gwv2-footlink" href="${LEGAL}" ${EXT} style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Terms</a>
    </nav>
  </div>
  <div class="gw-footer">
    <span>© 2026 Gatherwise, Inc.</span>
    <span>Built for event and wedding planners — solo or with a team.</span>
  </div>
</footer>
`;

export default function Page() {
  return (
    <div
      className={`${cormorant.variable} ${karla.variable} gwv2`}
      dangerouslySetInnerHTML={{ __html: PAGE_HTML }}
    />
  );
}
