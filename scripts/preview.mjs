/**
 * Снимает превью страницы в нескольких вьюпортах.
 * Использует установленный Chrome, поэтому браузер отдельно скачивать не нужно.
 *
 * Запуск: node scripts/preview.mjs http://127.0.0.1:5173/ [outDir]
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const url = process.argv[2] ?? 'http://127.0.0.1:5173/';
const outDir = resolve(process.argv[3] ?? 'preview');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME });

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    isMobile: vp.isMobile,
    hasTouch: vp.isMobile,
    colorScheme: 'light',
  });
  const page = await context.newPage();

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(String(err)));

  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);

  // Первый экран
  await page.screenshot({ path: join(outDir, `${vp.name}-fold.png`) });

  // Прокручиваем до низа, чтобы отработали появления по скроллу, затем снимаем страницу целиком
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(outDir, `${vp.name}-full.png`), fullPage: true });

  const metrics = await page.evaluate(() => ({
    scrollHeight: document.body.scrollHeight,
    scrollWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth,
  }));

  console.log(
    `${vp.name}: ${vp.width}x${vp.height} | page ${metrics.scrollWidth}x${metrics.scrollHeight}` +
      (metrics.scrollWidth > metrics.innerWidth ? '  ⚠ ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ' : '') +
      (errors.length ? `\n  ошибки консоли: ${errors.join(' | ')}` : '\n  ошибок консоли нет'),
  );

  await context.close();
}

await browser.close();
console.log(`\nПревью сохранены в ${outDir}`);
