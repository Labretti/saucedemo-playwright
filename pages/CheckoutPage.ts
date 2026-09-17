import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillCustomerInfo(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {
        await this.page
            .locator('[data-test="firstName"]')
            .fill(firstName);

        await this.page
            .locator('[data-test="lastName"]')
            .fill(lastName);

        await this.page
            .locator('[data-test="postalCode"]')
            .fill(postalCode);

        await this.page
            .locator('[data-test="continue"]')
            .click();
    }

    async expectProduct(name: string, price: string) {
        const product = this.page
            .locator('[data-test="inventory-item"]')
            .filter({ hasText: name });

        await expect(
            product.locator('[data-test="inventory-item-name"]')
        ).toHaveText(name);

        await expect(
            product.locator('[data-test="inventory-item-price"]')
        ).toHaveText(price);
    }

    async finishOrder() {
        await this.page
            .locator('[data-test="finish"]')
            .click();
    }

    async expectOrderCompleted() {
        await expect(this.page).toHaveURL(
            /checkout-complete\.html/
        );

        await expect(
            this.page.locator('[data-test="complete-header"]')
        ).toHaveText('Thank you for your order!');
    }
}