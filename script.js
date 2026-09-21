(() => {
  const now = new Date();
  const iso = now.toISOString().slice(0, 10);
  const zh = new Intl.DateTimeFormat('zh-CN', {year:'numeric', month:'long', day:'numeric'}).format(now);
  const dot = iso.replaceAll('-', '.');
  const date = document.querySelector('#live-date');
  const heroDate = document.querySelector('#hero-date');
  const footerDate = document.querySelector('#footer-date');
  const year = document.querySelector('#footer-year');
  if (date) { date.textContent = zh; date.dateTime = iso; }
  if (heroDate) heroDate.textContent = dot;
  if (footerDate) footerDate.textContent = zh;
  if (year) year.textContent = String(now.getFullYear());
  const jsonLd = document.querySelector('script[type="application/ld+json"]');
  if (jsonLd) {
    try {
      const data = JSON.parse(jsonLd.textContent);
      const page = data['@graph'].find(item => item['@type'] === 'WebPage');
      if (page) page.dateModified = iso;
      jsonLd.textContent = JSON.stringify(data);
    } catch (_) {}
  }
})();
