// Generates design/home.html, solution.html and contact.html from shared parts.
const fs = require('fs'), path = require('path');
const D = 'C:/Users/learn/OneDrive/Desktop/Vangurad/project-docs/design';
const spotsPos = JSON.parse(fs.readFileSync(D + '/assets/renders/plant-hotspots.json', 'utf8'));
const I = {
  phone: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M21 16.5v3a1.5 1.5 0 0 1-1.6 1.5A17 17 0 0 1 3 4.6 1.5 1.5 0 0 1 4.5 3h3l1.5 4-2 1.6a12 12 0 0 0 7.9 7.9l1.6-2z"/></svg>`,
  mail: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 6h18v12H3z"/><path d="m3 7 9 6.5L21 7"/></svg>`,
  pin: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>`,
  arrow: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>`,
  chev: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`,
  menu: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  check: s => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m5 12.500 4.500 4.500L19 7.500"/></svg>`,
};
const arr = `<span class="arr">${I.arrow(20)}</span>`;
const logos = `<div class="logos"><img src="assets/logos/adnoc.webp" alt="ADNOC" width="130" height="96" loading="lazy"><img class="tall" src="assets/logos/cnpc.webp" alt="CNPC" width="96" height="96" loading="lazy"><img src="assets/logos/khalifa.webp" alt="Khalifa University" width="266" height="96" loading="lazy"><img class="sapco" src="assets/logos/sapco.webp" alt="SAPCO" width="96" height="96" loading="lazy"></div>`;

const shell = ({ title, desc, page, bar, body, active }) => `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="preload" href="assets/fonts/inter-latin-wght.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/site.css">
<link rel="icon" href="assets/logos/vanguard-logo.svg">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr">
 <div class="wrap">
  <a class="brand" href="home.html"><img src="assets/logos/vanguard-lockup.svg" alt="Vanguard Technology" width="214" height="52"></a>
  <nav class="nav" aria-label="Main">
   <a href="#about">About</a><a href="solution.html"${active === 'solutions' ? ' aria-current="page"' : ''}>Solutions</a><a href="#industries">Industries</a><a href="#capabilities">Capabilities</a>
  </nav>
  <a class="phone" href="tel:+97126268001">${I.phone(18)}<span>+971 2 626 8001</span></a>
  ${page === 'contact' ? '' : '<a class="btn btn-p btn-sm" href="contact.html">Start a consultation</a>'}
  <button class="menu-btn" type="button" aria-expanded="false" aria-label="Menu">${I.menu(24)}</button>
 </div>
 <nav class="mnav" aria-label="Mobile"><a href="#about">About</a><a href="solution.html">Solutions</a><a href="#industries">Industries</a><a href="#capabilities">Capabilities</a><a href="contact.html">Contact</a></nav>
</header>
<main id="main">
${body}
</main>
<footer class="ftr on-maroon">
 <div class="wrap">
  <div class="ftr-top">
   <div><img class="ftr-logo" src="assets/logos/vanguard-lockup-white.svg" alt="Vanguard Technology" width="214" height="52" loading="lazy">
    <p><a href="tel:+97126268001">+971 2 626 8001</a><br><a href="mailto:info@vanguardgcc.com">info@vanguardgcc.com</a></p>
    <address>403, Cuba Cafe Building, PO Box 36864, Tourist Club Area, Al Zahiya Zone, Abu Dhabi, UAE</address></div>
   <div><h2>Company</h2><ul><li><a href="#about">About</a></li><li><a href="#capabilities">Capabilities</a></li><li><a href="#group">Our Group</a></li><li><a href="#careers">Careers</a></li><li><a href="contact.html">Contact</a></li><li class="mob"><a href="solution.html">Solutions</a></li><li class="mob"><a href="#i">Industries</a></li></ul></div>
   <div class="desk"><h2>Solutions</h2><ul>${solutions.map(s => `<li><a href="${s[3]}">${s[1]}</a></li>`).join('')}</ul></div>
   <div class="desk"><h2>Industries</h2><ul>${industries.map(s => `<li><a href="#i">${s[1]}</a></li>`).join('')}</ul></div>
  </div>
  <div class="ftr-news">
   <div><h2 style="margin-bottom:4px">Newsletter</h2><p style="color:var(--inv-muted)">Updates from Vanguard Technology by email.</p></div>
   <form class="news-form" onsubmit="return false"><div><label class="vh" for="news-${page}">Email address</label><input id="news-${page}" type="email" placeholder="Email address" autocomplete="email"></div><button class="btn btn-g" type="submit">Subscribe</button>
    <label class="ck"><input type="checkbox"><span>I agree to receive the Vanguard Technology newsletter by email. I can unsubscribe at any time. See the <a href="#privacy" style="color:var(--paper);text-decoration:underline">Privacy Policy</a>.</span></label></form>
  </div>
  <div class="ftr-legal"><span>© 2026 Vanguard Technology. All rights reserved.</span><ul><li><a href="#privacy">Privacy Policy</a></li><li><a href="#terms">Terms of Use</a></li><li><a href="?cookie=1">Cookie settings</a></li></ul></div>
 </div>
</footer>
<div class="pbar"><a class="btn btn-s" href="tel:+97126268001">${I.phone(18)}Call</a>${bar}</div>
<aside class="cookie" aria-label="Cookies" hidden><p>We would like to use Google Analytics and Microsoft Clarity to understand how this site is used. Clarity can record how you move through pages. The site works the same if you decline. See our <a href="#privacy">Privacy Policy</a>.</p><div class="actions"><button class="btn btn-s btn-sm" type="button">Accept analytics</button><button class="btn btn-s btn-sm" type="button">Decline analytics</button><a class="tlink" href="#settings" style="font-size:15px">Cookie settings</a></div></aside>
<script src="assets/site.js" defer></script>
</body>
</html>
`;

