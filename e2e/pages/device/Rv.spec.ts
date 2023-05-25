import { test } from '@playwright/test';
import { generateIntNum, generateNumLetter, generatePureNumber } from '../../utils';
import { clickBackToListBtn } from '../../utils/detail';
import {
  globalModalSubmitBtn,
  setModalFormItemValue,
  setSelectValue,
  clickUnfoldBtn,
  setQueryCascaderValue,
  setQuerySelectValue,
  setCascaderValue,
} from '../../utils/form';
import {
  checkDetailPage,
  checkSuccessMsg,
  closePopWindow,
  useUserStorageState,
  provinceNameVal,
  queryprovinceNameVal,
} from '../../utils/global';
import {
  clickConfirmModalOkBtn,
  clickCreateBtn,
  clickDeleteTextBtn,
  clickNameBtn,
  clickEditBtn,
  clickEnableDisableTextBtn,
  searchItemAndQuery,
  checkTableItemContainValue,
  clickMoreBtn,
} from '../../utils/table';

test.describe('The Lidar Page', () => {
  const randomNumLetter = generateNumLetter();
  const randomNum = generatePureNumber();
  const RvNameVal = `lidar_name_${1}`;
  const RvSnVal = `rvsn_`;
  const lng = generateIntNum({ max: 180 });
  const lat = generateIntNum({ max: 90 });
  const descVal = 'test description info';
  const pageUrl = '/device/thunder-vision';
  const rvIPVal = [
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
  ].join('.');
  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('successfully create rv', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#name', RvNameVal);
    await setModalFormItemValue(page, '#sn', RvSnVal);
    await setModalFormItemValue(page, '#lng', String(lng));
    await setModalFormItemValue(page, '#lat', String(lat));
    await setModalFormItemValue(page, '#elevation', randomNum);
    await setModalFormItemValue(page, '#towards', randomNum);
    await setModalFormItemValue(page, '#radarCameraIP', rvIPVal);
    await setModalFormItemValue(page, '#point', randomNumLetter);
    await setModalFormItemValue(page, '#pole', randomNumLetter);
    await setModalFormItemValue(page, '#videoStreamAddress', randomNumLetter);
    await setModalFormItemValue(page, '#desc', descVal);
    await setSelectValue(page, 'rsuID', '#rsuID_list');

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully query via rv name', async ({ page }) => {
    await searchItemAndQuery(page, '#name', RvNameVal);
    await checkTableItemContainValue(page, RvNameVal, 1);
  });

  test('successfully query via rvSn', async ({ page }) => {
    await searchItemAndQuery(page, '#sn', RvSnVal);
    await checkTableItemContainValue(page, RvSnVal, 1);
  });

  test('successfully query via associated rsu', async ({ page }) => {
    await clickUnfoldBtn(page);
    const res_v: any = await setQuerySelectValue(page, '#rsuID');
    await checkTableItemContainValue(page, res_v, 6);
  });

  test('successfully edit rv', async ({ page }) => {
    await searchItemAndQuery(page, '#name', RvNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${RvNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view  rv detail', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${RvNameVal}`);
    await clickNameBtn(page);
    await checkDetailPage(page);
    await clickBackToListBtn(page);
  });

  test('successfully enable and disable rv', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${RvNameVal}`);
    await clickMoreBtn(page);
    await clickEnableDisableTextBtn(page, 'text="禁用"');
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully delete rv', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${RvNameVal}`);
    await clickMoreBtn(page);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});
