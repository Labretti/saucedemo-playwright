import { test as base } from "@playwright/test";

export const test = base.extend({
    page: async ({ page }, use) => {
        // Setup перед каждым тестом
        await page.setViewportSize({
            width: 1920,
            height: 1080,
        });

        // Передаём page в тест
        await use(page);

        // Здесь при необходимости можно добавить cleanup
    },
});

export { expect } from "@playwright/test";