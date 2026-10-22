/* Gatherwise ad landing pages — shared behaviour.
   1. Meta Pixel: set META_PIXEL_ID below (Events Manager → Data sources). Empty = pixel off.
      The pixel only loads once the shared cookie-consent script (public/consent/gw-consent.js,
      the same one the rest of gatherwise.io uses via app/analytics.tsx) allows marketing:
      opt-in regions wait for Accept, GPC keeps it off. Withdrawing consent reloads the page.
   2. Carries utm_* / fbclid from the ad click through to the app signup link.
   3. Fires ViewContent on load and Lead on any "Start free trial" click (tagged with the page's concept).
   4. Shows the sticky mobile CTA once the hero CTA scrolls out of view. */
(function () {
  var META_PIXEL_ID = ''; // e.g. '123456789012345'
  var concept = document.body.getAttribute('data-concept') || 'lp';

  var pixelLoaded = false;
  function startPixel() {
    if (pixelLoaded || !META_PIXEL_ID) return;
    pixelLoaded = true;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
    fbq('track', 'ViewContent', { content_name: concept, content_category: 'ad_landing_page' });
  }
  function track(name, params) { if (window.fbq) fbq('track', name, params); }

  // Cookie consent (shows the site banner; same config as app/analytics.tsx)
  window.gwConsentConfig = window.gwConsentConfig || {
    mode: 'site', endpoint: location.origin + '/api/consent', policyUrl: '/cookies'
  };
  var lastMarketing = null;
  function applyConsent(s) {
    if (!s) return;
    if (lastMarketing && !s.marketing) { location.reload(); return; }
    lastMarketing = s.marketing;
    if (s.marketing) startPixel();
  }
  function wireConsent() {
    var c = window.gwConsent;
    if (!c) return;
    c.ready(applyConsent);
    c.onChange(applyConsent);
  }
  if (window.gwConsent) wireConsent();
  else {
    var cs = document.createElement('script');
    cs.src = '/consent/gw-consent.js';
    cs.async = true;
    cs.onload = wireConsent;
    document.head.appendChild(cs);
  }

  // UTM + fbclid passthrough to signup links
  var keep = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'];
  var incoming = new URLSearchParams(location.search);
  document.querySelectorAll('a[data-signup]').forEach(function (a) {
    try {
      var url = new URL(a.href);
      keep.forEach(function (k) { if (incoming.get(k)) url.searchParams.set(k, incoming.get(k)); });
      if (!url.searchParams.get('utm_content')) url.searchParams.set('utm_content', concept);
      url.searchParams.set('lp', concept);
      a.href = url.toString();
    } catch (e) {}
    a.addEventListener('click', function () {
      track('Lead', { content_name: concept, content_category: 'start_trial_click' });
    });
  });
  document.querySelectorAll('a[data-call]').forEach(function (a) {
    a.addEventListener('click', function () { track('Contact', { content_name: concept }); });
  });

  // Sticky mobile CTA
  var sticky = document.querySelector('.sticky'), hero = document.querySelector('.hero .btn');
  if (sticky && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      sticky.classList.toggle('on', !es[0].isIntersecting && es[0].boundingClientRect.top < 0);
    }).observe(hero);
  }
})();
