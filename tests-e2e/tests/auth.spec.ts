import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/";

test('should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In"}).click();

  await expect(page.getByRole("heading", { name: "Sign In to your Account" })).toBeVisible();

  await page.locator("[name=email]").fill("lartey.princ@gmail.com");
  await page.locator("[name=password]").fill("5Kgtbu30");

  await page.getByRole("button", { name: "Sign In" }).click()

  await expect(page.getByText("Sign In Successful!!")).toBeVisible()
  await expect(page.getByRole("link", { name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", { name: "Log Out"})).toBeVisible();
});

test('should allow user to register', async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 10000}@test.com`
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In"}).click();
  await page.getByRole("link", { name: "Create an account here!"}).click();
  await expect(page.getByRole("heading", { name: "Create an Account" })).toBeVisible();

  await page.locator("[name=firstName]").fill("Prince")
  await page.locator("[name=lastName]").fill("Lartey")
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("5Kgtbu30");
  await page.locator("[name=confirmPassword]").fill("5Kgtbu30");

  await page.getByRole("button", { name: "Create Account" }).click()

  await expect(page.getByText("Registration Successful!!")).toBeVisible()
  await expect(page.getByRole("link", { name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", { name: "Log Out"})).toBeVisible();
})
