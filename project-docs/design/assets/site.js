/* Prototype behaviour only: menu, plant model selection, form checks and cookie demo. */
(function () {
  var mb = document.querySelector('.menu-btn'), mn = document.querySelector('.mnav');
  if (mb) mb.addEventListener('click', function () { var o = mn.classList.toggle('open'); mb.setAttribute('aria-expanded', o); });

  var stage = document.querySelector('[data-plant]');
  if (stage) {
    var spots = [].slice.call(document.querySelectorAll('.spot')), btns = [].slice.call(document.querySelectorAll('.plant-list button')),
      title = document.getElementById('plant-title'), text = document.getElementById('plant-copy'), link = document.getElementById('plant-link');
    var sel = function (i) {
      spots.forEach(function (s, k) { s.setAttribute('aria-pressed', k === i); });
      btns.forEach(function (b, k) { b.setAttribute('aria-current', k === i); });
      var b = btns[i]; title.textContent = b.dataset.t; text.textContent = b.dataset.c; link.firstChild.textContent = 'See ' + b.dataset.t + ' ';
    };
    spots.forEach(function (s, i) { s.addEventListener('click', function () { sel(i); }); });
    btns.forEach(function (b, i) { b.addEventListener('click', function () { sel(i); }); });
    sel(+stage.dataset.plant || 0);
  }

  var form = document.getElementById('enquiry');
  if (form) {
    var q = new URLSearchParams(location.search), pre = { request: 'request', sector: 'sector', system: 'system' };
    Object.keys(pre).forEach(function (k) {
      var v = q.get(k), el = form.elements[pre[k]];
      if (v && el) { el.value = v; var h = document.getElementById(k + '-pre'); if (h) h.hidden = false; }
    });
    var type = form.elements.request, opt = ['system', 'location', 'stage', 'scope'], labels = {};
    opt.forEach(function (n) { labels[n] = form.querySelector('label[for=f-' + n + ']').textContent; });
    var sync = function () {
      var doc = type.value === 'Company documents';
      opt.forEach(function (n) { form.querySelector('label[for=f-' + n + ']').textContent = labels[n] + (doc ? ' (optional)' : ''); form.elements[n].required = !doc; });
      document.getElementById('docs-help').hidden = !doc; document.getElementById('job-help').hidden = type.value !== 'Other';
    };
    type.addEventListener('change', sync); sync();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var sum = document.getElementById('err-sum'), list = sum.querySelector('ul'), bad = []; list.innerHTML = '';
      form.querySelectorAll('.err').forEach(function (n) { n.remove(); }); form.querySelectorAll('.bad').forEach(function (n) { n.classList.remove('bad'); });
      [].forEach.call(form.elements, function (el) {
        if (!el.required) return; var ok = el.type === 'email' ? /.+@.+\..+/.test(el.value) : !!el.value.trim();
        if (ok) { el.removeAttribute('aria-invalid'); return; }
        var f = el.closest('.field'), m = document.createElement('div'); m.className = 'err'; m.id = el.id + '-err'; m.textContent = el.dataset.err; f.appendChild(m); f.classList.add('bad');
        el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', m.id);
        var li = document.createElement('li'), a = document.createElement('a'); a.href = '#' + el.id; a.textContent = el.dataset.err; li.appendChild(a); list.appendChild(li); bad.push(el);
      });
      sum.hidden = !bad.length;
      if (bad.length) { sum.focus(); return; }
      form.hidden = true; var ok = document.getElementById('sent'); ok.hidden = false; ok.focus();
    });
  }

  var ck = document.querySelector('.cookie');
  if (ck && new URLSearchParams(location.search).get('cookie') === '1') ck.hidden = false;
  document.querySelectorAll('.cookie button').forEach(function (b) { b.addEventListener('click', function () { ck.hidden = true; }); });
})();
