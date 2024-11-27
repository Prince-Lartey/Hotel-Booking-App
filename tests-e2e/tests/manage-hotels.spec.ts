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

test("should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`)

    await page.locator('[name="name"]').fill("Test Hotel")
    await page.locator('[name="city"]').fill("Test City")
    await page.locator('[name="country"]').fill("Test Country")
    await page.locator('[name="description"]').fill("Test Description")
    await page.locator('[name="pricePerNight"]').fill("100")
    await page.selectOption('select[name="starRating"]', "3")

    await page.getByText("Boutique").click()

    await page.getByLabel("Restaurant").check()
    await page.getByLabel("Garden").check()

    await page.locator('[name="adultCount"]').fill("2")
    await page.locator('[name="childCount"]').fill("1")

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "7.jpg"),
        path.join(__dirname, "files", "3.jpeg"),
    ])

    await page.getByRole("button", { name: "Save" }).click()
    await expect(page.getByText("Hotel Saved!")).toBeVisible()
})

test("should display hotels", async({ page }) => {
    await page.goto(`${UI_URL}my-hotels`)

    await expect(page.getByText("Test Hotel")).toBeVisible()
    await expect(page.getByText("Test Description")).toBeVisible()
    await expect(page.getByText("Test City, Test Country")).toBeVisible()
    await expect(page.getByText("Boutique")).toBeVisible()
    await expect(page.getByText("100 per night")).toBeVisible();
    await expect(page.getByText("2 adults, 1 children")).toBeVisible()
    await expect(page.getByText("3 Star Rating")).toBeVisible()

    await expect(page.getByRole("link", { name: "View Details" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible()
})