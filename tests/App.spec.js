const { chromium } = require("playwright");
const { mail, pass } = require("../user");
const { test, expect } = require("@playwright/test");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
    // devtools: true,
  });
  const page = await browser.newPage();

  await page.goto("https://netology.ru");

  await page.click("text=Войти");

  await page.fill('[placeholder="Email"]', mail);

  await page.fill('[type="password"]', pass);

  await page.click('button:has-text("Войти")');

  await expect(page.locator("text=Мои курсы и профессии")).toBeVisible();

  await browser.close();
})();

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
    // devtools: true,
  });

  const page = await browser.newPage();

  await page.goto("https://netology.ru");

  await page.click("text=Войти");

  await page.fill('[placeholder="Пароль"]', "pass");

  await page.fill('[placeholder="Email"]', "mail@mail.ru");

  await page.click('button:has-text("Войти")');

  await expect(
    page.locator("text=Вы ввели неправильно логин или пароль")
  ).toBeVisible();

  await browser.close();
})();
