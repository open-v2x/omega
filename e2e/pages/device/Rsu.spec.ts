import { test } from '@playwright/test';
import { generateIntNum, generateNumLetter, generatePureNumber } from '../../utils';
import { clickBackToListBtn } from '../../utils/detail';
import {
  globalModalSubmitBtn,
  setCascaderValue,
  setModalFormItemValue,
  setQuerySelectValue,
  setSelectValue,
  setQueryCascaderValue,
  clickUnfoldBtn,
} from '../../utils/form';
import {
  checkDetailUrl,
  checkSuccessMsg,
  gotoPageAndExpectUrl,
  useUserStorageState,
} from '../../utils/global';
import {
  checkTableItemContainValue,
  checkTableItemEqualValue,
  clickConfirmModalOkBtn,
  clickCreateBtn,
  clickDeleteBtn,
  clickDetailBtn,
  clickEditBtn,
  clickEnableDisableBtn,
  searchItemAndQuery,
} from '../../utils/table';

test.describe('The Rsu Page', () => {
  const randomNumLetter = generateNumLetter();
  const randomNum = generatePureNumber();
  const rsuNameVal = `rsu_name_${1}`;
  const queryRsuEsn = 'R328328';
  const rsuEsnVal = `R_${randomNumLetter}`;
  const rsuIdVal = `${randomNum}`;
  const rsuIPVal = [
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
  ].join('.');
  const provinceNameVal = [0, 1, 2, 4, 6];
  const queryprovinceNameVal = [0, 1, 2, 5, 6];
  const lng = generateIntNum({ max: 180 });
  const lat = generateIntNum({ max: 90 });
  const descVal = 'test description info';
  const pageUrl = '/device/rsu';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('successfully create rsu', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#rsuName', rsuNameVal);
    await setModalFormItemValue(page, '#rsuEsn', rsuEsnVal);
    await setModalFormItemValue(page, '#rsuId', rsuIdVal);
    await setModalFormItemValue(page, '#rsuIP', rsuIPVal);
    await setModalFormItemValue(page, '#lon', String(lng));
    await setModalFormItemValue(page, '#lat', String(lat));
    await setModalFormItemValue(page, '#desc', descVal);
    await setSelectValue(page, 'rsuModelId', '#rsuModelId_list');
    await setCascaderValue(page, 'province', provinceNameVal);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully query via rsuName', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuName', rsuNameVal);
    await checkTableItemContainValue(page, rsuNameVal, 2);
  });

  test('successfully query via rsuEsn', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuEsn', queryRsuEsn);
    await checkTableItemContainValue(page, queryRsuEsn, 3);
  });

  test('successfully query via status', async ({ page }) => {
    await clickUnfoldBtn(page);
    await setQuerySelectValue(page, '#enabled');
    await checkTableItemContainValue(page, '启用', 7);
  });

  test('successfully query via address', async ({ page }) => {
    await clickUnfoldBtn(page);
    const address: any = await setQueryCascaderValue(page, queryprovinceNameVal);
    const res = address.replace(/[\s\/]/g, ''); // 去掉空格和斜杠
    await checkTableItemEqualValue(page, res, 5);
  });

  test('successfully edit rsu', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuName', rsuNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#rsuName', `update_${rsuNameVal}`);
    await setModalFormItemValue(page, '#rsuEsn', rsuEsnVal);
    await setModalFormItemValue(page, '#rsuId', rsuIdVal);
    await setModalFormItemValue(page, '#rsuIP', rsuIPVal);
    await setModalFormItemValue(page, '#desc', `update ${descVal}`);
    await setSelectValue(page, 'rsuModelId', '#rsuModelId_list');
    await setCascaderValue(page, 'province', queryprovinceNameVal);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view detail', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuName', rsuNameVal);
    await clickDetailBtn(page);
    await checkDetailUrl(page, pageUrl);
    await clickBackToListBtn(page);
  });

  test('successfully enable and disable rsu', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuName', rsuNameVal);
    await clickEnableDisableBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully delete rsu', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuName', rsuNameVal);
    await clickDeleteBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});
