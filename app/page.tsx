import Image from "next/image";

const TIMELINE_VIDEO =
  "https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1763627239190x690891559915741400/smart-timeline.mp4";
const INVOICE_VIDEO =
  "https://5e364458276059f98e6f71fb28ad5255.cdn.bubble.io/f1763628458293x764750505707090700/invoicing%281%29.mp4";

const plans = [
  {
    name: "Starter",
    price: "$29",
    popular: false,
    features: [
      "15 active projects",
      "Client lead inquiry form",
      "Unlimited Clients",
      "1 Admin & 1 Team Member",
      "1 Questionnaire",
      "Timeline Creation",
      "Task Checklist",
      "Vendor Management",
      "Client Invoicing",
      "Payment Processing",
      "Event Templates",
      "Guest Management",
      "Seating and Layout",
    ],
  },
  {
    name: "Professional",
    price: "$59",
    popular: true,
    features: [
      "50 active projects",
      "Client lead inquiry form",
      "Unlimited Clients",
      "2 Admins & 2 Team Members",
      "3 Questionnaires",
      "Timeline Creation",
      "Task Checklist",
      "Vendor Management",
      "Client Invoicing",
      "Payment Processing",
      "Event Templates",
      "Guest Management",
      "Seating and Layout",
    ],
  },
  {
    name: "Elite",
    price: "$149",
    popular: false,
    features: [
      "Unlimited projects",
      "Client lead inquiry form",
      "Unlimited Clients",
      "Unlimited Admin & Team Members",
      "Unlimited Questionnaires",
      "Timeline Creation",
      "Task Checklist",
      "Vendor Management",
      "Client Invoicing",
      "Payment Processing",
      "Event Templates",
      "Guest Management",
      "Seating and Layout",
    ],
  },
];

