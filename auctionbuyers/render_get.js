const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1400, height: 1200 } });
  await p.goto('file:///home/claude/mockGet.html');
  await p.waitForTimeout(1400);
  for (const id of ['ga','gb']) {
    const el = await p.$('#'+id); await el.screenshot({ path:`/home/claude/get-${id}.png` });
  }
  // FAQ accordion preview from the live file
  const p2 = await b.newPage({ viewport: { width: 1200, height: 900 } });
  await p2.goto('file:///home/claude/sites/auctionbuyers/index.html');
  await p2.evaluate(() => {
    document.querySelectorAll('link[href*="fonts.googleapis"]').forEach(l=>l.remove());
    const l=document.createElement('link'); l.rel='stylesheet';
    l.href='file:///home/claude/fonts/preview-caslon.css'; document.head.appendChild(l);
  });
  await p2.waitForTimeout(1500);
  // open the first two so both states are visible
  await p2.evaluate(() => {
    const d=document.querySelectorAll('.abc-faq__item');
    d[0].open=true; d[2].open=true;
  });
  await p2.waitForTimeout(400);
  const faq = await p2.$('#faq');
  await faq.screenshot({ path: '/home/claude/faq-accordion.png' });
  await b.close(); console.log('done');
})();
