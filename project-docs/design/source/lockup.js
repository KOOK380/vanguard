// Build horizontal logos from the redrawn stacked SVG, using its own shapes.
const { chromium } = require('playwright'), fs = require('fs'), path = require('path');
const raw = 'C:/Users/learn/OneDrive/Desktop/Vangurad/assets-raw/logo', out = 'C:/Users/learn/OneDrive/Desktop/Vangurad/project-docs/design/assets/logos';
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  for (const [src, dest] of [['vanguard-logo.svg', 'vanguard-lockup.svg'], ['vanguard-logo-white.svg', 'vanguard-lockup-white.svg']]) {
    const svg = fs.readFileSync(path.join(raw, src), 'utf8');
    await p.setContent('<body>' + svg + '</body>');
    const r = await p.evaluate(() => {
      const s = document.querySelector('svg'), els = [...s.querySelectorAll('path,polygon,rect')];
      const items = els.map(e => { const b = e.getBBox(); return { x: b.x, y: b.y, w: b.width, h: b.height, html: e.outerHTML, n: e.tagName }; });
      return { vb: s.getAttribute('viewBox'), items };
    });
    const ys = r.items.map(i => i.y + i.h / 2);
    // find biggest vertical gap between shapes: mark above, wordmark below
    const sorted = r.items.map(i => [i.y, i.y + i.h]).sort((a, c) => a[0] - c[0]); let end = sorted[0][1], gap = 0, split = 0;
    for (const [a, c] of sorted) { if (a - end > gap) { gap = a - end; split = (a + end) / 2; } end = Math.max(end, c); }
    const mark = r.items.filter(i => i.y + i.h / 2 < split), word = r.items.filter(i => i.y + i.h / 2 >= split);
    const bb = a => ({ x0: Math.min(...a.map(i => i.x)), y0: Math.min(...a.map(i => i.y)), x1: Math.max(...a.map(i => i.x + i.w)), y1: Math.max(...a.map(i => i.y + i.h)) });
    const M = bb(mark), W = bb(word);
    console.log(dest, 'shapes', r.items.length, 'mark', mark.length, 'word', word.length, 'split', split.toFixed(1), JSON.stringify(M), JSON.stringify(W));
    const H = 100, ms = H / (M.y1 - M.y0), ww = W.x1 - W.x0, wh = W.y1 - W.y0, ws = (H * .62) / wh, gapX = 26, wx = (M.x1 - M.x0) * ms + gapX, total = wx + ww * ws;
    const defs = (svg.match(/<defs[\s\S]*?<\/defs>/) || [''])[0], style = (svg.match(/<style[\s\S]*?<\/style>/) || [''])[0];
    const out_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total.toFixed(1)} ${H}" role="img" aria-label="Vanguard Technology">${defs}${style}<g transform="scale(${ms.toFixed(5)}) translate(${(-M.x0).toFixed(2)} ${(-M.y0).toFixed(2)})">${mark.map(i => i.html).join('')}</g><g transform="translate(${wx.toFixed(2)} ${((H - wh * ws) / 2).toFixed(2)}) scale(${ws.toFixed(5)}) translate(${(-W.x0).toFixed(2)} ${(-W.y0).toFixed(2)})">${word.map(i => i.html).join('')}</g></svg>`;
    fs.writeFileSync(path.join(out, dest), out_svg); console.log(' ratio', (total / H).toFixed(2), Math.round(out_svg.length / 1024) + ' KB');
  }
  await p.setContent(`<body style="margin:0;padding:20px;background:#FBF9F6"><img src="data:image/svg+xml;base64,${fs.readFileSync(path.join(out, 'vanguard-lockup.svg')).toString('base64')}" style="height:52px"><div style="background:#3B181E;padding:20px;margin-top:20px"><img src="data:image/svg+xml;base64,${fs.readFileSync(path.join(out, 'vanguard-lockup-white.svg')).toString('base64')}" style="height:52px"></div></body>`);
  await p.waitForTimeout(300); await p.screenshot({ path: path.join(__dirname, 'lockup.png'), clip: { x: 0, y: 0, width: 500, height: 200 } });
  await b.close();
})();
