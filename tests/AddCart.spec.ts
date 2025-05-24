import { expect, test } from "@playwright/test";
import { LoginPageClass } from "../pages/LoginPage";
import * as dotenv from 'dotenv'

dotenv.config({ path: './config/.env' });

test.describe('test group Add cart',()=>{
    test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto(process.env.BASEURL!);
    const LoginPage = new LoginPageClass(page);
    await LoginPage.Login(process.env.USER_NAME!, process.env.PASSWORD!);
    await page.context().storageState({ path: 'storage/state.json' });
    console.log('beforAll Add cart')
    })

    test.beforeEach(async ({ page }) => {
        await page.goto('/inventory.html');
        console.log('beforeEach Add cart')
    })

    test('test Check Add cart', async({page})=>{

        await page.waitForTimeout(1000)
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        await page.waitForTimeout(1000)
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        await page.locator('[data-test="shopping-cart-link"]').click()
        await page.waitForTimeout(1000)
        await expect(page.locator('.cart_item:has-text("Sauce Labs Bike Light")')).toBeVisible()
        await expect(page.locator('.cart_item:has-text("Sauce Labs Backpack")')).toBeVisible()
        await page.locator('[data-test="continue-shopping"]').click()
    })
    test.afterAll(async ({ page }) => {
        await page.close()
        console.log('afterAll Add cart')
    })
})
