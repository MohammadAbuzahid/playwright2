import { test, expect } from '@playwright/test';
import { LoginPageClass } from '../pages/LoginPage';
import * as dotenv from 'dotenv'

dotenv.config({ path: './config/.env' });


test.describe('test group Login',()=>{
  test('test check sauce Demo page',async({page})=>{
    await page.goto(process.env.BASEURL!)
    const LoginPage = new LoginPageClass(page);
    LoginPage.Login(process.env.USER_NAME!,process.env.PASSWORD!)
    await expect(page).toHaveTitle('Swag Labs')
    await page.waitForTimeout(1000)

    await page.getByRole('button', { name: 'Open Menu' }).click()
    await page.waitForTimeout(1000)
    await page.locator('[data-test="logout-sidebar-link"]').click()
  })

  test.skip('test check Empty username and password',async({page})=>{
    await page.goto(process.env.BASEURL!)
    const LoginPage = new LoginPageClass(page);
    LoginPage.Login('','')
    await expect(page).toHaveTitle('Swag Labs')
    await page.locator('[data-test="login-button"]').click()
    await page.waitForTimeout(1000)
    expect(page.locator('[data-test="error"]')).toBeVisible()
    expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required')
  })

  test.fail('test check empty username',async({page})=>{
    await page.goto(process.env.BASEURL!)
    await expect(page).toHaveTitle('Swag Labs')
    const LoginPage = new LoginPageClass(page);
    LoginPage.Login('',process.env.PASSWORD!)
    await page.waitForTimeout(1000)
    await page.locator('[data-test="login-button"]').click()
    await page.waitForTimeout(1000)
    await expect(page.locator('[data-test="error"]')).toBeVisible()
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required')
  })

  test('test check empty password',async({page})=>{
    await page.goto(process.env.BASEURL!)
    await expect(page).toHaveTitle('Swag Labs')
    const LoginPage = new LoginPageClass(page);
    LoginPage.Login(process.env.USER_NAME!,'')
    await page.waitForTimeout(2000)
    await page.locator('[data-test="login-button"]').click()
    await page.waitForTimeout(2000)
    await expect(page.locator('[data-test="error"]')).toBeVisible()
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Password is required')
  })
})
