# SauceDemo Playwright UI Tests

UI автотесты для сайта:
https://www.saucedemo.com/

## Технологии

- Playwright
- TypeScript
- Node.js

## Реализованные тесты

### Test 1 — Successful login

Проверяется:
- успешная авторизация;
- переход на страницу товаров;
- отображение заголовка Products.

### Test 2 — Add product to cart

Проверяется:
- авторизация;
- добавление Sauce Labs Backpack в корзину;
- счетчик корзины;
- название товара;
- цена товара.

### Test 3 — Complete checkout

Проверяется:
- авторизация;
- добавление товара в корзину;
- оформление заказа;
- заполнение First Name, Last Name и Postal Code;
- наличие выбранного товара на странице подтверждения;
- успешное завершение заказа.

## Установка зависимостей

```bash
npm install
```

## Запуск тестов

```bash
npx playwright test
```

## HTML-отчет

```bash
npx playwright show-report
```
