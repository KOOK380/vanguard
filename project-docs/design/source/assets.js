// Resize photos and logos with Chromium, write WebP into design/assets.
const { chromium } = require('playwright'), fs = require('fs'), path = require('path');
const raw = 'C:/Users/learn/OneDrive/Desktop/Vangurad/assets-raw', out = 'C:/Users/learn/OneDrive/Desktop/Vangurad/project-docs/design/assets';
for (const d of ['photos', 'logos', 'fonts']) fs.mkdirSync(path.join(out, d), { recursive: true });
const photos = [
  // file, name, width, height, focus x, focus y, zoom, phone width
  ['industries/oil-gas-refinery-columns.jpg', 'oil-gas', 840, 560, .5, .6, 1, 420],
  ['industries/water-wastewater-treatment-aerial.jpg', 'water', 840, 560, .5, .5, 1, 420],
  ['industries/district-cooling-plant-cooling-units.jpg', 'district-cooling', 840, 560, 1, .75, 1.55, 420],
  ['industries/power-plant-stacks.jpg', 'power', 840, 560, .5, .5, 1, 420],
  ['solutions/building-energy-rooftop-hvac-units.jpg', 'hvac', 840, 560, .62, 1, 1.65, 420],
  ['solutions/safety-systems-control-panel-buttons.jpg', 'safety', 840, 560, .95, .62, 1.5, 420],
  ['solutions/solutions-overview-process-pipework.jpg', 'pipework', 900, 700, 1, .85, 1.3, 0],
  ['solutions/instrumentation-electrical-panel-testing.jpg', 'panel-testing', 1000, 760, .5, .5, 1, 0],
  ['contact/abu-dhabi-skyline-corniche.jpg', 'abu-dhabi', 1000, 620, .5, .55, 1, 0],
];
const logos = [['adnoc-logo.png', 'adnoc'], ['cnpc-logo.png', 'cnpc'], ['khalifa-university-logo.png', 'khalifa'], ['sapco-logo.jpg', 'sapco']];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const conv = (url, w, h, fx, fy, q, contain, zoom = 1) => p.evaluate(async ([url, w, h, fx, fy, q, contain, zoom]) => {
    const img = new Image(); img.src = url; await img.decode();
    if (contain) { const s = h / img.naturalHeight; w = Math.min(Math.round(img.naturalWidth * s), 400); h = Math.round(img.naturalHeight * (w / img.naturalWidth)); }
    const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.imageSmoothingQuality = 'high';
    if (contain) x.drawImage(img, 0, 0, w, h); else { const s = Math.max(w / img.naturalWidth, h / img.naturalHeight) * zoom, sw = w / s, sh = h / s; x.drawImage(img, (img.naturalWidth - sw) * fx, (img.naturalHeight - sh) * fy, sw, sh, 0, 0, w, h); }
    return c.toDataURL('image/webp', q);
  }, [url, w, h, fx, fy, q, contain, zoom]);
  const data = f => 'data:image/' + (f.endsWith('png') ? 'png' : 'jpeg') + ';base64,' + fs.readFileSync(f).toString('base64');
  const save = (f, u) => { fs.writeFileSync(f, Buffer.from(u.split(',')[1], 'base64')); return Math.round(fs.statSync(f).size / 1024); };
  for (const [src, name, w, h, fx, fy, z, pw] of photos) { const d = data(path.join(raw, 'photos', src)); const k = save(path.join(out, 'photos', name + '.webp'), await conv(d, w, h, fx, fy, .72, false, z)); let k2 = ''; if (pw) k2 = save(path.join(out, 'photos', name + '-420.webp'), await conv(d, pw, Math.round(pw * h / w), fx, fy, .68, false, z)); console.log(name, k + ' KB', k2 && k2 + ' KB'); }
  fs.copyFileSync(path.join(__dirname, 'node_modules/@fontsource-variable/inter/LICENSE'), path.join(out, 'fonts', 'LICENSE-Inter.txt'));
  for (const [src, name] of logos) { const k = save(path.join(out, 'logos', name + '.webp'), await conv(data(path.join(raw, 'partners', src)), 0, 96, 0, 0, .9, true)); console.log(name, k + ' KB'); }
  fs.copyFileSync(path.join(raw, 'logo', 'vanguard-logo.svg'), path.join(out, 'logos', 'vanguard-logo.svg'));
  fs.copyFileSync(path.join(raw, 'logo', 'vanguard-logo-white.svg'), path.join(out, 'logos', 'vanguard-logo-white.svg'));
  fs.copyFileSync(path.join(__dirname, 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'), path.join(out, 'fonts', 'inter-latin-wght.woff2'));
  await b.close();
})();
