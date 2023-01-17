import { expect, test } from '@playwright/test';
import { checkSuccessMsg, closePopWindow, useUserStorageState } from '../utils/global';
import {
  globalModalSubmitBtn,
  setModalFormItemValue,
  setSelectValue,
  setCascaderValue,
  clickUnfoldBtn,
  setQueryCascaderValue,
  setQuerySelectValue,
} from '../utils/form';
test.describe('The Camera Page', () => {
  const pageUrl = '/system/site';
  const center_site_url = '/center/site';
  const site_name = 'testmqtt';
  const mqtt_pwd = 'mqtt@123';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('successfully config site', async ({ page }) => {
    await page.click('#siteName');
    await setModalFormItemValue(page, '#name', site_name);
    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);

    await page.click('#siteConfig');
    await setModalFormItemValue(page, '#host', '127.0.0.1');
    await setModalFormItemValue(page, '#port', '1883');
    await setModalFormItemValue(page, '#username', 'root');
    await setModalFormItemValue(page, '#password', mqtt_pwd);
    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);

    await page.goto(center_site_url);
    const edge_site_name = await page
      .locator('.ant-list-items > li:nth-child(1) > div:nth-child(1)')
      .textContent();
    expect(edge_site_name).toEqual(site_name);
  });
});
