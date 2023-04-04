import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import config from '../../playwright.config';
import { chromium, FullConfig } from '@playwright/test';
const username = 'admin';
const password = 'dandelion';
const basePort = '2288';
const baseURL = config.use?.baseURL;
const provinceNameVal = [0, 1, 2, 4, 5]; // 安装区域
const queryprovinceNameVal = [0, 1, 2, 3, 5];
export { provinceNameVal, queryprovinceNameVal };

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${baseURL}/device/rsu`);
  await page.fill('#username', username);
  await page.fill('#password', password);
  const submitBtn = page.locator('.ant-form button.ant-btn');
  await submitBtn.click();
  await expect(page).toHaveURL(`${baseURL}/device/rsu`);

  // Save signed-in state to 'userStorageState.json'.
  await page.context().storageState({ path: 'e2e/storage/userStorageState.json' });
  await browser.close();
}

export default globalSetup;

// Save signed-in state to 'userStorageState.json'.
export const saveUserStorageState = async (page: Page) => {
  await page.context().storageState({ path: 'e2e/storage/userStorageState.json' });
};
export const Login = async (page: Page) => {
  await page.goto('/user/login');
  await page.fill('#username', username);
  await page.fill('#password', password);
  const submitBtn = page.locator('.ant-form button.ant-btn');
  await submitBtn.click();
  await expect(page).toHaveURL('/device/rsu');

  // Save signed-in state to 'userStorageState.json'.
  await saveUserStorageState(page);
};
export const gotoPageAndExpectUrl = async (page: Page, url: string) => {
  await Login(page);
  await page.goto(url);
  await expect(page).toHaveURL(new RegExp(url));
};

// Use signed-in state of 'userStorageState.json'.
export const useUserStorageState = () => {
  test.use({ storageState: 'e2e/storage/userStorageState.json' });
};

export const checkSuccessMsg = async (page: Page) => {
  return await expect(page.locator('.ant-message .ant-message-success')).toBeVisible();
};

export const checkErrorMsg = async (page: Page) => {
  return await expect(page.locator('.ant-message .ant-message-error')).toBeVisible();
};

export const checkDetaillWindow = async (page: Page) => {
  return await expect(page.locator('.ant-modal-content')).toBeVisible();
};

export const checkDetailPage = async (page: Page) => {
  return await expect(page.locator('.ant-row').first()).toBeVisible();
};

export const closePopWindow = async (page: Page) => {
  await page.locator('.ant-modal-close-x').click();
};

export const uploadFile = async (page: Page, selector: string, file_path: string) => {
  await page.setInputFiles(selector, file_path);
};

export const checkDetailUrl = async (page: Page, pageUrl: string) => {
  await expect(page).toHaveURL(new RegExp(`${pageUrl}/details`));
};

export const gotoRoadSimulator = async (page: Page) => {
  const road_simulator_url = baseURL?.split(`:${basePort}`)[0];
  await page.goto(`${road_simulator_url}:6688`);
};
