/* Gatherwise ad landing pages — shared behaviour.
   These pages are static HTML outside the Next layout, so this file does what
   app/analytics.tsx does for the rest of gatherwise.io (keep the IDs in sync):
   1. Loads the shared cookie-consent script (public/consent/gw-consent.js) and starts each
      vendor only once consent allows it:
        analytics  -> GA4 (via gtag) and PostHog
        marketing  -> Google Ads (via gtag) and Meta Pixel
      Opt-in regions wait for Accept, GPC keeps marketing off, Google runs in Consent Mode v2,
      and withdrawing consent reloads the page.
   2. Carries utm_* / fbclid from the ad click through to the app signup link.
   3. Fires ViewContent on load and Lead on any "Start free trial" click (tagged with the page's concept).
   4. Shows the sticky mobile CTA once the hero CTA scrolls out of view. */
(function () {
  var GA4_ID = 'G-NMZZR1RQSF';
  var ADS_ID = 'AW-16809052619';
  var META_PIXEL_ID = '1140353341133768';
  var POSTHOG_KEY = 'phc_L4ZLdnUxdhDfrgkQZFOIo4HvGDzt79BwYamAlURKXOm';
  var POSTHOG_HOST = 'https://us.i.posthog.com';
  var concept = document.body.getAttribute('data-concept') || 'lp';

  function addScript(src) {
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.head.appendChild(s);
    return s;
  }

  var gtagReady = false;
  function startGoogle(s) {
    if (!gtagReady) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      gtag('consent', 'default', {
        ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
        analytics_storage: 'denied', wait_for_update: 500
      });
      gtag('js', new Date());
      gtagReady = true;
      addScript('https://www.googletagmanager.com/gtag/js?id=' + ADS_ID);
    }
    var ads = s.marketing ? 'granted' : 'denied';
    gtag('consent', 'update', {
      ad_storage: ads, ad_user_data: ads, ad_personalization: ads,
      analytics_storage: s.analytics ? 'granted' : 'denied'
    });
    if (s.analytics) gtag('config', GA4_ID, { content_group: 'lp_' + concept });
    if (s.marketing) gtag('config', ADS_ID);
  }

  var posthogLoaded = false;
  function startPostHog() {
    if (posthogLoaded) return;
    posthogLoaded = true;
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister identify alias reset set_config opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_distinct_id startSessionRecording stopSessionRecording".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init(POSTHOG_KEY, { api_host: POSTHOG_HOST, defaults: '2025-05-24', person_profiles: 'identified_only' });
    posthog.register({ lp: concept });
  }

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
  var last = null;
  function applyConsent(s) {
    if (!s) return;
    // Withdrawal: third-party tags can't be unloaded in place, so reload to drop them.
    if (last && ((last.analytics && !s.analytics) || (last.marketing && !s.marketing))) {
      location.reload();
      return;
    }
    last = s;
    if (s.analytics || s.marketing) startGoogle(s);
    if (s.marketing) startPixel();
    if (s.analytics) startPostHog();
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

  // Hero video: the page ships only the poster. Clicking it opens the YouTube player
  // (privacy-enhanced domain, so no YouTube cookies until play) large in a dark overlay,
  // so the page around it drops away. Close (×, Esc, backdrop) removes the player, which
  // stops playback, and puts focus back on the play button.
  var reel = document.querySelector('.reel[data-yt]');
  var play = reel && reel.querySelector('.reel-play');
  var player = null;
  function closePlayer() {
    if (!player) return;
    player.remove();
    player = null;
    document.body.classList.remove('playing');
    document.removeEventListener('keydown', onKey);
    play.focus();
  }
  function onKey(e) { if (e.key === 'Escape') closePlayer(); }
  function openPlayer() {
    if (player) return;
    var f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + reel.getAttribute('data-yt') +
      '?autoplay=1&rel=0&iv_load_policy=3&playsinline=1&start=' + (reel.getAttribute('data-start') || 0);
    f.title = 'Gatherwise overview';
    f.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    f.allowFullscreen = true;
    var frame = document.createElement('div');
    frame.className = 'player-frame';
    frame.appendChild(f);
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'player-close';
    close.setAttribute('aria-label', 'Close video');
    close.textContent = '×';
    close.addEventListener('click', closePlayer);
    player = document.createElement('div');
    player.className = 'player';
    player.setAttribute('role', 'dialog');
    player.setAttribute('aria-modal', 'true');
    player.setAttribute('aria-label', 'Gatherwise overview video');
    player.appendChild(close);
    player.appendChild(frame);
    player.addEventListener('click', function (e) { if (e.target === player) closePlayer(); });
    document.body.appendChild(player);
    document.body.classList.add('playing');
    document.addEventListener('keydown', onKey);
    close.focus();
    if (window.fbq) fbq('trackCustom', 'VideoPlay', { content_name: concept });
    if (window.gtag) gtag('event', 'video_start', { video_title: 'Gatherwise overview', lp: concept });
    if (window.posthog) posthog.capture('lp_video_play', { lp: concept });
  }
  if (play) reel.addEventListener('click', openPlayer);

  // Sticky mobile CTA
  var sticky = document.querySelector('.sticky'), hero = document.querySelector('.hero .btn');
  if (sticky && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      sticky.classList.toggle('on', !es[0].isIntersecting && es[0].boundingClientRect.top < 0);
    }).observe(hero);
  }
})();
