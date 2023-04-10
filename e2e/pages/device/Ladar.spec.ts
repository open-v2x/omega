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
  searchItemAndQuery,
  checkTableItemContainValue,
  clickMoreBtn,
} from '../../utils/table';

test.describe('The Ladar Page', () => {
  const randomNum = generatePureNumber();
  const ladarNameVal = `ladar_name_${1}`;
  const ladarnSnVal = `C_ladar_sn`;
  const lng = generateIntNum({ max: 180 });
  const lat = generateIntNum({ max: 90 });
  const descVal = 'test description info';
  const pageUrl = '/device/radar';
  const ladarIPVal = [
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

  test('successfully create ladar', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#name', ladarNameVal);
    await setModalFormItemValue(page, '#sn', ladarnSnVal);
    await setModalFormItemValue(page, '#lng', String(lng));
    await setModalFormItemValue(page, '#lat', String(lat));
    await setModalFormItemValue(page, '#elevation', randomNum);
    await setModalFormItemValue(page, '#towards', randomNum);
    await setModalFormItemValue(page, '#radarIP', ladarIPVal);
    await setModalFormItemValue(page, '#desc', descVal);
    await setSelectValue(page, 'rsuId', '#rsuId_list');

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully query via ladar name', async ({ page }) => {
    await searchItemAndQuery(page, '#name', ladarNameVal);
    await checkTableItemContainValue(page, ladarNameVal, 1);
  });

  test('successfully query via ladar sn', async ({ page }) => {
    await searchItemAndQuery(page, '#sn', ladarnSnVal);
    await checkTableItemContainValue(page, ladarnSnVal, 2);
  });

  test('successfully query via associated rsu', async ({ page }) => {
    await clickUnfoldBtn(page);
    const res_v: any = await setQuerySelectValue(page, '#rsuId');
    await checkTableItemContainValue(page, res_v, 9);
  });

  test('successfully edit ladar', async ({ page }) => {
    await searchItemAndQuery(page, '#name', ladarNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${ladarNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view  ladar detail', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${ladarNameVal}`);
    await clickNameBtn(page);
    await checkDetailPage(page);
    await clickBackToListBtn(page);
  });

  test('successfully delete ladar', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${ladarNameVal}`);
    await clickMoreBtn(page);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});