const solutions = [
  ['system-integration', 'System Integration', 'We implement SCADA, communications and control systems as complete solutions.', '#s'],
  ['plc-scada', 'PLC/SCADA Design &amp; Validation', 'We design and validate PLC programs and implement SCADA systems.', 'solution.html'],
  ['field-services', 'Field Services &amp; Annual Maintenance Contracts', 'We offer annual maintenance contracts, field services, retrofit work and remote support.', '#s'],
  ['control-instrumentation', 'Control &amp; Instrumentation Engineering', 'Our engineers work in control systems, electrical engineering and instrumentation engineering.', '#s'],
  ['supply-installation', 'Supply &amp; Field Installation', 'We supply automation instrumentation and electrical products, and install them in the field.', '#s'],
  ['turnkey', 'Turnkey Projects', 'Our scope runs from engineering and supply through field installation, project management and maintenance.', '#s'],
  ['project-management', 'Project Management', 'We offer project management, project support and technical resources.', '#s'],
  ['it-consultancy', 'IT Consultancy', 'We offer IT consultancy alongside our automation services.', '#s'],
  ['audio-visual', 'Audio/Visual Integration', 'We offer audio/visual integration for businesses, entertainment venues, educational institutions and smart homes.', '#s'],
];
const industries = [
  ['oil-gas', 'Oil &amp; Gas', 'SCADA, communications and control systems, with instrumentation and field installation.', 'Refinery columns and process pipework'],
  ['water', 'Water &amp; Wastewater', 'SCADA and control systems, with PLC programs and maintenance.', 'Aerial view of round and rectangular treatment tanks'],
  ['district-cooling', 'District Cooling', 'Control systems and SCADA for plants, with retrofit and annual maintenance contracts.', 'Rows of large outdoor cooling units'],
  ['power', 'Power &amp; Infrastructure', 'SCADA and control systems, electrical installation and project management.', 'Industrial plant with tall striped stacks'],
  ['hvac', 'HVAC &amp; Building Management Systems', 'HVAC control and integrated building and energy management systems.', 'Rooftop air conditioning units in rows'],
  ['safety', 'Safety Instrumented Systems', 'Our control, electrical and instrumentation engineers work on these systems.', 'Control panel with coloured push buttons'],
];
const hotspots = [
  ['Oil &amp; Gas', 'Oil and gas field sites can cover large areas. We implement SCADA, communications and control systems, with PLC programs, instrumentation, electrical products and field installation.'],
  ['Water &amp; Wastewater', 'Water and wastewater sites are widely spread. We implement SCADA and control systems, design PLC programs and support systems through field services and maintenance contracts.'],
  ['District Cooling', 'Chilled water return temperature affects pumping and chiller operation. Our control and SCADA systems serve district cooling plants, with retrofit, maintenance and field services support.'],
  ['Power &amp; Infrastructure', 'Power and infrastructure projects bring many systems and contractors together. We integrate SCADA, communications and control systems, and provide electrical installation, project management and maintenance.'],
  ['HVAC &amp; Building Management Systems', 'Building performance drifts as sensors age and overrides remain in place. We offer HVAC control, integrated building and energy management systems and annual maintenance contracts.'],
  ['Safety Instrumented Systems', 'Safety systems depend on controlled bypasses, proof testing and records. Our control, instrumentation and electrical engineers work on safety instrumented systems. Tell us your requirements.'],
];
const plant = (sel = 0) => `<div class="plant-head"><h2>From field instruments to SCADA</h2><p class="lead">Select an area of this illustrative plant to see the work we offer there.</p></div>
 <div class="plant-grid" data-plant="${sel}">
  <div class="plant-stage">
   <picture><source media="(max-width:767px)" srcset="assets/renders/plant-780.webp"><img src="assets/renders/plant-1400.webp" alt="Illustrative 3D model of a generic site with process columns and a flare stack, treatment tanks, cooling towers, fenced transformers, an office building with rooftop units and a valve group." width="1400" height="933" loading="lazy"></picture>
   <span class="badge badge-gold">Illustrative model</span>
   ${spotsPos.map(([x, y], i) => `<button class="spot" type="button" style="left:${x}%;top:${y}%" aria-label="${hotspots[i][0].replace('&amp;', 'and')}" aria-pressed="false"><span>${i + 1}</span></button>`).join('\n   ')}
  </div>
  <div>
   <div class="plant-list">${hotspots.map(([t, c], i) => `<button type="button" data-t="${t}" data-c="${c}" aria-current="false"><i>${i + 1}</i>${t}</button>`).join('')}</div>
   <div class="plant-text" aria-live="polite"><p class="vh" id="plant-title"></p><p id="plant-copy"></p><a class="tlink" id="plant-link" href="#i">See this industry ${I.arrow(20)}</a></div>
  </div>
 </div>`;

