import { expect, test } from "@playwright/test";
import { LoginPageClass } from "../pages/LoginPage";
import * as dotenv from 'dotenv'

dotenv.config({ path: './config/.env' });

test.describe('test group Add cart',()=>{
    test('test Check Add cart', async({page})=>{
        const LoginPage = new LoginPageClass(page);
        LoginPage.Login('standard_user','secret_sauce')
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
})
