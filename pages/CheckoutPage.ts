import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.successMessage = page.locator('[data-test="complete-header"]');
    }

    async fillCustomerInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    getProduct(productName: string) {
        return this.page
            .locator('[data-test="inventory-item"]')
            .filter({ hasText: productName });
    }

    async getProductName(productName: string) {
        return await this
            .getProduct(productName)
            .locator('[data-test="inventory-item-name"]')
            .textContent();
    }

    async getProductPrice(productName: string) {
        return await this
            .getProduct(productName)
            .locator('[data-test="inventory-item-price"]')
            .textContent();
    }

    async finishOrder() {
        await this.finishButton.click();
    }

    async getSuccessMessage() {
        return await this.successMessage.textContent();
    }
}