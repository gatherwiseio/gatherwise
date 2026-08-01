import type { Metadata } from "next";
import { Cormorant_Garamond, Albert_Sans } from "next/font/google";
import HeroTrialEnhancer from "./HeroTrialEnhancer";
import "./index_v2.css";

// Scoped to this route: the homepage design uses its own editorial type pairing
// (Cormorant Garamond display + Albert Sans body) rather than the site-wide
// brand fonts. The CSS variables are consumed by index_v2.css via
// --gw-font-display / --gw-font-body.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
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
const CONTACT_EMAIL = "mailto:hello@gatherwise.io";
// Help center + legal pages will live on the app subdomain. These paths are
// placeholders and will 404 until those routes exist.
const HELP = "https://app.gatherwise.io/help";
const PRIVACY = "https://app.gatherwise.io/privacy";
const TERMS = "https://app.gatherwise.io/terms";
const APPSTORE = "https://apps.apple.com/us/app/gatherwise/id6755325275";
const INSTAGRAM = "https://www.instagram.com/gatherwiseio/";
const FACEBOOK =
  "https://www.facebook.com/people/Gatherwise-Inc/61583507273024/";

// target="_blank" for all external destinations; auth + in-page anchors stay same-tab.
const EXT = `target="_blank" rel="noopener noreferrer"`;

const LOGO =
  "https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1715799780276x587257126953273300/logo-no-background.png";

// Phosphor "CheckCircle" (regular). Inlined so the checklists across the page use
// a real icon instead of a bare "✓" glyph. currentColor lets each use site tint it.
const CHECK = `<svg class="gw-check" viewBox="0 0 256 256" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>`;

// Phosphor social glyphs for the footer bar (comment 16).
const IG_ICON = `<svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path></svg>`;
const FB_ICON = `<svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false"><path d="M128,24A104,104,0,0,0,112,231.37V152H88a8,8,0,0,1,0-16h24V112a40,40,0,0,1,40-40h16a8,8,0,0,1,0,16H152a24,24,0,0,0-24,24v24h32a8,8,0,0,1,0,16H128v79.37A104,104,0,0,0,128,24Z"></path></svg>`;

