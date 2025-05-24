import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(process.env.BASEURL!);
  await page.fill('[data-test="username"]', process.env.USER_NAME!);
  await page.fill('[data-test="password"]', process.env.PASSWORD!);
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');

  await page.context().storageState({ path: 'storage/state.json' });
 // await browser.close();
})();
