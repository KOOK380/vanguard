// node make-models.js export | still
const { chromium } = require('playwright'), http = require('http'), fs = require('fs'), path = require('path');
const raw = 'C:/Users/learn/OneDrive/Desktop/Vangurad/assets-raw/models', work = path.join(__dirname, 'models');
fs.mkdirSync(raw, { recursive: true }); fs.mkdirSync(work, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.glb': 'model/gltf-binary', '.wasm': 'application/wasm' };
const srv = http.createServer((q, r) => { const u = decodeURIComponent(q.url.split('?')[0]); const f = u.startsWith('/final/') ? path.join(raw, u.slice(7)) : path.join(__dirname, u); fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); r.end(d); } }); });
const mode = process.argv[2], samples = +(process.argv[3] || 128);
srv.listen(8794, async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--use-gl=angle', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 400, height: 300 } });
  p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('CON', m.text()); });
  await p.goto('http://localhost:8794/scene.html'); await p.waitForFunction('window.ready', null, { timeout: 60000 });
  const save = (f, url) => { fs.writeFileSync(f, Buffer.from(url.split(',')[1], 'base64')); return Math.round(fs.statSync(f).size / 1024) + ' KB'; };
  if (mode === 'export') for (const n of ['hero', 'plant']) {
    const r = await p.evaluate(n => window.exportModel(n), n);
    fs.writeFileSync(path.join(work, n + '-raw.glb'), Buffer.from(r.b64, 'base64'));
    console.log(n, 'raw', Math.round(fs.statSync(path.join(work, n + '-raw.glb')).size / 1024) + ' KB', 'tris', r.tris, 'meshes', r.draws);
  }
  if (mode === 'still') {
    const hero = await p.evaluate(([s]) => window.renderGlb('/final/hero.glb', { w: 1800, h: 1320, samples: s, camPos: [11.2, 13.4, 21.4], target: [-.25, .55, .1], shadowSpan: 16, floorY: -.42 }, s), [samples]);
    console.log('hero', hero.tris, 'tris', hero.draws, 'meshes', save(path.join(raw, 'hero-still-1400.webp'), hero.large), save(path.join(raw, 'hero-still-780.webp'), hero.small), hero.names.join(','));
    const plant = await p.evaluate(([s]) => window.renderGlb('/final/plant.glb', { w: 1800, h: 1200, samples: s, camPos: [27, 30.2, 43], target: [-.1, .35, .5], shadowSpan: 34, floorOpacity: .3, floorY: -.55 }, s), [samples]);
    console.log('plant', plant.tris, 'tris', plant.draws, 'meshes', save(path.join(raw, 'plant-still-1400.webp'), plant.large), save(path.join(raw, 'plant-still-780.webp'), plant.small), plant.names.join(','));
    fs.writeFileSync(path.join(raw, 'plant-hotspots.json'), JSON.stringify(plant.spots, null, 1)); console.log(JSON.stringify(plant.spots.map(s => [s.name, s.x, s.y])));
  }
  await b.close(); srv.close();
});
