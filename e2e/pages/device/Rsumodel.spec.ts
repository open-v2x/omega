import { test } from '@playwright/test';
import { generateNumLetter } from '../../utils';
import { globalModalSubmitBtn, setModalFormItemValue } from '../../utils/form';
import { checkSuccessMsg, useUserStorageState } from '../../utils/global';
import {
  checkTableItemContainValue,
  clickConfirmModalOkBtn,
  clickCreateBtn,
  clickDeleteTextBtn,
  clickEditBtn,
  searchItemAndQuery,
  clickMoreBtn,
} from '../../utils/table';

test.describe('The RsuModel Page', () => {
  const randomNumLetter = generateNumLetter();
  const rsumodelNameVal = `model_name_${1}`;
  const manufacturerVal = `C_${randomNumLetter}`;
  const descVal = 'test description info';
  const pageUrl = '/device/model';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('successfully create rsumodel', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#name', rsumodelNameVal);
    await setModalFormItemValue(page, '#manufacturer', manufacturerVal);
    await setModalFormItemValue(page, '#desc', descVal);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully query via rsuModelName', async ({ page }) => {
    await searchItemAndQuery(page, '#name', rsumodelNameVal);
    await checkTableItemContainValue(page, rsumodelNameVal, 1);
  });

  test('successfully query via manufacturer', async ({ page }) => {
    await searchItemAndQuery(page, '#manufacturer', manufacturerVal);
    await checkTableItemContainValue(page, manufacturerVal, 2);
  });

  test('successfully edit rsumodel', async ({ page }) => {
    await searchItemAndQuery(page, '#name', rsumodelNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${rsumodelNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully delete rsumodel', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${rsumodelNameVal}`);
    await clickMoreBtn(page);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});