// HOME
const home = `
<section class="hero"><div class="wrap grid12">
 <div class="hero-copy">
  <p class="eyebrow">SCADA. Control. Instrumentation.</p>
  <h1>Industrial automation and system&nbsp;integration for the UAE</h1>
  <p class="lead">Vanguard Technology is an industrial automation company in Abu Dhabi, delivering SCADA and control systems for oil and gas, water, district cooling, power and infrastructure.</p>
  <div class="actions"><a class="btn btn-p no-phone" href="contact.html">Start a consultation</a><a class="btn btn-s" href="solution.html">Explore solutions</a></div>
 </div>
 <figure class="hero-render">
  <picture><source media="(max-width:767px)" srcset="assets/renders/hero-780.webp"><img src="assets/renders/hero-1400.webp" alt="Illustrative 3D model of a generic control system: process vessels and pipework, field instruments, PLC cabinets and a SCADA desk." width="1400" height="1027" fetchpriority="high"></picture>
  <span class="badge badge-gold">Illustrative model</span>
 </figure>
</div></section>

<section class="proof" aria-label="Key facts and partners"><div class="wrap">
 <ul class="proof-row">
  <li>Abu Dhabi based</li><li>End-to-end delivery</li><li>24/7 support</li><li>Free consultations</li>
 </ul>
</div></section>
<section class="partners-sec"><div class="wrap"><div class="partners"><span class="small">Our Partners</span>${logos}</div></div></section>

<section class="sec" style="padding-top:var(--s8)"><div class="wrap grid12">
 <div class="sol-side"><h2>Our solutions</h2><p>We deliver complete automation systems, from SCADA and PLC programs to instrumentation, electrical work and maintenance. We use proven technologies and a practical approach. Choose a solution to see what it covers.</p><a class="tlink" href="solution.html">View all solutions ${I.arrow(20)}</a></div>
 <div class="sol-list">${solutions.map(([ic, t, d, h]) => `<a class="sol-item" href="${h}"><img src="assets/renders/icon-${ic}.webp" alt="" width="64" height="64" loading="lazy"><span><span class="h5">${t}</span><span class="d">${d}</span></span>${arr}</a>`).join('')}</div>
</div></section>

<section class="sec stone" id="industries"><div class="wrap">
 <div class="head-row"><div><h2>Industries we serve</h2><p>We work in oil and gas, power, water and infrastructure. Most of our systems control water and wastewater, district cooling plants, process industry, power and infrastructure projects. Choose your sector to see what we offer.</p></div><a class="tlink" href="#i" style="flex:none">View all industries ${I.arrow(20)}</a></div>
 <div class="ind-grid">${industries.map(([p, t, d, alt]) => `<a class="ind" href="#i"><figure><img src="assets/photos/${p}.webp" srcset="assets/photos/${p}-420.webp 420w, assets/photos/${p}.webp 840w" sizes="(max-width:767px) 50vw, (max-width:1023px) 50vw, 420px" alt="${alt}" width="840" height="560" loading="lazy"></figure><h3>${t}${arr}</h3><p>${d}</p></a>`).join('')}</div>
 <p class="caption photo-note">Photos are illustrative.</p>
</div></section>

<section class="sec plant-sec"><div class="wrap">${plant(0)}</div></section>

<section class="sec" style="padding-bottom:var(--s9)"><div class="wrap">
 <div class="head"><h2>How we work</h2></div>
 <ol class="steps">
  <li><b>1</b><span class="h5">Consult</span><p>Tell us your sector, site and scope. Consultations are free.</p></li>
  <li><b>2</b><span class="h5">Design</span><p>We design the control, electrical and instrumentation systems and validate the PLC programs.</p></li>
  <li><b>3</b><span class="h5">Supply</span><p>We supply the automation instrumentation and electrical products your project needs.</p></li>
  <li><b>4</b><span class="h5">Install</span><p>We install the system in the field.</p></li>
  <li><b>5</b><span class="h5">Maintain</span><p>We support the system through annual maintenance contracts, field services and retrofits.</p></li>
 </ol>
 <a class="btn btn-p" href="contact.html">Start a consultation</a>
</div></section>

<section class="sec why on-maroon"><div class="wrap grid12">
 <div class="why-head"><h2>Why Vanguard</h2></div>
 <ul class="why-list">
  <li><span class="h6">End-to-end delivery</span><p>We cover engineering, supply, installation, project management and maintenance.</p></li>
  <li><span class="h6">Proven technologies</span><p>We take a practical approach to SCADA, communications and control.</p></li>
  <li><span class="h6">Engineers across disciplines</span><p>Our engineers work in control systems, electrical and instrumentation.</p></li>
  <li><span class="h6">Support after installation</span><p>We offer annual maintenance contracts, field services and 24/7 support.</p></li>
  <li><span class="h6">Based in Abu Dhabi</span><p>We are based in Abu Dhabi and serve the UAE, including Dubai.</p></li>
 </ul>
</div></section>

<section class="sec" id="capabilities"><div class="wrap grid12 cap">
 <div class="cap-body"><h2>Capabilities</h2><p>Our team includes controls engineers, designers, programmers and support staff. We offer system design, integration, turnkey projects and field services.</p><p>Preparing a shortlist? Ask us for the company documents your prequalification process needs.</p><div class="actions" style="align-items:center;gap:var(--s5)"><a class="btn btn-s" href="contact.html?request=Company%20documents">Request company documents</a><a class="tlink" href="#capabilities">View capabilities ${I.arrow(20)}</a></div></div>
 <figure class="cap-photo"><img src="assets/photos/pipework.webp" alt="Black and white view of insulated process pipework and valves" width="900" height="700" loading="lazy"><figcaption class="caption">Illustrative photo</figcaption></figure>
</div></section>

<section class="band on-maroon"><div class="wrap"><div><h2>Tell us about your system</h2><p style="margin:0">Start with a free consultation. Share your sector, site and scope.</p></div><div class="actions"><a class="btn btn-g" href="contact.html">Start a consultation</a><a class="btn btn-i" href="tel:+97126268001">Call +971 2 626 8001</a></div></div></section>
`;
fs.writeFileSync(D + '/home.html', shell({ title: 'Industrial Automation: Abu Dhabi, Dubai &amp; UAE | Vanguard', desc: 'Vanguard Technology is an industrial automation company in Abu Dhabi. SCADA, control systems and maintenance for industry and infrastructure in the UAE.', page: 'home', bar: '<a class="btn btn-p" href="contact.html">Start a consultation</a>', body: home }));

