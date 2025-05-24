import {expect , test} from '@playwright/test'
import { LoginPageClass } from '../pages/LoginPage';
import * as dotenv from 'dotenv'

dotenv.config({ path: './config/.env' });


test.describe('test group sort',()=>{

    test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto(process.env.BASEURL!);
    const LoginPage = new LoginPageClass(page);
    await LoginPage.Login(process.env.USER_NAME!, process.env.PASSWORD!);
    await page.context().storageState({ path: 'storage/state.json' });
    console.log('beforeAll sort')
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/inventory.html');
        console.log('beforeEach sort')
    });
    
    test('test check sort item A-Z', async({page})=>{
        await page.waitForTimeout(2000)
        await page.locator('[data-test="product-sort-container"]').selectOption('az')
    })

    test('test check sort item High Price- Low Price', async({page})=>{
        await page.waitForTimeout(2000)
        await page.locator('[data-test="product-sort-container"]').selectOption('hilo')

        await page.waitForTimeout(5000)

    })

    test.afterAll('afterAll', async({page})=>{
        await page.close();
        console.log('end sort')
    })

})