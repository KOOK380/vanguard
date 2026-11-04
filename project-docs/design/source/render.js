// node render.js [hero|plant|icons|all] [samples]
const { chromium } = require('playwright'), http = require('http'), fs = require('fs'), path = require('path');
const out = 'C:/Users/learn/OneDrive/Desktop/Vangurad/project-docs/design/assets/renders';
fs.mkdirSync(out, { recursive: true });
const what = process.argv[2] || 'all', samples = +(process.argv[3] || 96);
const types = { '.html': 'text/html', '.js': 'text/javascript' };
const srv = http.createServer((q, r) => { const p = path.join(__dirname, decodeURIComponent(q.url.split('?')[0])); fs.readFile(p, (e, d) => { if (e) { r.writeHead(404); r.end(); } else { r.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' }); r.end(d); } }); });
const save = (n, url) => { const f = path.join(out, n); fs.writeFileSync(f, Buffer.from(url.split(',')[1], 'base64')); console.log(n, Math.round(fs.statSync(f).size / 1024) + ' KB'); };
srv.listen(8791, async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--use-gl=angle', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 400, height: 300 } });
  p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => { if (m.type() === 'error') console.log('CON', m.text()); });
  await p.goto('http://localhost:8791/scene.html'); await p.waitForFunction('window.ready', null, { timeout: 60000 });
  const t = Date.now();
  if (what === 'hero' || what === 'all') { const r = await p.evaluate(s => window.renderHero(s), samples); save('hero-1400.webp', r.large); save('hero-780.webp', r.small); console.log('hero', (Date.now() - t) / 1000 + 's'); }
  if (what === 'sol' || what === 'all') { const r = await p.evaluate(s => window.renderSol(s), samples); save('sol-1100.webp', r.large); save('sol-720.webp', r.small); }
  if (what === 'plant' || what === 'all') { const r = await p.evaluate(s => window.renderPlant(s), samples); save('plant-1400.webp', r.large); save('plant-780.webp', r.small); fs.writeFileSync(path.join(out, 'plant-hotspots.json'), JSON.stringify(r.spots)); console.log(JSON.stringify(r.spots)); }
  if (what === 'icons' || what === 'all') { for (const n of await p.evaluate(() => window.iconNames)) save('icon-' + n + '.webp', await p.evaluate(([n, s]) => window.renderIcon(n, s), [n, Math.min(samples, 40)])); }
  await b.close(); srv.close();
});