// SOLUTION
const faq = (q, a, open) => `<details${open ? ' open' : ''}><summary>${q}${I.chev(24)}</summary><p>${a}</p></details>`;
const solution = `
<section class="sol-hero"><div class="wrap">
 <nav class="crumbs" aria-label="Breadcrumb"><a href="home.html">Home</a><i aria-hidden="true">/</i><a href="#s">Solutions</a><i aria-hidden="true">/</i><span>PLC/SCADA Design &amp; Validation</span></nav>
 <div class="grid12">
 <div class="sol-hero-copy">
    <h1>PLC and SCADA design and validation</h1>
  <p class="lead">We design and validate PLC programs and implement SCADA, communications and control systems. We use proven technologies and a practical approach.</p>
  <div class="actions"><a class="btn btn-p no-phone" href="contact.html?request=Project%20enquiry&amp;system=SCADA">Discuss your SCADA scope</a><a class="btn btn-s" href="#i">See oil and gas</a></div>
  <div class="served"><span class="small">Industries served</span><ul class="served-list">${['Oil and gas', 'Water and wastewater', 'District cooling', 'Power and infrastructure'].map(x => `<li><a href="#i">${x}${arr}</a></li>`).join('')}</ul></div>
 </div>
 <figure class="sol-hero-render"><picture><source media="(max-width:767px)" srcset="assets/renders/sol-720.webp"><img src="assets/renders/sol-1100.webp" alt="Illustrative 3D model of PLC cabinets connected through field instruments and cable trays to a SCADA desk" width="1100" height="858" fetchpriority="high"></picture><span class="badge badge-gold">Illustrative model</span></figure>
 </div>
</div></section>

<section class="sec" style="padding-top:var(--s8)"><div class="wrap grid12 deliver">
 <figure class="deliver-photo"><img src="assets/photos/panel-testing.webp" alt="Gloved hand testing wired contactors in an electrical panel" width="1000" height="760" loading="lazy"><figcaption class="caption">Illustrative photo</figcaption></figure>
 <div class="deliver-body"><h2>What we deliver</h2><ul class="checks">${['Control system design', 'PLC program development', 'PLC program validation', 'SCADA implementation', 'Communications for SCADA and control systems', 'Retrofit services'].map(x => `<li>${I.check(24)}${x}</li>`).join('')}</ul></div>
</div></section>

<section class="sec plant-sec"><div class="wrap">${plant(0)}</div></section>

<section class="sec"><div class="wrap">
 <div class="head"><h2>How we work</h2></div>
 <ol class="steps three">
  <li><b>1</b><span class="h5">Define the system.</span><p>Share your process, site, platform and control requirements.</p></li>
  <li><b>2</b><span class="h5">Design and program.</span><p>We design the control system and develop the PLC programs.</p></li>
  <li><b>3</b><span class="h5">Validate and implement.</span><p>We validate the PLC programs and implement the system.</p></li>
 </ol>
</div></section>

<section class="sec"><div class="wrap grid12 faq-grid">
 <div class="head"><h2>FAQs</h2></div>
 <div class="faq">
  ${faq('Which PLC and SCADA platforms do you work with?', 'Tell us which platform your site runs on. We will confirm how we can support it.', true)}
  ${faq('Can you work with an existing SCADA system?', 'Our services include retrofit work. Share details of your current system so we can review it.')}
  ${faq('Which standards apply to my project?', 'See "Industry standards for this work" on our <a href="#about">About page</a>, and ask us which apply. We do not claim certification against them.')}
 </div>
</div></section>

<section class="sec stone" style="padding-block:var(--s8)"><div class="wrap grid12">
 <div class="trust-left"><span class="small" style="font-weight:600">Our Partners</span>${logos}</div>
 <div class="trust-right"><p class="h6" style="color:var(--m900);margin-bottom:var(--s2)">Based in Abu Dhabi</p><p style="margin-bottom:var(--s2)">We are based in Abu Dhabi and serve the UAE, including Dubai.</p>
 <ul class="contact-list"><li>${I.phone(20)}<a href="tel:+97126268001">+971 2 626 8001</a></li><li>${I.mail(20)}<a href="mailto:info@vanguardgcc.com">info@vanguardgcc.com</a></li></ul></div>
</div></section>

<section class="band on-maroon"><div class="wrap"><div><h2>Tell us which platform your site runs on</h2><p style="margin:0">We will confirm how we can support it.</p></div><div class="actions"><a class="btn btn-g" href="contact.html?request=Project%20enquiry&amp;system=SCADA">Discuss your SCADA scope</a><a class="btn btn-i" href="contact.html?request=Company%20documents">Request company documents</a></div></div></section>
`;
fs.writeFileSync(D + '/solution.html', shell({ title: 'PLC &amp; SCADA Design and Validation, UAE | Vanguard', desc: 'PLC and SCADA system design and validation in Abu Dhabi. We implement SCADA, communications and control systems for oil and gas, water and power in the UAE.', page: 'solution', active: 'solutions', bar: '<a class="btn btn-p" href="contact.html?request=Project%20enquiry&amp;system=SCADA">Discuss your SCADA scope</a>', body: solution }));

