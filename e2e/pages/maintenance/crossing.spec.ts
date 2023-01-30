import { test, expect } from '@playwright/test';
import { generateIntNum } from '../../utils';
import {
  globalModalSubmitBtn,
  setModalFormItemValue,
  setCascaderValue,
  setQueryCascaderValue,
} from '../../utils/form';
import { checkErrorMsg, checkSuccessMsg, useUserStorageState } from '../../utils/global';

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

  test('预期无法创建同编号的路口', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#name', crossnNameVal);
    await setModalFormItemValue(page, '#code', crossnNameVal);
    await setCascaderValue(page, 'province', provinceNameVal);
    await setModalFormItemValue(page, '#lng', String(lng));
    await setModalFormItemValue(page, '#lat', String(lat));

    await globalModalSubmitBtn(page);
    await checkErrorMsg(page);
  });

  const crossNameID_correct = ['&', '-&-', '%#@&*（）']; // &前面是路口名，后面是路口编号
  for (const name_id of crossNameID_correct) {
    test(`testing with ${name_id},对路口名和路口编号进行校验,错误输入无法提交`, async ({
      page,
    }) => {
      const nameVal = name_id.split('&')[0];
      const idVal = name_id.split('&')[1];
      await clickCreateBtn(page);

      await setModalFormItemValue(page, '#name', nameVal);
      await setModalFormItemValue(page, '#code', idVal);
      await setCascaderValue(page, 'province', provinceNameVal);
      await setModalFormItemValue(page, '#lng', String(lng));
      await setModalFormItemValue(page, '#lat', String(lat));

      await globalModalSubmitBtn(page);
      const locator = page.locator('xpath=//input[@id="code"]/parent::span');
      expect(locator).toHaveClass(/ant-input-affix-wrapper-status-error/);
    });
  }

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