import { expect, test} from '@playwright/test';
import { LoginPageClass } from '../pages/LoginPage';
import * as dotenv from 'dotenv'

dotenv.config({ path: './config/.env' });

test.describe('test group Remove From cart',()=>{

    test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage()
    await page.goto(process.env.BASEURL!)
    const LoginPage = new LoginPageClass(page)
    await LoginPage.Login(process.env.USER_NAME!, process.env.PASSWORD!)
    await page.context().storageState({ path: 'storage/state.json' })
    console.log('beforeAll Remove from cart')
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/inventory.html')
        console.log('beforeEach Remove from cart')
    });

    test('remove item from cart', async({page, browserName})=>{
        if(browserName==='chromium'){
            console.log('test skip')
            test.skip()
        }
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        await page.waitForTimeout(2000)
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        await page.waitForTimeout(2000)
        await page.locator('[data-test="shopping-cart-link"]').click()
        await page.locator('[data-test="remove-sauce-labs-bike-light"]').click()
    })

    test('test remove item from page home', async({page})=>{
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        await page.waitForTimeout(2000)
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
        await page.waitForTimeout(2000)
        await page.locator('[data-test="remove-sauce-labs-bike-light"]').click()
    })

    test.afterAll(async({page})=>{
        await page.close()
        console.log('afterAll Remove from cart')
    })
})