// CONTACT
const opts = a => a.map(o => `<option>${o}</option>`).join('');
const fld = (id, name, label, ctrl, err, opt = {}) => {
  const req = opt.optional ? '' : ' required', cls = opt.full ? 'field f-full' : 'field', e = err ? ` data-err="${err}"` : '';
  const c = ctrl === 'select' ? `<select id="f-${id}" name="${name}"${req}${e}><option value="">Select</option>${opts(opt.options)}</select>` : ctrl === 'textarea' ? `<textarea id="f-${id}" name="${name}"${req}${e}${opt.help ? ` aria-describedby="h-${id}"` : ''}></textarea>` : `<input id="f-${id}" name="${name}" type="${ctrl}"${req}${e}${opt.auto ? ` autocomplete="${opt.auto}"` : ''}${opt.help ? ` aria-describedby="h-${id}"` : ''}>`;
  return `<div class="${cls}"><label for="f-${id}">${label}</label>${c}${opt.help ? `<div class="help" id="h-${id}">${opt.help}</div>` : ''}${opt.extra || ''}</div>`;
};
const contact = `
<section class="c-hero"><div class="wrap"><h1>Start a consultation</h1><p class="lead">Tell us about your site, system and scope. Consultations are free. Use the form, or call or email us directly.</p></div></section>
<section class="c-main"><div class="wrap grid12">
 <div class="c-form">
  <form id="enquiry" novalidate>
   <h2>Send your enquiry</h2><p class="small">All fields are required unless marked optional.</p>
   <div class="msg msg-err" id="err-sum" tabindex="-1" hidden><strong>Check these details</strong><p class="small" style="color:inherit">Correct the fields below, then send your enquiry again.</p><ul></ul></div>
   <fieldset><legend>Your request</legend><div class="fields">
    ${fld('request', 'request', 'What do you need?', 'select', 'Choose what you need.', { full: 1, options: ['Project enquiry', 'Maintenance or field support', 'Supply or installation quote', 'Company documents', 'Other'], help: 'Choose the closest match.', extra: '<div class="help" id="request-pre" hidden>Selected from the page you visited. You can change it.</div><div class="help" id="docs-help" hidden>Tell us which documents your prequalification process needs.</div><div class="help" id="job-help" hidden>Applying for a job? Email your CV to info@vanguardgcc.com.</div>' })}
    ${fld('scope', 'scope', 'What is your scope?', 'textarea', 'Describe the scope you need.', { full: 1, help: 'Describe the work you need, such as an upgrade, a supply package or a maintenance contract.' })}
   </div></fieldset>
   <fieldset><legend>About your site</legend><div class="fields">
    ${fld('sector', 'sector', 'Sector', 'select', 'Choose a sector.', { options: ['Oil and gas', 'Water and wastewater', 'District cooling', 'Power', 'Infrastructure', 'HVAC and building management systems', 'Other'], extra: '<div class="help" id="sector-pre" hidden>Selected from the page you visited. You can change it.</div>' })}
    ${fld('system', 'system', 'System type', 'select', 'Choose a system type, or choose &quot;Not sure&quot;.', { options: ['SCADA', 'PLC and control systems', 'Communications', 'Instrumentation', 'Electrical and field installation', 'HVAC control', 'Building and energy management', 'Safety instrumented systems', 'Condition monitoring', 'IT consultancy', 'Audio/visual', 'Not sure'], help: 'Choose the main system.', extra: '<div class="help" id="system-pre" hidden>Selected from the page you visited. You can change it.</div>' })}
    ${fld('location', 'location', 'Site or project location', 'text', 'Enter the site or project location.', { help: 'City or area, and country.' })}
    ${fld('stage', 'stage', 'Project stage', 'select', 'Choose a project stage, or choose &quot;Not sure&quot;.', { options: ['Early planning', 'Design', 'Tender', 'Installation', 'Existing system in operation', 'Not sure'] })}
   </div></fieldset>
   <fieldset><legend>About you</legend><div class="fields">
    ${fld('name', 'name', 'Your name', 'text', 'Enter your name.', { auto: 'name' })}
    ${fld('org', 'org', 'Organisation', 'text', 'Enter your organisation.', { auto: 'organization' })}
    ${fld('email', 'email', 'Email address', 'email', 'Enter your email address so we can reply.', { auto: 'email', help: 'We use this to reply to you.' })}
    ${fld('phone', 'phone', 'Phone number (optional)', 'tel', '', { optional: 1, auto: 'tel', help: 'Include the country code.' })}
    ${fld('message', 'message', 'Anything else we should know? (optional)', 'textarea', '', { optional: 1, full: 1, help: 'You can mention your existing platform, programme or documents. We will ask for files if we need them.' })}
   </div></fieldset>
   <div style="position:absolute;left:-9999px" aria-hidden="true"><label>Leave this field empty<input tabindex="-1" name="website" autocomplete="off"></label></div>
   <p class="privacy">We use these details to respond to your enquiry. See our <a href="#privacy">Privacy Policy</a>.</p>
   <button class="btn btn-p" type="submit">Send enquiry</button>
  </form>
  <div class="msg msg-ok" id="sent" tabindex="-1" hidden><strong>Thank you. We have received your enquiry.</strong><p>We will reply using the contact details you gave us. To add anything, call +971 2 626 8001 or email info@vanguardgcc.com.</p></div>
 </div>
 <aside class="c-side">
  <section><h2>Contact details</h2><ul class="contact-list"><li>${I.phone(20)}<a href="tel:+97126268001">+971 2 626 8001</a></li><li>${I.mail(20)}<a href="mailto:info@vanguardgcc.com">info@vanguardgcc.com</a></li><li>${I.pin(20)}<span>403, Cuba Cafe Building, PO Box 36864, Tourist Club Area, Al Zahiya Zone, Abu Dhabi, UAE</span></li></ul></section>
  <section><h2>What happens after your enquiry</h2><ol class="c-steps"><li><strong>We review your details.</strong>We look at your sector, system, site location and scope.</li><li><strong>We contact you.</strong>We reply using the details you gave us, and may ask for drawings, system lists or other information.</li><li><strong>We agree the next step.</strong>This may be a consultation, a quote or a review of your scope. For document requests, we tell you what we can provide.</li></ol></section>
  <section class="c-photo"><img src="assets/photos/abu-dhabi.webp" alt="Abu Dhabi skyline across the water" width="1000" height="620" loading="lazy"></section>
 </aside>
</div></section>
`;
fs.writeFileSync(D + '/contact.html', shell({ title: 'Contact Vanguard Technology | Abu Dhabi, UAE', desc: 'Contact Vanguard Technology in Abu Dhabi about automation, control systems and maintenance. Call +971 2 626 8001, email us or send an enquiry.', page: 'contact', bar: '<a class="btn btn-s" href="mailto:info@vanguardgcc.com">Email us</a>', body: contact }));
console.log('built');