const PAGE_HTML = `
<a href="#main" class="gwv2-skip" style="position: absolute; left: -9999px; top: 0; background: var(--gw-ink); color: var(--gw-parchment); padding: 12px 18px; font-size: 14px; z-index: 100">Skip to content</a>

<header data-nav="" style="position: sticky; top: 0; z-index: 50; background: var(--gw-cream); padding: 16px var(--gw-gutter); transition: padding .18s ease, box-shadow .18s ease, background .18s ease">
  <div style="max-width: 1180px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px; position: relative">
    <a href="#main" style="display: flex; align-items: center; gap: 10px; text-decoration: none; flex: none">
      <img src="${LOGO}" alt="Gatherwise" style="height: 26px; width: auto; display: block">
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
    <div data-hero-grid="" style="max-width: 1180px; margin: 0 auto; display: grid; gap: clamp(36px, 5vw, 60px); grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: center">
      <div>
        <p class="gw-eyebrow" style="margin: 0 0 20px">EVENT PLANNING SOFTWARE FOR EVENT PROS</p>
        <h1 class="gw-heading gw-heading--display"><span class="gw-heading__accent">Effortless</span> event planning starts here.</h1>
        <p style="font-size: clamp(17px, 1.4vw, 19px); line-height: 1.65; color: var(--gw-muted); margin: 22px 0 0; max-width: 34em; text-wrap: pretty">All your timelines, vendors, invoices, and clients—organized in one platform built just for planners.</p>

        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin: 32px 0 0; max-width: 30em">
          <input id="hero-email" type="email" placeholder="you@yourstudio.com" autocomplete="email" aria-label="Work email" style="flex: 1 1 200px; min-width: 0; height: 52px; padding: 0 16px; font-family: var(--gw-font-body); font-size: 15.5px; color: var(--gw-ink); background: #fff; border: 1px solid rgb(var(--gw-ink-rgb) / 0.22); border-radius: var(--gw-radius)">
          <a id="hero-trial-btn" class="gw-btn gw-btn--large" href="${SIGNUP}" style="height: 52px; flex: 0 0 auto">Start free trial</a>
        </div>

        <p style="font-size: 13.5px; line-height: 1.6; color: var(--gw-muted-soft); margin: 16px 0 0; letter-spacing: 0.01em">14-day free trial · Cancel anytime</p>
      </div>

      <figure style="margin: 0">
        <div style="border: 1px solid rgb(var(--gw-ink-rgb) / 0.14); border-radius: 4px; overflow: hidden; background: #fff; box-shadow: 0 40px 90px -50px rgb(var(--gw-ink-rgb) / 0.55)">
          <img src="/index_v2/hero-tasks.png" width="1526" height="1004" alt="The Gatherwise task board for a wedding — tasks grouped into sections with assignees and due dates." style="display: block; width: 100%; height: auto; aspect-ratio: 1526 / 1004; object-fit: cover">
        </div>
      </figure>
    </div>
  </section>

  <!-- all-in-one platform -->
  <section id="all-in-one" style="padding: 0 var(--gw-gutter) var(--gw-section-y)">
    <div style="max-width: 1180px; margin: 0 auto">
      <div style="max-width: 44em">
        <p class="gw-eyebrow" style="margin: 0 0 18px">One platform, not ten tabs</p>
        <h2 class="gw-heading gw-heading--section">Replace the whole stack with <span class="gw-heading__accent">one platform</span>.</h2>
        <p style="font-size: 17.5px; line-height: 1.7; color: var(--gw-muted); margin: 20px 0 0; text-wrap: pretty">The PDFs, spreadsheets, docs, forms and one-off planning apps you juggle for every event — all replaced by a single place built for planners.</p>
      </div>

      <div class="gw-flow" style="margin: clamp(30px, 4vw, 46px) 0 0">
        <div class="gw-flow__tools">
          <span class="gw-tool">PDF</span>
          <span class="gw-tool">Excel &amp; Sheets</span>
          <span class="gw-tool">Word</span>
          <span class="gw-tool">Gmail</span>
          <span class="gw-tool">Google Forms</span>
          <span class="gw-tool">HoneyBook</span>
          <span class="gw-tool">Aisle Planner</span>
          <span class="gw-tool">Timeline Genius</span>
        </div>
        <span class="gw-flow__arrow" aria-hidden="true">→</span>
        <div class="gw-flow__hub">
          <img src="${LOGO}" alt="Gatherwise" style="height: 30px; width: auto; display: block">
          <span class="gw-flow__hub-note">One platform</span>
        </div>
      </div>

      <ul class="gw-offer">
        <li class="gw-offer__item">${CHECK}<span>Leads &amp; CRM</span></li>
        <li class="gw-offer__item">${CHECK}<span>Proposals</span></li>
        <li class="gw-offer__item">${CHECK}<span>Contracts</span></li>
        <li class="gw-offer__item">${CHECK}<span>Invoices</span></li>
        <li class="gw-offer__item">${CHECK}<span>Questionnaires</span></li>
        <li class="gw-offer__item">${CHECK}<span>Timelines</span></li>
        <li class="gw-offer__item">${CHECK}<span>Floor plans &amp; layouts</span></li>
        <li class="gw-offer__item">${CHECK}<span>Checklists</span></li>
        <li class="gw-offer__item">${CHECK}<span>Notes</span></li>
        <li class="gw-offer__item">${CHECK}<span>Guest lists</span></li>
        <li class="gw-offer__item">${CHECK}<span>Vendor management</span></li>
        <li class="gw-offer__item">${CHECK}<span>Budgets</span></li>
        <li class="gw-offer__item">${CHECK}<span>Templates</span></li>
      </ul>
    </div>
  </section>

  <!-- smart timelines -->
  <section id="timelines" style="background: var(--gw-parchment); padding: var(--gw-section-y) var(--gw-gutter)">
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
  <section id="everything" style="background: var(--gw-parchment); padding: var(--gw-section-y) var(--gw-gutter)">
    <div style="max-width: 1180px; margin: 0 auto">
      <div style="max-width: 44em">
        <p class="gw-eyebrow" style="margin: 0 0 18px">All-in-one event management</p>
        <h2 class="gw-heading gw-heading--section">Everything a planner needs, <span class="gw-heading__accent">in one place</span>.</h2>
      </div>

      <div class="ev-tabs" style="margin: clamp(30px, 4vw, 44px) 0 0">
        <input type="radio" name="ev-tab" id="ev-tab-checklists" class="ev-radio" checked>
        <input type="radio" name="ev-tab" id="ev-tab-vendors" class="ev-radio">
        <input type="radio" name="ev-tab" id="ev-tab-budget" class="ev-radio">
        <div class="ev-frame">
          <div class="ev-chrome">
            <span class="ev-dot"></span><span class="ev-dot"></span><span class="ev-dot"></span>
            <span class="ev-url">app.gatherwise.io</span>
          </div>
          <figure class="ev-panel ev-panel--checklists" style="margin: 0">
            <img loading="lazy" src="/index_v2/everything-preview.png" width="1521" height="1008" alt="A Gatherwise task open in the client checklist — assignee, due date, a vendor pricing table and an @mention in the comments." style="display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; object-position: center top">
          </figure>
          <figure class="ev-panel ev-panel--vendors" style="margin: 0">
            <img loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1764021115690x589582533571415500/vendor.png" alt="Vendor management in Gatherwise listing vendors, linked budgets and booking status." style="display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover">
          </figure>
          <figure class="ev-panel ev-panel--budget" style="margin: 0">
            <img loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1763886279635x400659780785638660/budget.png" alt="Budget management in Gatherwise showing budget, actual spend, paid and outstanding by category." style="display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover">
          </figure>
        </div>

        <div class="ev-grid" role="radiogroup" aria-label="Choose a feature to preview">
          <label class="ev-block ev-block--tab" for="ev-tab-checklists">
            <h3 class="ev-block__title">Client checklists</h3>
            <p class="ev-block__text">Tasks your couples can comment on — <strong style="font-weight: 600; color: var(--gw-ink)">@mention</strong> the couple or a teammate, with attachments in the thread.</p>
            <span class="ev-block__cue" aria-hidden="true">Preview ↑</span>
          </label>
          <div class="ev-block">
            <h3 class="ev-block__title">Guest management</h3>
            <p class="ev-block__text">Guest lists, RSVPs and meal choices that feed straight into seating.</p>
          </div>
          <label class="ev-block ev-block--tab" for="ev-tab-vendors">
            <h3 class="ev-block__title">Vendor management</h3>
            <p class="ev-block__text">Contacts, linked budgets, collaboration and booking status per event.</p>
            <span class="ev-block__cue" aria-hidden="true">Preview ↑</span>
          </label>
          <label class="ev-block ev-block--tab" for="ev-tab-budget">
            <h3 class="ev-block__title">Budgets</h3>
            <p class="ev-block__text">Budget, actual, paid and still due — by category, per event.</p>
            <span class="ev-block__cue" aria-hidden="true">Preview ↑</span>
          </label>
          <div class="ev-block">
            <h3 class="ev-block__title">Client portal</h3>
            <p class="ev-block__text">Clients log in to see timelines, layouts and tasks — and collaborate there.</p>
          </div>
          <div class="ev-block">
            <h3 class="ev-block__title">Event templates</h3>
            <p class="ev-block__text">Reuse your run of show, tasks and checklists on the next booking.</p>
          </div>
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
          <li style="display: flex; gap: 12px; font-size: 15.5px; line-height: 1.55; color: var(--gw-ink)">${CHECK}Tables and floor plans drawn to the room</li>
          <li style="display: flex; gap: 12px; font-size: 15.5px; line-height: 1.55; color: var(--gw-ink)">${CHECK}Seats pulled from your guest list and meal choices</li>
          <li style="display: flex; gap: 12px; font-size: 15.5px; line-height: 1.55; color: var(--gw-ink)">${CHECK}Share with vendors and clients in one click</li>
        </ul>
        <p style="margin: 28px 0 0"><a class="gw-btn gw-btn--link" href="${SIGNUP}">Try it free</a></p>
      </div>
      <figure style="margin: 0">
        <div style="border: 1px solid rgb(var(--gw-ink-rgb) / 0.14); border-radius: 4px; overflow: hidden; background: #fff; box-shadow: 0 40px 90px -50px rgb(var(--gw-ink-rgb) / 0.55)">
          <img loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1782233675167x742639443203669800/layout-mockup-center.png" alt="A Gatherwise reception floor plan with round tables, a head table and seated guests." style="display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover">
        </div>
      </figure>
    </div>
  </section>

  <!-- built for planners -->
  <section id="why" style="background: var(--gw-parchment); padding: var(--gw-section-y) var(--gw-gutter)">
    <div style="max-width: 1180px; margin: 0 auto">
      <div style="max-width: 44em">
        <p class="gw-eyebrow" style="margin: 0 0 18px">Not a generic CRM</p>
        <h2 class="gw-heading gw-heading--section">Built for the way <span class="gw-heading__accent">planners</span> actually work.</h2>
        <p style="font-size: 17.5px; line-height: 1.7; color: var(--gw-muted); margin: 20px 0 0; text-wrap: pretty">Generic client-management tools are good at pipelines and bad at events. They have no seating, no floor plans, no guest lists, no day-of timeline — so that half of the job ends up back in spreadsheets and documents.</p>
      </div>
      <div style="overflow-x: auto; margin: clamp(30px, 4vw, 44px) 0 0">
        <table class="gw-cmp">
          <thead>
            <tr>
              <th scope="col" class="gw-cmp__feature">What running an event actually takes</th>
              <th scope="col" class="gw-cmp__col gw-cmp__col--gw">Gatherwise</th>
              <th scope="col" class="gw-cmp__col">A generic CRM</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="gw-cmp__feature">Drag-and-drop day-of timelines, exported per vendor</th>
              <td class="gw-cmp__cell"><span class="gw-mark gw-mark--yes" aria-label="Yes">✓</span></td>
              <td class="gw-cmp__cell"><span class="gw-mark gw-mark--no" aria-label="No">—</span></td>
            </tr>
            <tr>
              <th scope="row" class="gw-cmp__feature">Seating charts and floor plans drawn to the room</th>
              <td class="gw-cmp__cell"><span class="gw-mark gw-mark--yes" aria-label="Yes">✓</span></td>
              <td class="gw-cmp__cell"><span class="gw-mark gw-mark--no" aria-label="No">—</span></td>
            </tr>
            <tr>
              <th scope="row" class="gw-cmp__feature">Guest lists, RSVPs and meal choices</th>
              <td class="gw-cmp__cell"><span class="gw-mark gw-mark--yes" aria-label="Yes">✓</span></td>
              <td class="gw-cmp__cell"><span class="gw-mark gw-mark--no" aria-label="No">—</span></td>
            </tr>
            <tr>
              <th scope="row" class="gw-cmp__feature">Budgets, invoices and payments per event</th>
              <td class="gw-cmp__cell"><span class="gw-mark gw-mark--yes" aria-label="Yes">✓</span></td>
              <td class="gw-cmp__cell"><span class="gw-mark gw-mark--no" aria-label="No">—</span><span class="gw-mark__note">Spreadsheet</span></td>
            </tr>
            <tr>
              <th scope="row" class="gw-cmp__feature">A client portal your couples actually use</th>
              <td class="gw-cmp__cell"><span class="gw-mark gw-mark--yes" aria-label="Yes">✓</span></td>
              <td class="gw-cmp__cell"><span class="gw-mark gw-mark--no" aria-label="No">—</span><span class="gw-mark__note">Emailed files</span></td>
            </tr>
            <tr>
              <th scope="row" class="gw-cmp__feature">Leads, proposals, contracts and a pipeline</th>
              <td class="gw-cmp__cell"><span class="gw-mark gw-mark--yes" aria-label="Yes">✓</span></td>
              <td class="gw-cmp__cell"><span class="gw-mark gw-mark--yes" aria-label="Yes">✓</span></td>
            </tr>
          </tbody>
        </table>
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
          <img loading="lazy" src="/index_v2/app-store-badge.svg" width="135" height="40" alt="Download Gatherwise on the App Store" style="height: 44px; width: auto; display: block">
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
  <section id="pricing" style="background: var(--gw-parchment); padding: var(--gw-section-y) var(--gw-gutter)">
    <div style="max-width: 1180px; margin: 0 auto">
      <div style="max-width: 44em">
        <p class="gw-eyebrow" style="margin: 0 0 18px">Pricing</p>
        <h2 class="gw-heading gw-heading--section">Simple, <span class="gw-heading__accent">transparent</span> pricing.</h2>
        <p style="font-size: 17.5px; line-height: 1.7; color: var(--gw-muted); margin: 20px 0 0; text-wrap: pretty">Choose the best plan for your team. Pay by the month and cancel at any time.</p>
        <p style="font-family: var(--gw-font-display); font-size: clamp(22px, 2.4vw, 28px); line-height: 1.3; color: var(--gw-ink); margin: 22px 0 0">Every plan includes every feature. The tiers only change how much you can run at once.</p>
      </div>

      <div style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(272px, 1fr)); margin: clamp(30px, 4vw, 44px) 0 0; align-items: stretch">

        <div style="background: var(--gw-cream); border: 1px solid rgb(var(--gw-ink-rgb) / 0.1); border-radius: 12px; padding: clamp(26px, 2.8vw, 34px); display: flex; flex-direction: column; gap: 20px">
          <div>
            <div class="gw-price__plan">Starter</div>
            <p style="font-size: 14.5px; line-height: 1.5; color: var(--gw-muted); margin: 10px 0 0; min-height: 44px">For a solo planner with a full but finite season.</p>
          </div>
          <div style="display: flex; align-items: baseline; gap: 5px">
            <span style="font-family: var(--gw-font-display); font-size: 44px; font-weight: 500; color: var(--gw-ink); line-height: 1">$29</span>
            <span style="font-size: 15px; color: var(--gw-muted-soft)">/month</span>
          </div>
          <a class="gw-btn gw-btn--ghost" href="${SIGNUP}" style="width: 100%">Sign up</a>
          <ul style="list-style: none; margin: 0; padding: 20px 0 0; border-top: 1px solid rgb(var(--gw-ink-rgb) / 0.1); display: grid; gap: 12px">
            <li style="display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: var(--gw-ink)">${CHECK}15 active projects</li>
            <li style="display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: var(--gw-ink)">${CHECK}1 admin + 1 team member</li>
            <li style="display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: var(--gw-ink)">${CHECK}1 questionnaire</li>
            <li style="display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: var(--gw-ink)">${CHECK}Every feature included</li>
          </ul>
        </div>

        <div style="background: var(--gw-cream); border: 1.5px solid var(--gw-gold); border-radius: 12px; box-shadow: 0 30px 70px -44px rgb(var(--gw-ink-rgb) / 0.55); padding: clamp(26px, 2.8vw, 34px); display: flex; flex-direction: column; gap: 20px">
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px">
              <div class="gw-price__plan">Professional</div>
              <span class="gw-chip gw-chip--solid">Most popular</span>
            </div>
            <p style="font-size: 14.5px; line-height: 1.5; color: var(--gw-muted); margin: 10px 0 0; min-height: 44px">For a small studio running several couples at once.</p>
          </div>
          <div style="display: flex; align-items: baseline; gap: 5px">
            <span style="font-family: var(--gw-font-display); font-size: 44px; font-weight: 500; color: var(--gw-ink); line-height: 1">$59</span>
            <span style="font-size: 15px; color: var(--gw-muted-soft)">/month</span>
          </div>
          <a class="gw-btn gw-btn--large" href="${SIGNUP}" style="width: 100%">Sign up</a>
          <ul style="list-style: none; margin: 0; padding: 20px 0 0; border-top: 1px solid rgb(var(--gw-ink-rgb) / 0.1); display: grid; gap: 12px">
            <li style="display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: var(--gw-ink)">${CHECK}50 active projects</li>
            <li style="display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: var(--gw-ink)">${CHECK}2 admins + 2 team members</li>
            <li style="display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: var(--gw-ink)">${CHECK}3 questionnaires</li>
            <li style="display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: var(--gw-ink)">${CHECK}Every feature included</li>
          </ul>
        </div>

        <div style="background: var(--gw-cream); border: 1px solid rgb(var(--gw-ink-rgb) / 0.1); border-radius: 12px; padding: clamp(26px, 2.8vw, 34px); display: flex; flex-direction: column; gap: 20px">
          <div>
            <div class="gw-price__plan">Elite</div>
            <p style="font-size: 14.5px; line-height: 1.5; color: var(--gw-muted); margin: 10px 0 0; min-height: 44px">For a team with no ceiling on the season.</p>
          </div>
          <div style="display: flex; align-items: baseline; gap: 5px">
            <span style="font-family: var(--gw-font-display); font-size: 44px; font-weight: 500; color: var(--gw-ink); line-height: 1">$149</span>
            <span style="font-size: 15px; color: var(--gw-muted-soft)">/month</span>
          </div>
          <a class="gw-btn gw-btn--ghost" href="${SIGNUP}" style="width: 100%">Sign up</a>
          <ul style="list-style: none; margin: 0; padding: 20px 0 0; border-top: 1px solid rgb(var(--gw-ink-rgb) / 0.1); display: grid; gap: 12px">
            <li style="display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: var(--gw-ink)">${CHECK}Unlimited projects</li>
            <li style="display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: var(--gw-ink)">${CHECK}Unlimited admins &amp; team</li>
            <li style="display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: var(--gw-ink)">${CHECK}Unlimited questionnaires</li>
            <li style="display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: var(--gw-ink)">${CHECK}Every feature included</li>
          </ul>
        </div>
      </div>

      <div style="margin: clamp(34px, 4vw, 48px) 0 0; padding: clamp(28px, 3vw, 36px) 0 0; border-top: 1px solid rgb(var(--gw-ink-rgb) / 0.12)">
        <h3 class="gw-eyebrow" style="margin: 0 0 18px">Every plan includes</h3>
        <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 12px 26px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))">
          <li style="display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--gw-ink)">${CHECK}Client lead inquiry form</li>
          <li style="display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--gw-ink)">${CHECK}Unlimited clients</li>
          <li style="display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--gw-ink)">${CHECK}Timeline creation</li>
          <li style="display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--gw-ink)">${CHECK}Task checklists</li>
          <li style="display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--gw-ink)">${CHECK}Vendor management</li>
          <li style="display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--gw-ink)">${CHECK}Client invoicing</li>
          <li style="display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--gw-ink)">${CHECK}Payment processing</li>
          <li style="display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--gw-ink)">${CHECK}Event templates</li>
          <li style="display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--gw-ink)">${CHECK}Guest management</li>
          <li style="display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--gw-ink)">${CHECK}Seating and layout</li>
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
      <div class="gw-cta__lead">
        <h2 class="gw-cta__title">Trusted by Planners across the U.S. and Canada</h2>
        <p class="gw-cta__text">Join planners across the U.S. and Canada who trust Gatherwise to impress clients, stay organized, and save hours.</p>
        <p class="gw-cta__fine">14-day free trial · No credit card required · Cancel anytime</p>
      </div>
      <div class="gw-cta__actions">
        <a class="gw-btn gw-btn--gold" href="${SIGNUP}">Start 14-day trial</a>
        <a class="gw-btn gw-btn--ghost" href="${DEMO}" ${EXT}>Book a demo</a>
      </div>
    </div>
  </section>

</main>

<!-- footer -->
<footer style="background: var(--gw-ink); color: rgb(var(--gw-parchment-rgb) / 0.7); padding: clamp(48px, 6vw, 72px) var(--gw-gutter) 0; border-top: 1px solid rgb(var(--gw-parchment-rgb) / 0.14)">
  <div style="max-width: 1180px; margin: 0 auto; display: grid; gap: 36px; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); padding-bottom: 44px">
    <div style="grid-column: span 2; min-width: 220px">
      <img loading="lazy" src="${LOGO}" alt="Gatherwise" style="height: 26px; width: auto; display: block; filter: brightness(0) invert(1); opacity: 0.9">
      <p style="font-size: 15px; line-height: 1.65; color: rgb(var(--gw-parchment-rgb) / 0.6); margin: 18px 0 0; max-width: 26em">Event planning software and CRM for planners — solo or with a team. Timelines, seating, guests, vendors, budgets and billing in one place.</p>
    </div>
    <nav aria-label="Product" style="display: grid; gap: 12px; align-content: start">
      <h2 style="font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gw-gold); margin: 0 0 4px; font-family: var(--gw-font-body); font-weight: 700">Product</h2>
      <a class="gwv2-footlink" href="#timelines" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Smart timelines</a>
      <a class="gwv2-footlink" href="#layouts" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Seating &amp; layouts</a>
      <a class="gwv2-footlink" href="#sales" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Proposals &amp; invoicing</a>
      <a class="gwv2-footlink" href="#everything" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">All features</a>
      <a class="gwv2-footlink" href="#mobile" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Mobile app</a>
    </nav>
    <nav aria-label="Resources" style="display: grid; gap: 12px; align-content: start">
      <h2 style="font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gw-gold); margin: 0 0 4px; font-family: var(--gw-font-body); font-weight: 700">Resources</h2>
      <a class="gwv2-footlink" href="#pricing" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Pricing</a>
      <a class="gwv2-footlink" href="${HELP}" ${EXT} style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Help center</a>
      <a class="gwv2-footlink" href="#faq" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">FAQ</a>
      <a class="gwv2-footlink" href="${DEMO}" ${EXT} style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Book a demo</a>
    </nav>
    <nav aria-label="Company" style="display: grid; gap: 12px; align-content: start">
      <h2 style="font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gw-gold); margin: 0 0 4px; font-family: var(--gw-font-body); font-weight: 700">Company</h2>
      <a class="gwv2-footlink" href="${CONTACT_EMAIL}" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Contact</a>
      <a class="gwv2-footlink" href="${SIGNUP}" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Log In</a>
      <a class="gwv2-footlink" href="${SIGNUP}" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Start free trial</a>
    </nav>
    <nav aria-label="Legal" style="display: grid; gap: 12px; align-content: start">
      <h2 style="font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gw-gold); margin: 0 0 4px; font-family: var(--gw-font-body); font-weight: 700">Legal</h2>
      <a class="gwv2-footlink" href="${PRIVACY}" ${EXT} style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Privacy</a>
      <a class="gwv2-footlink" href="${TERMS}" ${EXT} style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Terms</a>
    </nav>
  </div>
  <div class="gw-footer">
    <span>© 2026 Gatherwise, Inc.</span>
    <div class="gw-footer__end">
      <span>Built for event and wedding planners.</span>
      <span class="gw-social">
        <a class="gwv2-social" href="${INSTAGRAM}" ${EXT} aria-label="Gatherwise on Instagram">${IG_ICON}</a>
        <a class="gwv2-social" href="${FACEBOOK}" ${EXT} aria-label="Gatherwise on Facebook">${FB_ICON}</a>
      </span>
    </div>
  </div>
</footer>
`;

export default function Page() {
  return (
    <>
      <div
        className={`${cormorant.variable} ${albertSans.variable} gwv2`}
        dangerouslySetInnerHTML={{ __html: PAGE_HTML }}
      />
      <HeroTrialEnhancer />
    </>
  );
}
