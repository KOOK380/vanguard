// node design-shoot.js <round>: screenshots, measurements and accessibility checks.
const { chromium } = require('playwright'), path = require('path'), fs = require('fs');
const D = 'C:/Users/learn/OneDrive/Desktop/Vangurad/project-docs/design';
const round = process.argv[2] || 'r1', out = path.join(__dirname, 'rounds', round); fs.mkdirSync(out, { recursive: true });
const http=require('http');const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2'};const srv=http.createServer((q,r)=>{const f=path.join(D,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream'});r.end(d)}})});srv.listen(8792);
const axe = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const pages = ['home', 'solution', 'contact'], views = [[1440, 900], [390, 844]];
(async () => {
  const b = await chromium.launch();
  for (const [w, h] of views) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 768, hasTouch: w < 768 });
    for (const p of pages) {
      const pg = await ctx.newPage(); const reqs = [], errs = [];
      pg.on('pageerror', e => errs.push(e.message)); pg.on('requestfailed', r => errs.push('FAILED ' + r.url()));
      await pg.goto(`http://localhost:8792/${p}.html`); await pg.waitForLoadState('networkidle');
      await pg.evaluate(() => document.fonts.ready);
      await pg.screenshot({ path: path.join(out, `${p}-${w}-first-screen.png`) });
      // force lazy images
      await pg.evaluate(async () => { document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager'); await Promise.all([...document.images].map(i => i.decode().catch(() => { }))); });
      await pg.waitForTimeout(300);
      const hide = await pg.addStyleTag({ content: '.pbar{display:none!important}.hdr{position:static!important}.sol-side{position:static!important}' });
      await pg.screenshot({ path: path.join(out, `${p}-${w}.png`), fullPage: true });
      if (w === 1440) { /* TILES */ const secs = await pg.$$('main > section'); let i = 0; for (const s of secs) { await s.screenshot({ path: path.join(out, `${p}-tile-${++i}.png`) }); } const f = await pg.$('.ftr'); await f.screenshot({ path: path.join(out, `${p}-tile-footer.png`) }); }
      await hide.evaluate(e => e.remove());
      await pg.addScriptTag({ content: axe });
      const a = await pg.evaluate(async () => { const r = await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }); return r.violations.map(v => ({ id: v.id, n: v.nodes.length, t: v.nodes.slice(0, 3).map(x => x.target.join(' ')) })); });
      const m = await pg.evaluate(() => {
        const small = [...document.querySelectorAll('main a,main button,.pbar a,.hdr a,.hdr button,.ftr a,.ftr button')].filter(e => e.offsetParent).filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height < 24; }).map(e => e.textContent.trim().slice(0, 24));
        const tiny = [...document.querySelectorAll('body *')].filter(e => e.children.length === 0 && e.textContent.trim() && e.offsetParent && parseFloat(getComputedStyle(e).fontSize) < 13).length;
        return { h: document.documentElement.scrollHeight, overflow: document.documentElement.scrollWidth > innerWidth, h1: document.querySelectorAll('h1').length, small, tiny };
      });
      const entries = await pg.evaluate(() => performance.getEntriesByType('resource').map(e => [e.name.split('/').pop(), e.initiatorType]));
      console.log(`${p}-${w}`, JSON.stringify(m), 'axe:', JSON.stringify(a), errs.length ? 'ERR ' + errs.join(';') : '');
      await pg.close();
    }
    await ctx.close();
  }
  /* STATES */
  for (const [w, h] of views) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 768, hasTouch: w < 768 });
    const pg = await ctx.newPage();
    await pg.goto('http://localhost:8792/contact.html'); await pg.waitForLoadState('networkidle');
    await pg.click('#enquiry button[type=submit]'); await pg.waitForTimeout(250);
    await pg.screenshot({ path: path.join(out, `state-form-errors-${w}.png`) });
    const fillAll = async () => { await pg.selectOption('#f-request', 'Project enquiry'); await pg.fill('#f-scope', 'x'); await pg.selectOption('#f-sector', 'Oil and gas'); await pg.selectOption('#f-system', 'SCADA'); await pg.fill('#f-location', 'x'); await pg.selectOption('#f-stage', 'Design'); await pg.fill('#f-name', 'x'); await pg.fill('#f-org', 'x'); await pg.fill('#f-email', 'a@b.co'); };
    await fillAll(); await pg.click('#enquiry button[type=submit]'); await pg.waitForTimeout(250);
    await pg.screenshot({ path: path.join(out, `state-form-sent-${w}.png`) });
    console.log('sent visible', await pg.isVisible('#sent'));
    await pg.goto('http://localhost:8792/home.html?cookie=1'); await pg.waitForLoadState('networkidle'); await pg.waitForTimeout(200);
    await pg.screenshot({ path: path.join(out, `state-cookie-${w}.png`) });
    await pg.goto('http://localhost:8792/contact.html?request=Company%20documents'); await pg.waitForLoadState('networkidle');
    console.log('prefill', await pg.inputValue('#f-request'), await pg.isVisible('#docs-help'), await pg.isVisible('#request-pre'), await pg.textContent('label[for=f-scope]'));
    // tab order check on the plant model
    await pg.goto('http://localhost:8792/home.html'); await pg.waitForLoadState('networkidle');
    const n = await pg.$$('.plant-list button'); await n[2].click(); console.log('plant', await pg.textContent('#plant-link'));
    await ctx.close();
  }
  await b.close();srv.close();
})();
