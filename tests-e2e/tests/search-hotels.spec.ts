import { test, expect } from "@playwright/test"
import path from "path";

const UI_URL = "http://localhost:5173/"

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Sign In"}).click();

    await expect(page.getByRole("heading", { name: "Sign In to your Account" })).toBeVisible();

    await page.locator("[name=email]").fill("lartey.princ@gmail.com");
    await page.locator("[name=password]").fill("5Kgtbu30");

    await page.getByRole("button", { name: "Sign In" }).click()

    await expect(page.getByText("Sign In Successful!!")).toBeVisible()
})

test("Should show hotel search results", async ({ page }) => {
    await page.goto(UI_URL)

    await page.getByPlaceholder("Where are you going?").fill("Test");
    await page.getByRole("button", { name: "Search" }).click();

    await expect(page.getByText("Hotels found in Test")).toBeVisible();
    await expect(page.getByText("Test Hotel")).toBeVisible();
})

test("should show hotel detail", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Test");
    await page.getByRole("button", { name: "Search" }).click();

    await page.getByText("Test Hotel").click();
    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});