function TryLink({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#pricing"
      className={`inline-flex items-center gap-2 text-[15px] font-medium transition-opacity hover:opacity-80 ${
        light ? "text-white" : "text-bronze"
      }`}
    >
      Try it free
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
          light ? "bg-white/15 text-white" : "bg-bronze text-white"
        }`}
        aria-hidden
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6h7M6.5 3l3 3-3 3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}

function PlanIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M14 3.5l1.6 5.2H21l-4.2 3.1 1.6 5.2L14 13.9l-4.4 3.1 1.6-5.2L7 8.7h5.4L14 3.5z"
        fill="#BC8E3F"
      />
      <path
        d="M14 8.2l.9 2.9h3.1l-2.5 1.8.9 2.9-2.4-1.8-2.4 1.8.9-2.9-2.5-1.8h3.1L14 8.2z"
        fill="#E8C878"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-50 border-b border-line/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] w-full max-w-[1180px] items-center justify-between px-5 md:px-8">
          <a
            href="#"
            className="font-serif text-[18px] font-bold tracking-[0.14em] text-navy-deep"
          >
            GATHERWISE
          </a>
          <nav className="hidden items-center gap-8 text-[14px] font-medium text-navy-deep md:flex">
            <a href="#features" className="transition-opacity hover:opacity-70">
              Features
            </a>
            <a href="#pricing" className="transition-opacity hover:opacity-70">
              Pricing
            </a>
            <a href="#demo" className="transition-opacity hover:opacity-70">
              Book Demo
            </a>
          </nav>
          <div className="flex items-center gap-4 text-[14px] font-medium">
            <a
              href="#login"
              className="hidden text-navy-deep transition-opacity hover:opacity-70 sm:inline"
            >
              Log In
            </a>
            <a
              href="#pricing"
              className="rounded-[6px] bg-navy px-4 py-2.5 text-white transition-colors hover:bg-navy-deep"
            >
              Start free trial
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(ellipse 80% 55% at 15% 20%, rgba(243,224,200,0.45), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 10%, rgba(238,242,246,0.9), transparent 55%)",
            }}
          />
          <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-10 px-5 pb-16 pt-12 md:grid-cols-[1.05fr_1fr] md:gap-8 md:px-8 md:pb-24 md:pt-16">
            <div className="animate-fade-up">
              <h1 className="font-serif text-[42px] font-extrabold leading-[1.08] tracking-tight text-navy-deep md:text-[58px]">
                <span className="text-bronze italic">Effortless</span> Event
                Planning Starts Here.
              </h1>
              <p className="mt-5 max-w-[460px] text-[17px] leading-7 text-muted md:text-[18px]">
                All your timelines, vendors, invoices, and clients—organized in
                one powerful platform built just for planners.
              </p>
              <form
                className="mt-8 flex w-full max-w-[460px] flex-col gap-3 sm:flex-row"
                action="#pricing"
              >
                <label className="sr-only" htmlFor="hero-email">
                  Your email
                </label>
                <input
                  id="hero-email"
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="h-12 flex-1 rounded-[6px] border border-line bg-white px-4 text-[15px] text-navy-deep outline-none transition focus:border-bronze"
                />
                <button
                  type="submit"
                  className="h-12 rounded-[6px] bg-bronze-btn px-5 text-[15px] font-medium text-white transition hover:bg-bronze"
                >
                  Start free trial
                </button>
              </form>
            </div>
            <div className="animate-hero-media relative">
              <div className="overflow-hidden rounded-[18px] border border-line shadow-[0_24px_60px_rgba(14,30,47,0.14)]">
                <Image
                  src="/images/hero-product.webp"
                  alt="Gatherwise task management workspace for Jessica & Dylan's Wedding"
                  width={1200}
                  height={900}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="scroll-mt-20 pb-8 pt-8 md:pt-12">
          <div className="mx-auto max-w-[900px] px-5 text-center md:px-8">
            <p className="animate-fade-up text-[12px] font-semibold tracking-[0.18em] text-bronze">
              FEATURES
            </p>
            <h2 className="animate-fade-up-delay mt-3 font-serif text-[34px] font-extrabold leading-[1.12] text-navy-deep md:text-[42px]">
              Smart timelines
            </h2>
            <p className="animate-fade-up-delay-2 mx-auto mt-4 max-w-[560px] text-[17px] leading-7 text-muted">
              Drag-and-drop timelines that keep everyone aligned. Export
              versions for each responsible party in one click.
            </p>
            <div className="mt-5 flex justify-center">
              <TryLink />
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-[980px] px-5 md:px-8">
            <div className="feature-frame overflow-hidden">
              <video
                className="h-auto w-full"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/feature-timeline.png"
              >
                <source src={TIMELINE_VIDEO} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="mx-auto mt-20 grid max-w-[1100px] gap-12 border-t border-line px-5 pt-16 md:grid-cols-2 md:gap-10 md:px-8">
            <article>
              <h3 className="font-serif text-[30px] font-extrabold text-navy-deep md:text-[34px]">
                Client Checklists
              </h3>
              <p className="mt-3 max-w-[380px] text-[16px] leading-7 text-muted">
                Stay on top of every task — with client commenting and easy
                attachments.
              </p>
              <div className="mt-4">
                <TryLink />
              </div>
              <div className="mt-8 overflow-hidden rounded-[8px]">
                <Image
                  src="/images/feature-checklist.png"
                  alt="Client checklist with commenting"
                  width={680}
                  height={400}
                  className="h-auto w-full"
                />
              </div>
            </article>
            <article>
              <h3 className="font-serif text-[30px] font-extrabold text-navy-deep md:text-[34px]">
                Beautiful Layouts
              </h3>
              <p className="mt-3 max-w-[380px] text-[16px] leading-7 text-muted">
                Share clean, modern layouts with vendors and clients in one
                click.
              </p>
              <div className="mt-4">
                <TryLink />
              </div>
              <div className="mt-8 overflow-hidden rounded-[8px]">
                <Image
                  src="/images/feature-layouts.png"
                  alt="Seating and floor plan layouts"
                  width={680}
                  height={400}
                  className="h-auto w-full"
                />
              </div>
            </article>
          </div>

          <div className="mx-auto mt-20 max-w-[900px] border-t border-line px-5 pt-16 text-center md:px-8">
            <h3 className="font-serif text-[30px] font-extrabold text-navy-deep md:text-[36px]">
              Invoices &amp; Payments
            </h3>
            <p className="mx-auto mt-3 max-w-[480px] text-[16px] leading-7 text-muted">
              Send invoices, auto-remind clients, and get paid on time.
            </p>
            <div className="mt-4 flex justify-center">
              <TryLink />
            </div>
            <div className="feature-frame mx-auto mt-10 max-w-[920px]">
              <video
                className="h-auto w-full"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/feature-invoice.png"
              >
                <source src={INVOICE_VIDEO} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="mx-auto mt-20 grid max-w-[1100px] gap-12 border-t border-line px-5 pt-16 md:grid-cols-2 md:gap-10 md:px-8">
            <article>
              <h3 className="font-serif text-[30px] font-extrabold text-navy-deep md:text-[34px]">
                Vendor Management
              </h3>
              <p className="mt-3 max-w-[380px] text-[16px] leading-7 text-muted">
                Add contacts, link budgets, collaborate, and track booking
                status effortlessly.
              </p>
              <div className="mt-4">
                <TryLink />
              </div>
              <div className="mt-8 overflow-hidden rounded-[8px]">
                <Image
                  src="/images/feature-vendors.png"
                  alt="Vendor management table"
                  width={680}
                  height={400}
                  className="h-auto w-full"
                />
              </div>
            </article>
            <article>
              <h3 className="font-serif text-[30px] font-extrabold text-navy-deep md:text-[34px]">
                Budget Management
              </h3>
              <p className="mt-3 max-w-[380px] text-[16px] leading-7 text-muted">
                Track each event category’s budget, actual spend, what’s paid,
                and what’s still due.
              </p>
              <div className="mt-4">
                <TryLink />
              </div>
              <div className="mt-8 overflow-hidden rounded-[8px]">
                <Image
                  src="/images/feature-budget.png"
                  alt="Budget tracking spreadsheet"
                  width={680}
                  height={400}
                  className="h-auto w-full"
                />
              </div>
            </article>
          </div>
        </section>

        {/* Mobile app */}
        <section className="mt-20 bg-navy">
          <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:gap-8 md:px-8 md:py-20">
            <div>
              <h2 className="font-serif text-[34px] font-extrabold leading-[1.15] text-white md:text-[40px]">
                Mobile App - Plan On the Go
              </h2>
              <p className="mt-4 max-w-[420px] text-[16px] leading-7 text-white/80">
                Get notified in real-time, send client messages, and access
                important information on-the-go
              </p>
              <div className="mt-5">
                <TryLink light />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Image
                  src="/images/app-store.png"
                  alt="Download on the App Store"
                  width={132}
                  height={38}
                  className="h-[38px] w-auto"
                />
                <Image
                  src="/images/google-play.png"
                  alt="Get it on Google Play"
                  width={132}
                  height={38}
                  className="h-[38px] w-auto"
                />
              </div>
            </div>
            <div className="relative flex justify-center md:justify-end">
              <Image
                src="/images/feature-mobile.png"
                alt="Gatherwise mobile app screens"
                width={680}
                height={520}
                className="h-auto w-full max-w-[520px]"
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-20 bg-[#fafbfc] py-20">
          <div className="mx-auto max-w-[1180px] px-5 md:px-8">
            <div className="text-center">
              <p className="text-[12px] font-semibold tracking-[0.18em] text-muted-soft">
                PRICING
              </p>
              <h2 className="mt-3 font-serif text-[34px] font-extrabold text-navy-deep md:text-[42px]">
                Simple, transparent pricing
              </h2>
              <p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-7 text-muted">
                Choose the best plan for your team. Pay by the month and cancel
                at any time.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`relative flex flex-col rounded-[20px] border border-line bg-white p-6 shadow-[0_10px_30px_rgba(14,30,47,0.06)] ${
                    plan.popular ? "ring-1 ring-navy/10" : ""
                  }`}
                >
                  {plan.popular ? (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-navy px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-white">
                      MOST POPULAR
                    </div>
                  ) : null}
                  <div className="flex items-start justify-between gap-3 pt-2">
                    <div className="flex items-center gap-3">
                      <PlanIcon />
                      <div>
                        <h3 className="font-serif text-[24px] font-bold text-navy-deep">
                          {plan.name}
                        </h3>
                        <p className="text-[13px] text-muted-soft">
                          billed monthly
                        </p>
                      </div>
                    </div>
                    <p className="text-[28px] font-semibold text-navy-deep">
                      {plan.price}
                    </p>
                  </div>
                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-[14px] leading-5 text-navy-deep/85"
                      >
                        <span
                          className="mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-bronze/15 text-bronze"
                          aria-hidden
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M2 5.2l2 2 4-4"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#demo"
                    className="mt-8 inline-flex h-11 items-center justify-center rounded-[6px] border border-navy-deep/80 text-[15px] font-medium text-navy-deep transition hover:bg-navy hover:text-white"
                  >
                    Sign up
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20">
          <div className="mx-auto max-w-[860px] px-5 text-center md:px-8">
            <p className="text-[12px] font-semibold tracking-[0.18em] text-muted-soft">
              TESTIMONIAL
            </p>
            <h2 className="mt-3 font-serif text-[34px] font-extrabold text-navy-deep md:text-[42px]">
              Why planners choose Gatherwise
            </h2>
            <figure className="mt-12 rounded-[24px] bg-surface-cream px-6 py-10 text-left md:px-12 md:py-12">
              <div className="flex justify-center">
                <Image
                  src="/images/farkas.png"
                  alt="Farkas Events"
                  width={88}
                  height={88}
                  className="h-[88px] w-[88px] rounded-full object-cover"
                />
              </div>
              <blockquote className="mt-8 space-y-4 text-[15px] leading-7 text-muted md:text-[16px]">
                <p>
                  Gatherwise has been an absolute game changer for my wedding
                  planning business. As a solo planner managing multiple
                  couples, having a platform that’s this easy to use—and this
                  powerful—has made a huge difference in how I stay organized
                  and serve my client! What really sets Gatherwise apart is how
                  seamlessly it connects everything in one place. I can link
                  budgets, tasks, and vendors together for each couple, and my
                  clients can log in, collaborate, and make updates on their end
                  too. It keeps everyone aligned without the usual
                  back-and-forth, and the drag-and-drop timeline is truly a game
                  changer for keeping plans flexible and clear!
                </p>
                <p>
                  Beyond the software itself, the owners Alex and Stephanie are
                  incredible to work with! They’re responsive, kind, and
                  genuinely invested in supporting their users. Every question
                  I’ve had has been answered quickly and thoughtfully, which
                  means a lot as a small business owner relying on this tool
                  day-to-day! Overall, Gatherwise is an incredibly powerful and
                  useful platform that has made managing multiple weddings not
                  just easier, but far more efficient!
                </p>
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-semibold text-navy-deep">Paige Farkas</p>
                <p className="text-[14px] text-muted">Owner &amp; Lead Planner</p>
                <p className="text-[14px] text-muted">Farkas Events</p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Final CTA */}
        <section id="demo" className="pb-16 pt-4">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8">
            <div className="rounded-[28px] bg-navy px-6 py-14 text-center md:px-16 md:py-16">
              <h2 className="font-serif text-[32px] font-extrabold leading-[1.15] text-white md:text-[42px]">
                Trusted by Planners across the U.S. and Canada
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-7 text-white/80">
                Join planners across the U.S. and Canada who trust Gatherwise to
                impress clients, stay organized, and save hours.
              </p>
              <form
                className="mx-auto mt-8 flex w-full max-w-[480px] flex-col gap-3 sm:flex-row"
                action="#pricing"
              >
                <label className="sr-only" htmlFor="cta-email">
                  Your email
                </label>
                <input
                  id="cta-email"
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="h-12 flex-1 rounded-[6px] border-0 bg-white px-4 text-[15px] text-navy-deep outline-none"
                />
                <button
                  type="submit"
                  className="h-12 rounded-[6px] bg-bronze-btn px-5 text-[15px] font-medium text-white transition hover:bg-bronze"
                >
                  Start 14-day trial
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-8">
        <p className="text-center text-[13px] text-muted-soft">
          © {new Date().getFullYear()} Gatherwise, Inc.
        </p>
        <div id="login" className="sr-only">
          Log in
        </div>
      </footer>
    </div>
  );
}
