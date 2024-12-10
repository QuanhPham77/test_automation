import { test, expect } from "@playwright/test";

test.describe("Test input empty", () => {
  // truong hop de trong email
  test("test input email empty", async ({ page }) => {
    await page.goto("https://id.ezcloud.vn/Account/Register/");

    const inputEmail = page.locator("#Email");
    const boxErrEmail = page.locator("#Email-error");

    await inputEmail.fill("");
    await inputEmail.blur();
    await page.locator("#terms").click();
    await page.locator("#terms").check();
    await page.getByRole("button", { name: "Register" }).click();
    await expect(boxErrEmail).toBeVisible();
    await expect(boxErrEmail).toHaveText("Email is required.");
  });

  // truong hop de trong password
  test("test input password empty", async ({ page }) => {
    await page.goto("https://id.ezcloud.vn/Account/Register/");

    const inputPassword = page.locator("#password");
    const boxErrPass = page.locator("#password-error");

    await inputPassword.fill("");
    await inputPassword.blur();
    await page.locator("#terms").click();
    await page.locator("#terms").check();
    await page.getByRole("button", { name: "Register" }).click();
    await expect(boxErrPass).toBeVisible();
    await expect(boxErrPass).toHaveText("Password is required.");
  });
});

test.describe("Test validate input", () => {
  // kiem tra input email
  test("Check validate email", async ({ page }) => {
    await page.goto("https://id.ezcloud.vn/Account/Register/");

    const boxErrEmail = page.locator("#Email-error");

    await page.fill("#Email", "pqa0710gmail.com");
    await page.locator("#terms").click();
    await page.locator("#terms").check();

    const valEmail = await page.locator('input[name="Email"]').inputValue();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    await page.getByRole("button", { name: "Register" }).click();

    if (!emailRegex.test(valEmail)) {
      await expect(boxErrEmail).toBeVisible();
      await expect(boxErrEmail).toHaveText("Invalid Email Address.");
    }
  });

  // kiem tra input password
  // test("check validate password", async ({ page }) => {
  //   await page.goto("https://id.ezcloud.vn/Account/Register/");

  //   const inputPass = page.locator("#password");
  //   const boxErrPass = page.locator("#password-error");
  //   const valPass1 = "aaa";
  //   const valPass2 = 1;
  //   const valPass3 = "quanhpham07";
  //   const srcErr = "/images/check3.svg";
  //   const srcTrue = "/images/check2.svg";

  //   await page.getByLabel("Password rules").click();
  //   await inputPass.fill(valPass1);
  //   await expect(
  //     page.getByRole("heading", { name: "Password rules" })
  //   ).toBeVisible();

  //   await inputPass.fill(valPass3);
  //   await inputPass.blur();

  //   const imgElement1 = page
  //     .getByRole("tooltip", { name: "Password rules Contains at" })
  //     .getByRole("img")
  //     .first();
  //   const imgElement2 = page
  //     .getByRole("tooltip", { name: "Password rules Contains at" })
  //     .getByRole("img")
  //     .nth(1);
  //   const imgElement3 = page
  //     .getByRole("tooltip", { name: "Password rules Contains at" })
  //     .getByRole("img")
  //     .nth(2);

  //   await expect(imgElement1).toHaveAttribute("src", srcErr);
  //   await expect(imgElement2).toHaveAttribute("src", srcTrue);
  //   await expect(imgElement3).toHaveAttribute("src", srcErr);
  // });

  // kiem tra input confirm password
  test("Check confirm password", async ({ page }) => {
    await page.goto("https://id.ezcloud.vn/Account/Register/");

    const boxErrCfPass = page.locator("#ConfirmPassword-error");
    const inputPassword = page.locator("#password");
    const inputCfPass = page.locator("#ConfirmPassword");

    await inputPassword.fill("quanhpham07");
    await inputPassword.blur();
    const valPass = await page.locator('input[name="Password"]').inputValue();
    await inputCfPass.fill("quanhpham7");
    const valCfPass = await page
      .locator('input[name="ConfirmPassword"]')
      .inputValue();
    await inputCfPass.blur();

    if (valPass != valCfPass) {
      await expect(boxErrCfPass).toHaveText("Passwords do not match.");
    }
  });
});

// dang ky thanh cong
test("Registration successful", async ({ page }) => {
  let count = 0;
  await page.goto("https://id.ezcloud.vn/Account/Register/");

  const inputEmail = page.locator("#Email");
  const inputPassword = page.locator("#password");
  const inputCfPass = page.locator("#ConfirmPassword");
  const boxErrEmail = page.locator("#Email-error");
  const boxErrPass = page.locator("#password-error");
  const boxErrCfPass = page.locator("#ConfirmPassword-error");

  await inputEmail.fill(`quanhpham${count++}@gmail.com`);
  await inputEmail.blur();
  await inputPassword.fill("quanhpham07");
  await inputPassword.blur();
  await inputCfPass.fill("quanhpham07");
  await inputCfPass.blur();
  await page.locator("#terms").click();
  await page.locator("#terms").check();

  await expect(boxErrEmail).not.toBeVisible();
  await expect(boxErrPass).not.toBeVisible();
  await expect(boxErrCfPass).not.toBeVisible();

  await page.getByRole("button", { name: "Register" }).click();
  await expect(page).toHaveURL(
    "https://id.ezcloud.vn/Account/RegisterWithoutUsername"
  );
});
