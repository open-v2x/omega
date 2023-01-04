import { test } from '@playwright/test';
import { generateIntNum } from '../../utils';
import {
  globalModalSubmitBtn,
  setModalFormItemValue,
  setCascaderValue,
  setQueryCascaderValue,
} from '../../utils/form';
import { checkSuccessMsg, gotoPageAndExpectUrl, useUserStorageState } from '../../utils/global';

import {
  clickConfirmModalOkBtn,
  clickCreateBtn,
  clickDeleteTextBtn,
  clickEditBtn,
  searchItemAndQuery,
  checkTableItemContainValue,
  checkTableItemEqualValue,
} from '../../utils/table';

test.describe('The Crossing Page', () => {
  const crossnNameVal = 'e2etestCrossName';
  const pageUrl = '/maintenance/crossing';
  const provinceNameVal = [0, 1, 2, 4];
  const queryprovinceNameVal = [0, 1, 2, 5];
  const lng = generateIntNum({ max: 180 });
  const lat = generateIntNum({ max: 90 });

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('successfully create cross', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#name', crossnNameVal);
    await setModalFormItemValue(page, '#code', crossnNameVal);
    await setCascaderValue(page, 'province', provinceNameVal);
    await setModalFormItemValue(page, '#lng', String(lng));
    await setModalFormItemValue(page, '#lat', String(lat));

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully query via cross name', async ({ page }) => {
    await searchItemAndQuery(page, '#name', crossnNameVal);
    await checkTableItemContainValue(page, crossnNameVal, 1);
  });

  test('successfully query via cross address', async ({ page }) => {
    const address: any = await setQueryCascaderValue(page, queryprovinceNameVal);
    const res = address.replace(/[\s\/]/g, ''); // 去掉空格和斜杠
    await checkTableItemEqualValue(page, res, 2);
  });

  test('successfully edit cross', async ({ page }) => {
    await searchItemAndQuery(page, '#name', crossnNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${crossnNameVal}`);
    await setModalFormItemValue(page, '#code', `update_${crossnNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully delete cross', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${crossnNameVal}`);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});
