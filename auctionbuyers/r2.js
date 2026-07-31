const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1360, height: 700 } });
  await p.goto('file:///home/claude/sites/auctionbuyers/index.html');
  await p.evaluate(()=>{document.querySelectorAll('link[href*="fonts.googleapis"]').forEach(l=>l.remove());
    const l=document.createElement('link');l.rel='stylesheet';l.href='file:///home/claude/fonts/preview-caslon.css';document.head.appendChild(l);});
  await p.waitForTimeout(1500);
  const el = await p.$('.abc-split'); await el.screenshot({path:'/home/claude/split-fixed.png'});
  await b.close();
  // elevate mockup
  const b2 = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p2 = await b2.newPage({ viewport: { width: 1440, height: 1100 } });
  await p2.goto('file:///home/claude/mockElevate.html');
  await p2.waitForTimeout(1500);
  for (const id of ['s1','s2','s3','s4']) {
    const e = await p2.$('#'+id); await e.screenshot({path:`/home/claude/elev-${id}.png`});
  }
  await b2.close(); console.log('done');
})();
