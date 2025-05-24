import {expect, test} from '@playwright/test';
import { LoginPageClass } from '../pages/LoginPage';
import * as dotenv from 'dotenv'

dotenv.config({ path: './config/.env' });

test.describe('test group Checkout',()=>{

    test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage()
    await page.goto(process.env.BASEURL!)
    const LoginPage = new LoginPageClass(page)
    await LoginPage.Login(process.env.USER_NAME!, process.env.PASSWORD!)
    await page.context().storageState({ path: 'storage/state.json' })
    console.log('beforeAll Checkout')
    })

    test.beforeEach(async ({ page }) => {
        await page.goto('/inventory.html')
        console.log('beforeEach Checkout')
    })

    test('Test check to checkout', async({page})=>{
        
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[data-test="shopping-cart-link"]').click()
        await page.locator('[data-test="checkout"]').click()
        await page.locator('[data-test="firstName"]').fill('mohammad')
        await page.locator('[data-test="lastName"]').fill('Abu zahid')
        await page.locator('[data-test="postalCode"]').fill('123')
        await page.locator('[data-test="continue"]').click()
        await page.locator('[data-test="finish"]').click()
        await page.locator('[data-test="back-to-products"]').click()
    })

    test.fail('Test check to first name ,last name and postal code is empty', async({page})=>{
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[data-test="shopping-cart-link"]').click()
        await page.locator('[data-test="checkout"]').click()
        await page.waitForTimeout(1000)
        await page.locator('[data-test="continue"]').click()
        await expect(page.locator('[data-test="error"]')).toBeVisible()
        await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required')
    })

    test.fixme('Test check to first name is empty', async({page})=>{
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[data-test="shopping-cart-link"]').click()
        await page.locator('[data-test="checkout"]').click()
        await page.waitForTimeout(1000)
        await page.locator('[data-test="lastName"]').fill('Abu zahid')
        await page.locator('[data-test="postalCode"]').fill('123')
        await page.locator('[data-test="continue"]').click()
        await expect(page.locator('[data-test="error"]')).toBeVisible()
        await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required')
    })

    test('Test check to last name is empty', async({page})=>{
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[data-test="shopping-cart-link"]').click()
        await page.locator('[data-test="checkout"]').click()
        await page.waitForTimeout(1000)
        await page.locator('[data-test="firstName"]').fill('mohammad')
        await page.locator('[data-test="postalCode"]').fill('123')
        await page.locator('[data-test="continue"]').click()
        await expect(page.locator('[data-test="error"]')).toBeVisible()
        await expect(page.locator('[data-test="error"]')).toContainText('Error: Last Name is required')
    })

    test('Test check to postal code name is empty', async({page})=>{
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[data-test="shopping-cart-link"]').click()
        await page.locator('[data-test="checkout"]').click()
        await page.waitForTimeout(1000)
        await page.locator('[data-test="firstName"]').fill('mohammad')
        await page.locator('[data-test="lastName"]').fill('Abu zahid')
        await page.locator('[data-test="continue"]').click()
        await expect(page.locator('[data-test="error"]')).toBeVisible()
        await expect(page.locator('[data-test="error"]')).toContainText('Error: Postal Code is required')
    })

    test('test cancel to checkout',async ({page})=>{
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[data-test="shopping-cart-link"]').click()
        await page.locator('[data-test="checkout"]').click()
        await page.waitForTimeout(1000)
        await page.locator('[data-test="cancel"]').click()
    })

    test('Test check to cancel back step to finish', async({page})=>{
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[data-test="shopping-cart-link"]').click()
        await page.locator('[data-test="checkout"]').click()
        await page.waitForTimeout(1000)
        await page.locator('[data-test="firstName"]').fill('mohammad')
        await page.waitForTimeout(1000)
        await page.locator('[data-test="lastName"]').fill('Abu zahid')
        await page.waitForTimeout(1000)
        await page.locator('[data-test="postalCode"]').fill('123')
        await page.waitForTimeout(1000)
        await page.locator('[data-test="continue"]').click()
        await page.waitForTimeout(1000)
        await page.locator('[data-test="cancel"]').click()
    })

    test.afterAll(async({page})=>{
        await page.close()
        console.log('afterAll checkout')
    })
})