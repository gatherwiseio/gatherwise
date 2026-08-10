import type { Metadata } from "next";
import { Cormorant_Garamond, Albert_Sans } from "next/font/google";
import HeroTrialEnhancer from "./HeroTrialEnhancer";
import ReviewsCarousel from "./ReviewsCarousel";
import ChecklistAnimationMount from "./ChecklistAnimationMount";
import StackAnimationTrigger from "./StackAnimationTrigger";
import VendorAnimationMount from "./VendorAnimationMount";
import TimelineVideoTrigger from "./TimelineVideoTrigger";
import BudgetAnimationMount from "./BudgetAnimationMount";
import { STACK_ANIMATION_HTML } from "./stackAnimation";
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
  title: "Gatherwise | Built for Event & Wedding Planner Pros",
  description:
    "All-in-one event software for professional planners. Timelines, Layouts, Budget, Guests, Vendors, Contracts, Invoices, Sales, Proposals, Questionnaires, Floorplans, and more",
};

// --- Link map (from the handoff / gatherwise.io) ------------------------------
// Signup CTAs route to the signup entry point; "Log In" goes to plain /login.
const SIGNUP = "https://app.gatherwise.io/login?m=signup";
const LOGIN = "https://app.gatherwise.io/login";
const DEMO = "https://calendly.com/alex-gatherwise/30min";
const CONTACT_EMAIL = "mailto:hello@gatherwise.io";
// Help center + legal pages will live on the app subdomain. These paths are
// placeholders and will 404 until those routes exist.
const HELP = "https://app.gatherwise.io/help";
const PRIVACY = "https://app.gatherwise.io/legal?tab=privacy";
const TERMS = "https://app.gatherwise.io/legal?tab=terms";
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

// Phosphor "Check" (bold) — white check inside the gold comparison-table circles.
const MARK_YES = `<span class="gw-mark gw-mark--yes" aria-label="Yes"><svg viewBox="0 0 256 256" width="14" height="14" fill="currentColor" aria-hidden="true" focusable="false"><path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"></path></svg></span>`;
const MARK_NO = `<span class="gw-mark gw-mark--no" aria-label="No">—</span>`;

// Phosphor social glyphs for the footer bar (comment 16).
const IG_ICON = `<svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path></svg>`;
const FB_ICON = `<svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false"><path d="M128,24A104,104,0,0,0,112,231.37V152H88a8,8,0,0,1,0-16h24V112a40,40,0,0,1,40-40h16a8,8,0,0,1,0,16H152a24,24,0,0,0-24,24v24h32a8,8,0,0,1,0,16H128v79.37A104,104,0,0,0,128,24Z"></path></svg>`;

// Phosphor "CaretLeft"/"CaretRight"/"X" — carousel arrows and the review modal's
// close control.
const ARROW_LEFT = `<svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path></svg>`;
const ARROW_RIGHT = `<svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>`;
const CLOSE_ICON = `<svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>`;

