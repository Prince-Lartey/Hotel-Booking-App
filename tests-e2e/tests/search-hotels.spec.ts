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

test("should book hotel", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Test");

    const date = new Date();
    date.setDate(date.getDate() + 3);
    const formattedDate = date.toISOString().split("T")[0];
    await page.getByPlaceholder("Check-out date").fill(formattedDate);

    await page.getByRole("button", { name: "Search" }).click();

    await page.getByText("Test Hotel").click();
    await page.getByRole("button", { name: "Book now" }).click();

    await expect(page.getByText("Total Cost:")).toBeVisible();

    const stripeFrame = page.frameLocator("iframe").first();
    await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242");
    await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
    await stripeFrame.locator('[placeholder="CVC"]').fill("242");
    await stripeFrame.locator('[placeholder="ZIP"]').fill("24225");

    await page.getByRole("button", { name: "Confirm Booking" }).click();
    await expect(page.getByText("Booking Saved!")).toBeVisible();

    await page.getByRole("link", { name: "My Bookings" }).click();
    await expect(page.getByText("Test Hotel")).toBeVisible();
});