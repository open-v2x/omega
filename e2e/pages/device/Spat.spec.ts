import { test } from '@playwright/test';
import { generateIntNum, generateNumLetter } from '../../utils';
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
  checkDetaillWindow,
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
  clickDetailTextBtn,
  clickEditBtn,
  clickEnableDisableTextBtn,
  searchItemAndQuery,
  checkTableItemContainValue,
  checkTableItemEqualValue,
} from '../../utils/table';

test.describe('The Spat Page', () => {
  const randomNumLetter = generateNumLetter();
  const spatNameVal = `spat_name_${1}`;
  const spatSnVal = `C_${randomNumLetter}`;
  const phaseId = generateIntNum({ max: 255 });
  const descVal = 'test description info';
  const pageUrl = '/device/spat';
  const spatIPVal = [
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

  test('successfully create spat', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#name', spatNameVal);
    await setModalFormItemValue(page, '#intersectionId', spatSnVal);
    await setModalFormItemValue(page, '#phaseId', String(phaseId));
    await setModalFormItemValue(page, '#spatIP', spatIPVal);
    await setModalFormItemValue(page, '#point', randomNumLetter);
    await setModalFormItemValue(page, '#desc', descVal);
    await setSelectValue(page, 'rsuId', '#rsuId_list');
    await setSelectValue(page, 'light', '#light_list');
    await setCascaderValue(page, 'province', provinceNameVal);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully query via spat name', async ({ page }) => {
    await searchItemAndQuery(page, '#name', spatNameVal);
    await checkTableItemContainValue(page, spatNameVal, 1);
  });

  test('successfully query via spat sn', async ({ page }) => {
    await searchItemAndQuery(page, '#intersectionId', spatSnVal);
    await checkTableItemContainValue(page, spatSnVal, 2);
  });

  test('successfully query via spat address', async ({ page }) => {
    await clickUnfoldBtn(page);
    const address: any = await setQueryCascaderValue(page, queryprovinceNameVal);
    const res = address.replace(/[\s\/]/g, ''); // 去掉空格和斜杠
    await checkTableItemEqualValue(page, res, 4);
  });

  test('successfully query via associated rsu', async ({ page }) => {
    await clickUnfoldBtn(page);
    const res_v: any = await setQuerySelectValue(page, '#rsuName');
    await checkTableItemContainValue(page, res_v, 5);
  });

  test('successfully edit spat', async ({ page }) => {
    await searchItemAndQuery(page, '#name', spatNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${spatNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view  spat detail', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${spatNameVal}`);
    await clickDetailTextBtn(page);
    await checkDetaillWindow(page);
    await closePopWindow(page);
  });

  test('successfully enable and disable spat', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${spatNameVal}`);
    await clickEnableDisableTextBtn(page, 'text="禁用"');
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully delete spat', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${spatNameVal}`);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});