const PAGE_HTML = `
<a href="#main" class="gwv2-skip" style="position: absolute; left: -9999px; top: 0; background: var(--gw-ink); color: var(--gw-parchment); padding: 12px 18px; font-size: 14px; z-index: 100">Skip to content</a>

<header data-nav="" style="position: sticky; top: 0; z-index: 50; background: var(--gw-cream); padding: 16px var(--gw-gutter); transition: padding .18s ease, box-shadow .18s ease, background .18s ease">
  <div style="max-width: 1180px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px">
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
        <a href="${LOGIN}" style="text-decoration: none; font-size: 14.5px; font-weight: 600; color: var(--gw-ink)">Log In</a>
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
      <nav data-mobile-nav="" aria-label="Primary mobile" class="gwv2-menu__panel">
        <a class="gwv2-menu__link" href="#timelines">Features</a>
        <a class="gwv2-menu__link" href="#pricing">Pricing</a>
        <a class="gwv2-menu__link" href="${DEMO}" ${EXT}>Book Demo</a>
        <a class="gwv2-menu__link" href="${LOGIN}">Log In</a>
        <a class="gw-btn gw-btn--large" href="${SIGNUP}">Start free trial</a>
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
          <input id="hero-email" class="gw-input" type="email" placeholder="you@yourstudio.com" autocomplete="email" aria-label="Work email" style="flex: 1 1 200px; min-width: 0; height: 52px; padding: 0 16px; font-family: var(--gw-font-body); font-size: 15.5px; color: var(--gw-ink); background: #fff">
          <a id="hero-trial-btn" class="gw-btn gw-btn--large" href="${SIGNUP}" style="height: 52px; flex: 0 0 auto">Start free trial</a>
        </div>

        <p style="font-size: 13.5px; line-height: 1.6; color: var(--gw-muted-soft); margin: 16px 0 0; letter-spacing: 0.01em">14-day free trial · Cancel anytime</p>
      </div>

      <figure style="margin: 0">
        <div style="border: 1px solid rgb(var(--gw-ink-rgb) / 0.14); border-radius: 4px; overflow: hidden; background: #fff; box-shadow: 0 40px 90px -50px rgb(var(--gw-ink-rgb) / 0.55)">
          <img src="/index_v2/hero-tasks.png" width="1524" height="1004" alt="The Gatherwise task board for a wedding — tasks grouped into sections with assignees and due dates." style="display: block; width: 100%; height: auto; aspect-ratio: 1524 / 1004; object-fit: cover">
        </div>
      </figure>
    </div>
  </section>

  <!-- replace the whole stack -->
  <section id="one-platform" style="background: var(--gw-ink); color: var(--gw-parchment); padding: var(--gw-section-y) var(--gw-gutter)">
    <div style="max-width: 1180px; margin: 0 auto">
      <div style="max-width: 60em">
        <p class="gw-eyebrow" style="margin: 0 0 18px">One platform, not ten tabs</p>
        <h2 class="gw-heading gw-heading--section" style="color: var(--gw-parchment)">Replace the whole stack with <span class="gw-heading__accent">one platform</span>.</h2>
        <p style="font-size: 17.5px; line-height: 1.7; color: rgb(var(--gw-parchment-rgb) / 0.75); margin: 20px 0 0; max-width: 36em; text-wrap: pretty">The PDFs, spreadsheets, docs, forms and one-off planning apps you juggle for every event — all replaced by a single place built for planners.</p>
      </div>

      <figure class="gw-stack" role="img" aria-label="Ten browser tabs — Gmail, HoneyBook, Dubsado, Word, Google Forms, Excel, Aisle Planner, Timeline Genius, Prismm and a PDF packet — closing one by one, until a single Gatherwise tab is left showing the whole event.">
        ${STACK_ANIMATION_HTML}
      </figure>

      <ul class="gw-offer gw-offer--dark">
        <li class="gw-offer__item">${CHECK}Leads &amp; CRM</li>
        <li class="gw-offer__item">${CHECK}Proposals</li>
        <li class="gw-offer__item">${CHECK}Contracts</li>
        <li class="gw-offer__item">${CHECK}Invoices</li>
        <li class="gw-offer__item">${CHECK}Questionnaires</li>
        <li class="gw-offer__item">${CHECK}Timelines</li>
        <li class="gw-offer__item">${CHECK}Floor plans &amp; layouts</li>
        <li class="gw-offer__item">${CHECK}Checklists</li>
        <li class="gw-offer__item">${CHECK}Notes</li>
        <li class="gw-offer__item">${CHECK}Guest lists</li>
        <li class="gw-offer__item">${CHECK}Vendor management</li>
        <li class="gw-offer__item">${CHECK}Budgets</li>
        <li class="gw-offer__item">${CHECK}Templates</li>
      </ul>
    </div>
  </section>

  <!-- smart timelines -->
  <section id="timelines" style="background: var(--gw-parchment); padding: var(--gw-section-y) var(--gw-gutter)">
    <div style="max-width: 1180px; margin: 0 auto">
      <div style="max-width: 44em">
        <p class="gw-eyebrow" style="margin: 0 0 18px">Event timeline software</p>
        <h2 class="gw-heading gw-heading--section">The day-of timeline, <span class="gw-heading__accent">drag and drop</span>.</h2>
        <p style="font-size: 17.5px; line-height: 1.7; color: var(--gw-muted); margin: 20px 0 0; text-wrap: pretty">Share it the way each person needs it — a clean PDF, or a live link that updates itself as you tweak, so you're never re-sending. Filter the timeline so each vendor sees only their part, and invite clients and vendors to collaborate across as many versions as the event calls for.</p>
      </div>

      <figure style="margin: clamp(32px, 4vw, 52px) 0 0">
        <div class="gw-timeline-frame">
          <!-- No autoplay attribute: TimelineVideoTrigger starts it once the
               top third has scrolled into view, and pauses it off screen. With
               no JS the poster frame stands in. -->
          <video class="gw-timeline-video" data-scroll-play muted loop playsinline preload="metadata" poster="/index_v2/timeline-poster.jpg" width="1600" height="902" aria-label="A day-of wedding timeline in Gatherwise — drag-and-drop timed items tagged with the client team, vendors and guests.">
            <source src="/index_v2/timeline.mp4" type="video/mp4">
          </video>
        </div>
      </figure>

      <div style="display: grid; gap: 1px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); margin: clamp(32px, 4vw, 48px) 0 0; background: rgb(var(--gw-ink-rgb) / 0.15)">
        <div class="gw-win">
          <div class="gw-win__number" aria-hidden="true">01</div>
          <h3 class="gw-win__title">Share a live link or a PDF</h3>
          <p class="gw-win__text">Export any timeline as a PDF, or share it as a live link. Tweak the run of show and the link updates itself — so you're not re-sending a new file every time something moves.</p>
        </div>
        <div class="gw-win">
          <div class="gw-win__number" aria-hidden="true">02</div>
          <h3 class="gw-win__title">A custom version per vendor</h3>
          <p class="gw-win__text">Filter the timeline to each vendor and export their own version — the caterer sees catering, the band sees the band. No one wades through the parts that aren't theirs.</p>
        </div>
        <div class="gw-win">
          <div class="gw-win__number" aria-hidden="true">03</div>
          <h3 class="gw-win__title">Invite, collaborate, version freely</h3>
          <p class="gw-win__text">Invite clients and vendors to view and collaborate on the timeline — and create as many versions as you want, for different days, parties or what-ifs.</p>
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

      <div class="gw-sales-grid" style="margin: clamp(32px, 4vw, 48px) 0 0">
        <ol class="gw-sales-steps">
          <li class="gw-sales-step">
            <span class="gw-sales-step__dot" aria-hidden="true"></span>
            <div class="gw-sales-step__body">
              <h3 class="gw-sales-step__title">Lead inquiry form</h3>
              <p class="gw-sales-step__text">Put a form on your site. Inquiries arrive as real leads, not another email to triage.</p>
            </div>
          </li>
          <li class="gw-sales-step">
            <span class="gw-sales-step__dot" aria-hidden="true"></span>
            <div class="gw-sales-step__body">
              <h3 class="gw-sales-step__title">Questionnaire</h3>
              <p class="gw-sales-step__text">Ask the discovery questions once, in writing. Answers land on the couple's record.</p>
            </div>
          </li>
          <li class="gw-sales-step">
            <span class="gw-sales-step__dot" aria-hidden="true"></span>
            <div class="gw-sales-step__body">
              <h3 class="gw-sales-step__title">Proposal</h3>
              <p class="gw-sales-step__text">Send the scope and the price from the same place the work will live.</p>
            </div>
          </li>
          <li class="gw-sales-step">
            <span class="gw-sales-step__dot" aria-hidden="true"></span>
            <div class="gw-sales-step__body">
              <h3 class="gw-sales-step__title">Contract</h3>
              <p class="gw-sales-step__text">Signed and stored against the event, not in a folder you'll search for in June.</p>
            </div>
          </li>
          <li class="gw-sales-step">
            <span class="gw-sales-step__dot" aria-hidden="true"></span>
            <div class="gw-sales-step__body">
              <h3 class="gw-sales-step__title">Invoice &amp; paid</h3>
              <p class="gw-sales-step__text">Send invoices, auto-remind clients, take payment. Deposits and balances tracked per event.</p>
            </div>
          </li>
        </ol>

        <div class="gw-event">
          <div class="gw-event__head">
            <div class="gw-event__title">Nguyen × Whitmore, Sept 12</div>
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
      <div style="max-width: 52em">
        <p class="gw-eyebrow" style="margin: 0 0 18px">All-in-one event management</p>
        <h2 class="gw-heading gw-heading--section">Everything a planner needs, <span class="gw-heading__accent">in one place</span>.</h2>
      </div>

      <div style="display: grid; gap: clamp(28px, 3.5vw, 52px); margin: clamp(36px, 5vw, 60px) 0 0">

        <div class="gw-screenrow gw-screenrow--anim">
          <figure class="gw-screenrow__media gw-screenrow__media--bare">
            <!-- Animated in by ChecklistAnimationMount once it nears the
                 viewport. The box reserves its 3:2 slot up front so the load
                 causes no shift, and carries the description itself since the
                 animation inside is decorative. -->
            <div id="gw-checklist-anim" class="gw-anim" role="img" aria-label="A Gatherwise task open in the client checklist — the couple assigned, a due date, a description and an @mention in the comments."></div>
          </figure>
          <div class="gw-screenrow__body">
            <p class="gw-eyebrow" style="margin: 0 0 14px">Client checklists</p>
            <h3 class="gw-heading gw-heading--sub" style="margin: 0">Tasks your couples actually keep up with.</h3>
            <p style="font-size: 16.5px; line-height: 1.7; color: var(--gw-muted); margin: 16px 0 0; max-width: 34em; text-wrap: pretty">Assign tasks, set due dates, and <strong style="font-weight: 600; color: var(--gw-ink)">@mention</strong> the couple or a teammate — with comments and attachments right in the thread, so nothing ends up in a separate inbox.</p>
          </div>
        </div>

        <div class="gw-screenrow gw-screenrow--rev gw-screenrow--vanim">
          <figure class="gw-screenrow__media gw-screenrow__media--bare">
            <!-- Animated in by VendorAnimationMount once it nears the viewport.
                 The box reserves its slot up front so the load causes no
                 shift, and carries the description itself since the animation
                 inside is decorative. -->
            <div id="gw-vendor-anim" class="gw-vanim" role="img" aria-label="A Gatherwise vendor record — Everlight Photography flips to Booked, then opens on its contacts, notes, linked budget expense with payment progress, and a comment tagging the couple."></div>
          </figure>
          <div class="gw-screenrow__body">
            <p class="gw-eyebrow" style="margin: 0 0 14px">Vendor management</p>
            <h3 class="gw-heading gw-heading--sub" style="margin: 0">Every vendor — considered, booked and paid.</h3>
            <p style="font-size: 16.5px; line-height: 1.7; color: var(--gw-muted); margin: 16px 0 0; max-width: 34em; text-wrap: pretty">Track vendors by category and booking status, with linked budgets, notes, files and payment progress against each event — not scattered across your inbox.</p>
          </div>
        </div>

        <div class="gw-screenrow gw-screenrow--banim">
          <figure class="gw-screenrow__media gw-screenrow__media--bare">
            <!-- Animated in by BudgetAnimationMount once it nears the viewport.
                 The box reserves its slot up front so the load causes no
                 shift, and carries the description itself since the animation
                 inside is decorative. -->
            <div id="gw-budget-anim" class="gw-banim" role="img" aria-label="A Gatherwise budget sheet — categories with estimated, actual, difference, paid and due, where an actual amount is typed into coordination fees and the first payment lands, recalculating the grand total."></div>
          </figure>
          <div class="gw-screenrow__body">
            <p class="gw-eyebrow" style="margin: 0 0 14px">Budgets</p>
            <h3 class="gw-heading gw-heading--sub" style="margin: 0">Budget vs. actual, paid vs. still due.</h3>
            <p style="font-size: 16.5px; line-height: 1.7; color: var(--gw-muted); margin: 16px 0 0; max-width: 34em; text-wrap: pretty">The whole picture by category, per event — what you planned, what's actually been spent, what's paid and what's still outstanding.</p>
          </div>
        </div>
      </div>

      <div style="margin: clamp(40px, 5vw, 64px) 0 0; padding-top: clamp(28px, 3vw, 36px); border-top: 1px solid rgb(var(--gw-ink-rgb) / 0.12)">
        <p class="gw-eyebrow" style="margin: 0 0 20px">Also in every event</p>
        <div style="display: grid; gap: 26px 30px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))">
          <div>
            <h3 style="font-family: var(--gw-font-display); font-size: 22px; font-weight: 500; margin: 0 0 8px; color: var(--gw-ink)">Guest management</h3>
            <p style="font-size: 15px; line-height: 1.65; color: var(--gw-muted); margin: 0">Guest lists, RSVPs and meal choices that feed straight into seating.</p>
          </div>
          <div>
            <h3 style="font-family: var(--gw-font-display); font-size: 22px; font-weight: 500; margin: 0 0 8px; color: var(--gw-ink)">Client portal</h3>
            <p style="font-size: 15px; line-height: 1.65; color: var(--gw-muted); margin: 0">Couples sign in with a magic link to follow timelines, layouts and tasks — and collaborate there.</p>
          </div>
          <div>
            <h3 style="font-family: var(--gw-font-display); font-size: 22px; font-weight: 500; margin: 0 0 8px; color: var(--gw-ink)">Event templates</h3>
            <p style="font-size: 15px; line-height: 1.65; color: var(--gw-muted); margin: 0">Reuse your run of show, tasks and checklists on the next booking.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- beautiful layouts -->
  <section id="layouts" style="padding: var(--gw-section-y) var(--gw-gutter)">
    <div data-layout-grid="" style="max-width: 1180px; margin: 0 auto; display: grid; gap: clamp(32px, 4vw, 60px); grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); align-items: center">
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
          <img loading="lazy" src="/index_v2/layout-preview.png" width="1212" height="692" alt="A Gatherwise reception seating chart — round guest tables, dance floor, lounge, bar and welcome area drawn to the room." style="display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover">
        </div>
      </figure>
    </div>
  </section>

  <!-- built for planners -->
  <section id="why" style="background: var(--gw-parchment); padding: var(--gw-section-y) var(--gw-gutter)">
    <div style="max-width: 1180px; margin: 0 auto">
      <div style="max-width: 52em">
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
              <td class="gw-cmp__cell">${MARK_YES}</td>
              <td class="gw-cmp__cell">${MARK_NO}</td>
            </tr>
            <tr>
              <th scope="row" class="gw-cmp__feature">Seating charts and floor plans drawn to the room</th>
              <td class="gw-cmp__cell">${MARK_YES}</td>
              <td class="gw-cmp__cell">${MARK_NO}</td>
            </tr>
            <tr>
              <th scope="row" class="gw-cmp__feature">Guest lists, RSVPs and meal choices</th>
              <td class="gw-cmp__cell">${MARK_YES}</td>
              <td class="gw-cmp__cell">${MARK_NO}</td>
            </tr>
            <tr>
              <th scope="row" class="gw-cmp__feature">Budgets, invoices and payments per event</th>
              <td class="gw-cmp__cell">${MARK_YES}</td>
              <td class="gw-cmp__cell">${MARK_NO}<span class="gw-mark__note">Spreadsheet</span></td>
            </tr>
            <tr>
              <th scope="row" class="gw-cmp__feature">A client portal your couples actually use</th>
              <td class="gw-cmp__cell">${MARK_YES}</td>
              <td class="gw-cmp__cell">${MARK_NO}<span class="gw-mark__note">Emailed files</span></td>
            </tr>
            <tr>
              <th scope="row" class="gw-cmp__feature">Leads, proposals, contracts and a pipeline</th>
              <td class="gw-cmp__cell">${MARK_YES}</td>
              <td class="gw-cmp__cell">${MARK_YES}</td>
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
      <div class="gw-reviews__head">
        <p class="gw-eyebrow" style="margin: 0">From planners</p>
        <div class="gw-reviews__nav" data-review-nav hidden>
          <button type="button" class="gw-reviews__arrow" data-review-prev aria-label="Previous review">${ARROW_LEFT}</button>
          <button type="button" class="gw-reviews__arrow" data-review-next aria-label="Next review">${ARROW_RIGHT}</button>
        </div>
      </div>
    </div>

    <!-- outside the centered column: the track bleeds to both page edges and
         re-creates the gutter as its own padding, so the first card still lines
         up with the content above it while the rest runs off-screen. -->
    <div class="gw-reviews__track" data-review-track tabindex="0" role="group" aria-label="Planner reviews — scroll horizontally">
      <figure class="gw-review">
        <div class="gw-review__media">
            <img class="gw-review__portrait" loading="lazy" src="/index_v2/paige-farkas.jpeg" alt="Paige Farkas of Farkas Events walking with a planning clipboard." style="object-position: 50% 18%; transform: scale(1.2); transform-origin: 50% 22%">
        </div>
        <div class="gw-review__body">
          <blockquote style="margin: 0">
            <p class="gw-review__quote">“An absolute game changer as a solo planner managing multiple couples. Budgets, tasks and vendors finally link together — and the drag-and-drop timeline is the standout.”</p>
          </blockquote>
          <figcaption class="gw-review__who">
            <img class="gw-review__logo" loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1776888406327x121972771338876960/farkas.png" alt="Farkas Events">
            <span style="font-size: 14.5px; line-height: 1.5; color: var(--gw-muted)"><strong style="color: var(--gw-ink); font-weight: 700">Paige Farkas</strong><br>Owner &amp; Lead Planner, Farkas Events</span>
          </figcaption>
          <button type="button" class="gw-review__more" data-review-open="review-farkas" aria-haspopup="dialog">Read the full review</button>
        </div>
      </figure>

      <figure class="gw-review">
        <div class="gw-review__media">
          <img class="gw-review__portrait" loading="lazy" src="/index_v2/shelby-martin.png" alt="Shelby Martin of Martin &amp; Co. Premier Event Planning." style="object-position: 50% 15%">
        </div>
        <div class="gw-review__body">
          <blockquote style="margin: 0">
            <p class="gw-review__quote">“Our clients love having everything for their event in one place. What sets Gatherwise apart is the team — they listen to feedback and turn it into updates we can see.”</p>
          </blockquote>
          <figcaption class="gw-review__who">
            <img class="gw-review__logo" loading="lazy" src="/index_v2/martin-and-co.jpg" alt="Martin &amp; Co. Premier Event Planning" style="background: #000">
            <span style="font-size: 14.5px; line-height: 1.5; color: var(--gw-muted)"><strong style="color: var(--gw-ink); font-weight: 700">Shelby Martin</strong><br>Co-Owner &amp; Lead Planner, Martin &amp; Co</span>
          </figcaption>
          <button type="button" class="gw-review__more" data-review-open="review-martin" aria-haspopup="dialog">Read the full review</button>
        </div>
      </figure>
    </div>

    <dialog class="gw-modal" id="review-farkas" aria-labelledby="review-farkas-name">
      <div class="gw-modal__panel">
        <button type="button" class="gw-modal__close" data-review-close aria-label="Close">${CLOSE_ICON}</button>
        <header class="gw-modal__head">
          <img class="gw-review__logo" loading="lazy" src="https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1776888406327x121972771338876960/farkas.png" alt="Farkas Events">
          <span style="font-size: 14.5px; line-height: 1.5; color: var(--gw-muted)"><strong id="review-farkas-name" style="color: var(--gw-ink); font-weight: 700">Paige Farkas</strong><br>Owner &amp; Lead Planner, Farkas Events</span>
        </header>
        <div class="gw-modal__body">
          <p class="gw-modal__lede">“An absolute game changer as a solo planner managing multiple couples.”</p>
          <p class="gw-modal__text">As a solo planner managing multiple couples at once, Gatherwise has been an absolute game changer. Everything I used to keep in three different places now lives on one event — the budget, the task list, the vendors — and they link to each other, so I'm not reconciling a spreadsheet against my notes the week of.</p>
          <p class="gw-modal__text">My clients can log in and collaborate without the usual back-and-forth, which alone has saved me hours every week. And the drag-and-drop timeline is the standout — I build it once, move things when the day changes, and everyone gets the version that's actually current.</p>
        </div>
      </div>
    </dialog>

    <dialog class="gw-modal" id="review-martin" aria-labelledby="review-martin-name">
      <div class="gw-modal__panel">
        <button type="button" class="gw-modal__close" data-review-close aria-label="Close">${CLOSE_ICON}</button>
        <header class="gw-modal__head">
          <img class="gw-review__logo" loading="lazy" src="/index_v2/martin-and-co.jpg" alt="Martin &amp; Co. Premier Event Planning" style="background: #000">
          <span style="font-size: 14.5px; line-height: 1.5; color: var(--gw-muted)"><strong id="review-martin-name" style="color: var(--gw-ink); font-weight: 700">Shelby Martin</strong><br>Co-Owner &amp; Lead Planner, Martin &amp; Co</span>
        </header>
        <div class="gw-modal__body">
          <p class="gw-modal__lede">“Our clients love having everything for their event in one place.”</p>
          <p class="gw-modal__text">We have had such a positive experience using Gatherwise at Martin &amp; Co. It has significantly improved the way we manage our planning process and has helped us create a more streamlined, organized experience for both our team and our clients. Our clients especially love having everything related to their event in one centralized place, which has made communication, organization, and collaboration so much easier throughout the planning process.</p>
          <p class="gw-modal__text">One of the things that truly sets Gatherwise apart, though, is the team behind the platform. They are incredibly responsive whenever we have questions, need assistance, or want to provide feedback. On multiple occasions, I've shared general feedback or suggestions about the platform and have later been able to directly see those ideas incorporated into updates and new features. It is refreshing to work with a company that not only asks for feedback, but genuinely listens to its users and acts on it.</p>
          <p class="gw-modal__text">Their customer support also feels incredibly personal. When I've had questions about certain features, the team has even gone out of their way to create personalized screen-share videos walking me through exactly how something works. That level of service and attention is rare and makes us feel like we are working with a true partner rather than simply using another software platform.</p>
          <p class="gw-modal__text">I also love that Gatherwise is constantly evolving. They are regularly introducing new features and improvements based on user feedback and industry trends, and it has been exciting to watch the platform continue to grow.</p>
          <p class="gw-modal__text">I would highly recommend Gatherwise to any event planner looking to improve their internal processes, elevate their services, and provide an even better experience for their clients. It has become an invaluable part of how we operate at Martin &amp; Co., and we are excited to continue growing alongside the platform.</p>
        </div>
      </div>
    </dialog>
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
          <summary style="cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 22px 0; font-family: var(--gw-font-display); font-size: clamp(20px, 2.2vw, 25px); font-weight: 500; color: var(--gw-ink)"><h3 style="margin: 0; font: inherit">Is this only for wedding planners?</h3><span class="gw-faq__icon" aria-hidden="true"></span></summary>
          <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0 0 24px; max-width: 60em">It's built for event and wedding planners. Weddings are a core use case — which is why it has day-of timelines, seating and floor plans, and guest lists rather than a generic pipeline — but the same tools fit corporate events, galas, showers and social events just as well. Most wedding planners run those too, and it's one place for all of them.</p>
        </details>
        <details style="border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.14)">
          <summary style="cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 22px 0; font-family: var(--gw-font-display); font-size: clamp(20px, 2.2vw, 25px); font-weight: 500; color: var(--gw-ink)"><h3 style="margin: 0; font: inherit">How does the 14-day free trial work?</h3><span class="gw-faq__icon" aria-hidden="true"></span></summary>
          <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0 0 24px; max-width: 60em">Fourteen days, every feature, no credit card. Build a real event in it — that's the only way to know. There's no free tier after the trial, so if it isn't earning its keep you simply don't continue.</p>
        </details>
        <details style="border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.14)">
          <summary style="cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 22px 0; font-family: var(--gw-font-display); font-size: clamp(20px, 2.2vw, 25px); font-weight: 500; color: var(--gw-ink)"><h3 style="margin: 0; font: inherit">What counts toward my project limit?</h3><span class="gw-faq__icon" aria-hidden="true"></span></summary>
          <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0 0 24px; max-width: 60em">Only <em>active</em> events. Once an event is over you archive it — it stops counting toward your limit but stays fully intact, so last season's timelines, layouts and invoices are still there to look up or copy from. In practice the limit is how many events you're running at once, not how many you've ever run.</p>
        </details>
        <details style="border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.14)">
          <summary style="cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 22px 0; font-family: var(--gw-font-display); font-size: clamp(20px, 2.2vw, 25px); font-weight: 500; color: var(--gw-ink)"><h3 style="margin: 0; font: inherit">Can I import my existing clients and vendors?</h3><span class="gw-faq__icon" aria-hidden="true"></span></summary>
          <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0 0 24px; max-width: 60em">Bring your list and we'll help you get it in during the trial — send it over in whatever shape it's currently in. If you'd rather not hand it off, most solo planners add clients as each event starts and are current within a week.</p>
        </details>
        <details style="border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.14)">
          <summary style="cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 22px 0; font-family: var(--gw-font-display); font-size: clamp(20px, 2.2vw, 25px); font-weight: 500; color: var(--gw-ink)"><h3 style="margin: 0; font: inherit">Do my clients need an account to view timelines and layouts?</h3><span class="gw-faq__icon" aria-hidden="true"></span></summary>
          <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0 0 24px; max-width: 60em">Your couples get their own client portal — but there's no password to set up or remember. You send them a secure <strong style="color: var(--gw-ink); font-weight: 600">magic link</strong>, they tap it, and they're in. It's the same idea as the "email me a login link" button you've used on other sites: one tap, no password to forget. Inside, they can follow timelines and layouts, comment on tasks, and share files. And if you only need someone to <em>see</em> a timeline or layout — a vendor or a venue contact — you can export and send it, with no login at all.</p>
        </details>
        <details style="border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.14)">
          <summary style="cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 22px 0; font-family: var(--gw-font-display); font-size: clamp(20px, 2.2vw, 25px); font-weight: 500; color: var(--gw-ink)"><h3 style="margin: 0; font: inherit">Is there a mobile app?</h3><span class="gw-faq__icon" aria-hidden="true"></span></summary>
          <p style="font-size: 16px; line-height: 1.75; color: var(--gw-muted); margin: 0 0 24px; max-width: 60em">Yes. On iPhone, download it <a href="${APPSTORE}" ${EXT}>on the App Store</a> — real-time notifications, client messages, and your event information with you on the floor. It's the day-of companion to the full app, not a replacement for it. There's an Android version too — email <a href="mailto:support@gatherwise.io">support@gatherwise.io</a> and we'll get you set up.</p>
        </details>
        <details style="border-bottom: 1px solid rgb(var(--gw-ink-rgb) / 0.14)">
          <summary style="cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 20px; padding: 22px 0; font-family: var(--gw-font-display); font-size: clamp(20px, 2.2vw, 25px); font-weight: 500; color: var(--gw-ink)"><h3 style="margin: 0; font: inherit">What happens in my slow season — can I change plans?</h3><span class="gw-faq__icon" aria-hidden="true"></span></summary>
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
<footer class="gw-site-footer">
  <div class="gw-site-footer__inner">
    <div class="gw-site-footer__brand">
      <img loading="lazy" src="${LOGO}" alt="Gatherwise" style="height: 26px; width: auto; display: block; filter: brightness(0) invert(1); opacity: 0.9">
      <p style="font-size: 15px; line-height: 1.65; color: rgb(var(--gw-parchment-rgb) / 0.6); margin: 18px 0 0; max-width: 26em">Event planning software and CRM for planners — solo or with a team. Timelines, seating, guests, vendors, budgets and billing in one place.</p>
    </div>
    <nav aria-label="Product" class="gw-site-footer__nav">
      <h2 style="font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gw-gold); margin: 0 0 4px; font-family: var(--gw-font-body); font-weight: 700">Product</h2>
      <a class="gwv2-footlink" href="#timelines" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Smart timelines</a>
      <a class="gwv2-footlink" href="#layouts" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Seating &amp; layouts</a>
      <a class="gwv2-footlink" href="#sales" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Proposals &amp; invoicing</a>
      <a class="gwv2-footlink" href="#everything" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">All features</a>
      <a class="gwv2-footlink" href="#mobile" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Mobile app</a>
    </nav>
    <nav aria-label="Resources" class="gw-site-footer__nav">
      <h2 style="font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gw-gold); margin: 0 0 4px; font-family: var(--gw-font-body); font-weight: 700">Resources</h2>
      <a class="gwv2-footlink" href="#pricing" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Pricing</a>
      <a class="gwv2-footlink" href="${HELP}" ${EXT} style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Help center</a>
      <a class="gwv2-footlink" href="#faq" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">FAQ</a>
      <a class="gwv2-footlink" href="${DEMO}" ${EXT} style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Book a demo</a>
    </nav>
    <nav aria-label="Company" class="gw-site-footer__nav">
      <h2 style="font-size: 11.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gw-gold); margin: 0 0 4px; font-family: var(--gw-font-body); font-weight: 700">Company</h2>
      <a class="gwv2-footlink" href="${CONTACT_EMAIL}" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Contact</a>
      <a class="gwv2-footlink" href="${LOGIN}" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Log In</a>
      <a class="gwv2-footlink" href="${SIGNUP}" style="font-size: 14.5px; color: rgb(var(--gw-parchment-rgb) / 0.7); text-decoration: none">Start free trial</a>
    </nav>
    <nav aria-label="Legal" class="gw-site-footer__nav">
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
      <ReviewsCarousel />
      <ChecklistAnimationMount />
      <StackAnimationTrigger />
      <VendorAnimationMount />
      <TimelineVideoTrigger />
      <BudgetAnimationMount />
    </>
  );
}
