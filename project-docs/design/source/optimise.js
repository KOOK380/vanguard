// Optimise assets-raw into public/ and src/app. Reports before and after sizes.
const { chromium } = require('playwright'), fs = require('fs'), path = require('path'), { optimize } = require('svgo'), { execFileSync } = require('child_process');
const R = 'C:/Users/learn/OneDrive/Desktop/Vangurad', raw = R + '/assets-raw', pub = R + '/public';
for (const d of ['images/3d', 'logos/partners', 'logos/group', 'models', 'icons']) fs.mkdirSync(path.join(pub, d), { recursive: true });
const kb = n => (n / 1024).toFixed(n < 10240 ? 1 : 0) + ' KB', size = f => fs.statSync(f).size;
const report = { photos: [], logos: [], partners: [], models: [], icons: [], stills: [] };
const photos = [
  // source, output, target aspect (w/h) or 0 to keep, focus x, focus y, zoom, status
  ['about/abu-dhabi-skyline-etihad-towers', 'abu-dhabi-skyline-towers', 0, .5, .5, 1, 'Available'],
  ['contact/abu-dhabi-skyline-corniche', 'abu-dhabi-skyline-waterfront', 0, .5, .5, 1, 'In design'],
  ['capabilities/switchgear-control-panel-room', 'switchgear-panel-room', 0, .5, .5, 1, 'Available'],
  ['careers/electrician-engineer-in-ppe', 'electrician-in-protective-equipment', 0, .5, .5, 1, 'Hold: identifiable person'],
  ['home/control-room-panels-desk', 'control-room-wall-panels-desk', 0, .5, .5, 1, 'Available'],
  ['industries/district-cooling-plant-cooling-units', 'cooling-units-outdoor-rows', 1.5, 1, .75, 1.55, 'In design'],
  ['industries/district-cooling-rooftop-fans', 'rooftop-cooling-fans', 0, .5, .5, 1, 'Available'],
  ['industries/industries-overview-process-plant', 'process-plant-stacks', 0, .5, .5, 1, 'Available'],
  ['industries/infrastructure-tunnel-construction', 'tunnel-construction-truck', 0, .5, .5, 1, 'Available'],
  ['industries/oil-gas-refinery-columns', 'refinery-columns-pipework', 0, .5, .5, 1, 'In design'],
  ['industries/power-plant-stacks', 'power-plant-striped-stacks', 0, .5, .5, 1, 'In design'],
  ['industries/power-substation-transformer', 'power-transformer-yard', 0, .5, .5, 1, 'Available'],
  ['industries/water-wastewater-treatment-aerial', 'wastewater-treatment-tanks-aerial', 0, .5, .5, 1, 'In design'],
  ['our-group/chauffeur-black-sedan', 'black-sedan-roadside', 0, .5, .5, 1, 'Hold: recognisable car brand'],
  ['our-group/hospitality-hotel-lobby', 'hotel-lobby-seating', 0, .5, .5, 1, 'Available'],
  ['our-group/real-estate-dubai-towers', 'city-towers-blue-sky', 0, .5, .5, 1, 'Hold: recognisable buildings'],
  ['our-group/shipping-harbour-cranes', 'harbour-cranes-dusk', 0, .5, .5, 1, 'Available'],
  ['solutions/building-energy-rooftop-hvac-units', 'rooftop-air-conditioning-units', 1.5, .62, 1, 1.65, 'In design'],
  ['solutions/condition-monitoring-pump-motors', 'pump-motors-pipework', 0, .5, .5, 1, 'Available'],
  ['solutions/engineering-delivery-team-in-ppe', 'engineering-team-protective-equipment', 0, .5, .5, 1, 'Hold: identifiable people'],
  ['solutions/instrumentation-electrical-cable-trays', 'cable-trays-ceiling', 0, .5, .5, 1, 'Available'],
  ['solutions/instrumentation-electrical-panel-testing', 'electrical-panel-testing', 0, .5, .5, 1, 'In design'],
  ['solutions/maintenance-electric-motor-service', 'electric-motor-service', 0, 1, .66, 1.7, 'Available'],
  ['solutions/plc-control-cabinet-wiring', 'control-cabinet-modules-wiring', 0, .5, .5, 1, 'Hold: recognisable vendor hardware'],
  ['solutions/safety-systems-control-panel-buttons', 'control-panel-push-buttons', 1.5, .95, .62, 1.5, 'In design'],
  ['solutions/scada-control-room-consoles', 'control-room-consoles', 0, .5, .5, 1, 'Hold: appears to be a ship'],
  ['solutions/solutions-overview-process-pipework', 'process-pipework-black-white', 900 / 700, 1, .85, 1.3, 'In design'],
  ['solutions/system-integration-open-control-cabinet', 'open-control-cabinet-modules', 0, .5, .5, 1, 'Hold: recognisable vendor hardware'],
];
const dataUrl = f => 'data:image/' + (f.endsWith('png') ? 'png' : f.endsWith('svg') ? 'svg+xml' : 'jpeg') + ';base64,' + fs.readFileSync(f).toString('base64');
const save = (f, u) => { fs.writeFileSync(f, Buffer.from(u.split(',')[1], 'base64')); return size(f); };
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  // Photos
  for (const [src, name, asp, fx, fy, z, status] of photos) {
    const inF = `${raw}/photos/${src}.jpg`, outF = `${pub}/images/${name}.webp`;
    const r = await p.evaluate(async ([url, asp, fx, fy, z]) => {
      const i = new Image(); i.src = url; await i.decode(); const W = i.naturalWidth, H = i.naturalHeight;
      let sw = W / z, sh = H / z; const a = asp || sw / sh; if (sw / sh > a) sw = sh * a; else sh = sw / a;
      const w = Math.min(2000, Math.round(sw)), h = Math.round(w * sh / sw), c = document.createElement('canvas'); c.width = w; c.height = h;
      const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(i, (W - sw) * fx, (H - sh) * fy, sw, sh, 0, 0, w, h);
      return { u: c.toDataURL('image/webp', .78), w, h, W, H };
    }, [dataUrl(inF), asp, fx, fy, z]);
    report.photos.push({ name, before: size(inF), after: save(outF, r.u), dim: `${r.W}x${r.H} > ${r.w}x${r.h}`, status, crop: z !== 1 });
  }
  // Logos: SVGO, then a pixel comparison with the source
  const svgoOpts = { multipass: true, floatPrecision: 2, plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false, removeTitle: false, removeDesc: false } } }] };
  const diff = (a, b_) => p.evaluate(async ([a, b_]) => { const load = async u => { const i = new Image(); i.src = u; await i.decode(); const c = document.createElement('canvas'); c.width = 600; c.height = Math.round(600 * i.naturalHeight / i.naturalWidth); const x = c.getContext('2d'); x.fillStyle = '#808080'; x.fillRect(0, 0, c.width, c.height); x.drawImage(i, 0, 0, c.width, c.height); return x.getImageData(0, 0, c.width, c.height).data; }; const A = await load(a), B = await load(b_); let n = 0; for (let k = 0; k < A.length; k += 4) if (Math.abs(A[k] - B[k]) + Math.abs(A[k + 1] - B[k + 1]) + Math.abs(A[k + 2] - B[k + 2]) > 60) n++; return +(100 * n / (A.length / 4)).toFixed(3); }, [a, b_]);
  const svgs = [[raw + '/logo/vanguard-logo.svg', 'vanguard-logo.svg'], [raw + '/logo/vanguard-logo-white.svg', 'vanguard-logo-white.svg'], [R + '/project-docs/design/assets/logos/vanguard-lockup.svg', 'vanguard-lockup.svg'], [R + '/project-docs/design/assets/logos/vanguard-lockup-white.svg', 'vanguard-lockup-white.svg']];
  for (const [inF, name] of svgs) { const src = fs.readFileSync(inF, 'utf8'), out = optimize(src, svgoOpts).data, f = `${pub}/logos/${name}`; fs.writeFileSync(f, out); report.logos.push({ name, before: size(inF), after: size(f), changedPixelsPct: await diff(dataUrl(inF), dataUrl(f)) }); }
  // Mark only, taken from the shapes in the logo
  const mk = async (src, dest) => { await p.setContent('<body>' + fs.readFileSync(src, 'utf8') + '</body>'); const items = await p.evaluate(() => [...document.querySelectorAll('svg path,svg polygon,svg rect')].map(e => { const b = e.getBBox(); return { x: b.x, y: b.y, w: b.width, h: b.height, html: e.outerHTML }; })); const m = items.filter(i => i.y + i.h / 2 < 286.8), x0 = Math.min(...m.map(i => i.x)), y0 = Math.min(...m.map(i => i.y)), x1 = Math.max(...m.map(i => i.x + i.w)), y1 = Math.max(...m.map(i => i.y + i.h)); const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x0} ${y0} ${x1 - x0} ${y1 - y0}" role="img" aria-label="Vanguard Technology">${m.map(i => i.html).join('')}</svg>`; const o = optimize(s, svgoOpts).data; fs.writeFileSync(`${pub}/logos/${dest}`, o); report.logos.push({ name: dest, before: null, after: size(`${pub}/logos/${dest}`) }); return { inner: m.map(i => i.html).join(''), x0, y0, w: x1 - x0, h: y1 - y0 }; };
  const mark = await mk(raw + '/logo/vanguard-logo.svg', 'vanguard-mark.svg'); await mk(raw + '/logo/vanguard-logo-white.svg', 'vanguard-mark-white.svg');
  // Partner logos: trim, equal height
  const H = 120, trimmed = [['adnoc-logo.png', 'partners/adnoc'], ['cnpc-logo.png', 'partners/cnpc'], ['khalifa-university-logo.png', 'partners/khalifa-university'], ['sapco-logo.jpg', 'partners/sapco'], ['the-park-logo.png', 'group/the-park-hotel']];
  for (const [src, name] of trimmed) {
    const inF = `${raw}/partners/${src}`, h2 = name.startsWith('group') ? 240 : H;
    const r = await p.evaluate(async ([url, H]) => {
      const i = new Image(); i.src = url; await i.decode(); let W = i.naturalWidth, Hh = i.naturalHeight; const sc = Math.min(1, 1600 / Math.max(W, Hh)); W = Math.round(W * sc); Hh = Math.round(Hh * sc);
      const c = document.createElement('canvas'); c.width = W; c.height = Hh; const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(i, 0, 0, W, Hh); const im = x.getImageData(0, 0, W, Hh), d = im.data;
      const opaqueCorner = d[3] > 250 && d[0] > 235 && d[1] > 235 && d[2] > 235, opaqueAll = opaqueCorner;
      if (opaqueAll) for (let k = 0; k < d.length; k += 4) { const a = 1 - Math.min(d[k], d[k + 1], d[k + 2]) / 255; if (a <= .02) { d[k + 3] = 0; continue; } d[k] = Math.max(0, (d[k] - 255 * (1 - a)) / a); d[k + 1] = Math.max(0, (d[k + 1] - 255 * (1 - a)) / a); d[k + 2] = Math.max(0, (d[k + 2] - 255 * (1 - a)) / a); d[k + 3] = a * 255; }
      x.putImageData(im, 0, 0);
      let x0 = W, y0 = Hh, x1 = 0, y1 = 0; for (let yy = 0; yy < Hh; yy++) for (let xx = 0; xx < W; xx++) if (d[(yy * W + xx) * 4 + 3] > 24) { if (xx < x0) x0 = xx; if (xx > x1) x1 = xx; if (yy < y0) y0 = yy; if (yy > y1) y1 = yy; }
      const tw = x1 - x0 + 1, th = y1 - y0 + 1, w2 = Math.round(tw * H / th), o = document.createElement('canvas'); o.width = w2; o.height = H; const ox = o.getContext('2d'); ox.imageSmoothingQuality = 'high'; ox.drawImage(c, x0, y0, tw, th, 0, 0, w2, H);
      return { u: o.toDataURL('image/webp', .92), W: i.naturalWidth, Hh: i.naturalHeight, tw: Math.round(tw / sc), th: Math.round(th / sc), w2, h2: H, keyed: opaqueAll };
    }, [dataUrl(inF), h2]);
    const f = `${pub}/logos/${name}.webp`; report.partners.push({ name, before: size(inF), after: save(f, r.u), src: `${r.W}x${r.Hh}`, trimmed: `${r.tw}x${r.th}`, final: `${r.w2}x${r.h2}`, upscaled: r.th < r.h2, whiteRemoved: r.keyed });
  }
  // Favicons: mark on a paper tile, readable on light and dark tabs
  const tile = (size_, pad, radius) => { const s = (1 - 2 * pad) * size_ / Math.max(mark.w, mark.h), tx = (size_ - mark.w * s) / 2 - mark.x0 * s, ty = (size_ - mark.h * s) / 2 - mark.y0 * s; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size_} ${size_}" width="${size_}" height="${size_}"><rect width="${size_}" height="${size_}" rx="${radius}" fill="#FBF9F6"/><g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(4)})">${mark.inner}</g></svg>`; };
  const png = async (svg, s) => { await p.setViewportSize({ width: Math.max(s, 16), height: Math.max(s, 16) }); await p.setContent(`<!doctype html><body style="margin:0;background:transparent">${svg}</body>`); return p.screenshot({ type: 'png', omitBackground: true, clip: { x: 0, y: 0, width: s, height: s } }); };
  const out = {}; for (const [s, pad, rad] of [[16, .06, 3], [32, .08, 6], [48, .1, 9], [180, .14, 0], [192, .14, 0], [512, .14, 0]]) out[s] = await png(tile(s, pad, rad), s);
  const maskable = await png(tile(512, .24, 0), 512);
  // ICO holding PNG images
  const sizes = [16, 32, 48], head = Buffer.alloc(6 + 16 * sizes.length); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4); let off = head.length;
  sizes.forEach((s, k) => { const e = 6 + 16 * k; head[e] = s; head[e + 1] = s; head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6); head.writeUInt32LE(out[s].length, e + 8); head.writeUInt32LE(off, e + 12); off += out[s].length; });
  fs.writeFileSync(R + '/src/app/favicon.ico', Buffer.concat([head, ...sizes.map(s => out[s])]));
  fs.writeFileSync(R + '/src/app/icon.svg', optimize(tile(64, .08, 12), { multipass: true, floatPrecision: 2, plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }, 'removeDimensions'] }).data);
  fs.writeFileSync(R + '/src/app/apple-icon.png', out[180]);
  fs.writeFileSync(pub + '/icons/icon-192.png', out[192]); fs.writeFileSync(pub + '/icons/icon-512.png', out[512]); fs.writeFileSync(pub + '/icons/icon-maskable-512.png', maskable);
  for (const f of ['src/app/favicon.ico', 'src/app/icon.svg', 'src/app/apple-icon.png', 'public/icons/icon-192.png', 'public/icons/icon-512.png', 'public/icons/icon-maskable-512.png']) report.icons.push({ name: f, after: size(R + '/' + f) });
  // Icon proof sheet
  const proof = `<body style="margin:0;padding:12px;display:flex;gap:16px;align-items:center;background:#333">` + [16, 32, 48, 180].map(s => `<img src="data:image/png;base64,${out[s].toString('base64')}" width="${s}" height="${s}">`).join('') + `<span style="background:#fff;padding:8px;display:flex;gap:10px"><img src="data:image/png;base64,${out[16].toString('base64')}"><img src="data:image/png;base64,${out[32].toString('base64')}"></span></body>`;
  await p.setViewportSize({ width: 480, height: 210 }); await p.setContent(proof); await p.waitForTimeout(200); await p.screenshot({ path: __dirname + '/icons.png' });
  const logoSheet = `<body style="margin:0;background:#FBF9F6;padding:16px"><div style="display:flex;gap:40px;align-items:center;flex-wrap:wrap">` + report.partners.map(r => `<img src="data:image/webp;base64,${fs.readFileSync(`${pub}/logos/${r.name}.webp`).toString('base64')}" style="height:60px;outline:1px dashed #ccc">`).join('') + `<img src="data:image/svg+xml;base64,${fs.readFileSync(pub + '/logos/vanguard-lockup.svg').toString('base64')}" style="height:52px"><img src="data:image/svg+xml;base64,${fs.readFileSync(pub + '/logos/vanguard-logo.svg').toString('base64')}" style="height:110px"></div><div style="background:#3B181E;padding:16px;margin-top:12px;display:flex;gap:40px;align-items:center"><img src="data:image/svg+xml;base64,${fs.readFileSync(pub + '/logos/vanguard-lockup-white.svg').toString('base64')}" style="height:52px"><img src="data:image/svg+xml;base64,${fs.readFileSync(pub + '/logos/vanguard-logo-white.svg').toString('base64')}" style="height:110px"></div></body>`;
  await p.setViewportSize({ width: 1100, height: 420 }); await p.setContent(logoSheet); await p.waitForTimeout(300); await p.screenshot({ path: __dirname + '/logos.png' });
  const cropped = report.photos.filter(r => r.crop).map(r => `<img src="data:image/webp;base64,${fs.readFileSync(`${pub}/images/${r.name}.webp`).toString('base64')}" style="width:560px">`).join('');
  await p.setViewportSize({ width: 1700, height: 900 }); await p.setContent(`<body style="margin:0;display:flex;flex-wrap:wrap;gap:4px">${cropped}</body>`); await p.waitForTimeout(800); await p.screenshot({ path: __dirname + '/crops.png', fullPage: true });
  await b.close();
  // Stills and hotspots
  for (const f of ['hero-still-1400.webp', 'hero-still-780.webp', 'plant-still-1400.webp', 'plant-still-780.webp']) { fs.copyFileSync(`${raw}/models/${f}`, `${pub}/images/3d/${f}`); report.stills.push({ name: f, after: size(`${pub}/images/3d/${f}`) }); }
  fs.copyFileSync(`${raw}/models/plant-hotspots.json`, R + '/src/content/plant-hotspots.json');
  // Models
  const G = path.join(__dirname, 'node_modules/@gltf-transform/cli/bin/cli.js');
  for (const n of ['hero', 'plant']) {
    const w = path.join(__dirname, `models/${n}-weld.glb`), fin = `${pub}/models/${n}.glb`, rawF = path.join(__dirname, `models/${n}-raw.glb`);
    execFileSync(process.execPath, [G, 'weld', rawF, w], { stdio: 'ignore' }); execFileSync(process.execPath, [G, 'meshopt', w, fin, '--level', 'high'], { stdio: 'ignore' });
    const v = execFileSync(process.execPath, [G, 'validate', fin], { encoding: 'utf8' }).replace(/\x1b\[[0-9;]*m/g, '');
    const buf = fs.readFileSync(fin), jl = buf.readUInt32LE(12), j = JSON.parse(buf.slice(20, 20 + jl).toString());
    report.models.push({ name: n + '.glb', uncompressed: size(rawF), welded: size(w), final: size(fin), previous: size(`${raw}/models/${n}.glb`), identical: buf.equals(fs.readFileSync(`${raw}/models/${n}.glb`)), textures: (j.textures || []).length, images: (j.images || []).length, meshes: (j.meshes || []).length, groups: j.nodes.filter(x => /^(zone-|hotspot-|control-cabinets|scada-desk)/.test(x.name || '')).map(x => x.name), clean: /No errors/.test(v) && /No warnings/.test(v) });
  }
  fs.writeFileSync(__dirname + '/optimise-report.json', JSON.stringify(report, null, 1));
  const tot = a => a.reduce((s, r) => s + (r || 0), 0);
  console.log('PHOTOS', kb(tot(report.photos.map(r => r.before))), '>', kb(tot(report.photos.map(r => r.after))), 'over 2000w:', report.photos.filter(r => +r.dim.split('> ')[1].split('x')[0] > 2000).length);
  for (const r of report.photos) console.log(' ', r.name.padEnd(40), kb(r.before).padStart(8), '>', kb(r.after).padStart(8), r.dim, r.crop ? 'CROPPED' : '', '|', r.status);
  console.log('LOGOS'); for (const r of report.logos) console.log(' ', r.name.padEnd(28), r.before ? kb(r.before) : 'new', '>', kb(r.after), r.changedPixelsPct !== undefined ? `changed px ${r.changedPixelsPct}%` : '');
  console.log('PARTNERS'); for (const r of report.partners) console.log(' ', r.name.padEnd(28), kb(r.before), '>', kb(r.after), 'src', r.src, 'trim', r.trimmed, 'final', r.final, r.upscaled ? 'UPSCALED' : '', r.whiteRemoved ? 'white removed' : '');
  console.log('ICONS'); for (const r of report.icons) console.log(' ', r.name, kb(r.after));
  console.log('MODELS'); for (const r of report.models) console.log(' ', JSON.stringify(r));
})();
