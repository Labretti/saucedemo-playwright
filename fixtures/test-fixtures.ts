import { test } from '../fixtures/test-fixtures';

const username = 'standard_user';
const password = 'secret_sauce';

const productName = 'Sauce Labs Backpack';
const productPrice = '$29.99';

test('Test 1 - Successful login', async ({
                                             loginPage,
                                             inventoryPage,
                                         }) => {
    await loginPage.open();

    await loginPage.login(
        username,
        password
    );

    await loginPage.expectSuccessfulLogin();

    await inventoryPage.expectProductsPage();
});

test('Test 2 - Add product to cart', async ({
                                                loginPage,
                                                inventoryPage,
                                                cartPage,
                                            }) => {
    await loginPage.open();

    await loginPage.login(
        username,
        password
    );

    await inventoryPage.addProductToCart(
        productName
    );

    await inventoryPage.expectCartCount('1');

    await inventoryPage.openCart();

    await cartPage.expectProduct(
        productName,
        productPrice
    );
});

test('Test 3 - Complete checkout', async ({
                                              loginPage,
                                              inventoryPage,
                                              cartPage,
                                              checkoutPage,
                                          }) => {
    await loginPage.open();

    await loginPage.login(
        username,
        password
    );

    await inventoryPage.addProductToCart(
        productName
    );

    await inventoryPage.openCart();

    await cartPage.checkout();

    await checkoutPage.fillCustomerInfo(
        'Sergey',
        'Topal',
        '65000'
    );

    await checkoutPage.expectProduct(
        productName,
        productPrice
    );

    await checkoutPage.finishOrder();

    await checkoutPage.expectOrderCompleted();
});