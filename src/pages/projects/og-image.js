const path = require('path');
const fs = require('fs');
const { createHash } = require('crypto');

export async function generateOgImage(props) {
  const params = new URLSearchParams(props);
  const url = `file:${path.join(
    process.cwd(),
    `src/pages/projects/og-image.html?${params}`
  )}`;

  const hash = createHash('md5').update(url).digest('hex');
  const ogImageDir = path.join(process.cwd(), `public/og`);
  const imageName = `${hash}.png`;
  const imagePath = `${ogImageDir}/${imageName}`;
  const publicPath = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/og/${imageName}`;

  try {
    fs.statSync(imagePath);
    return publicPath;
  } catch (error) {
    // file does not exists, so we create it
  }

  // Use Chromium binary for Vercel, fallback to system Chrome for local development
  // Dynamically import to avoid bundling issues
  const puppeteer = require('puppeteer-core');
  const chromium = require('@sparticuz/chromium-min');
  const isVercel = process.env.VERCEL || process.env.VERCEL_ENV;
  
  try {
    const browser = await puppeteer.launch({
      args: isVercel 
        ? [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox']
        : ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: isVercel ? chromium.defaultViewport : { width: 1200, height: 630 },
      executablePath: isVercel ? await chromium.executablePath() : undefined,
      headless: isVercel ? chromium.headless : true,
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(url, { waitUntil: 'networkidle0' });
    const buffer = await page.screenshot();
    await browser.close();

    fs.mkdirSync(ogImageDir, { recursive: true });
    fs.writeFileSync(imagePath, buffer);

    return publicPath;
  } catch (error) {
    // If OG image generation fails (e.g., during build on Vercel), 
    // return undefined to fall back to default OG image
    console.warn('Failed to generate OG image:', error.message);
    return undefined;
  }
}
