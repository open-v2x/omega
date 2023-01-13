import { test } from '@playwright/test';
import {
  globalModalSubmitBtn,
  editAlgoConfigSelectValue,
  setSelectValue,
  setModalFormItemValue,
} from '../../utils/form';
import { checkErrorMsg, checkSuccessMsg, useUserStorageState } from '../../utils/global';
import {
  clickConfirmModalOkBtn,
  clickCreateBtn,
  clickDeleteTextBtn,
  searchItemAndQuery,
  checkTableItemContainValue,
  checkTableItemEqualValue,
} from '../../utils/table';

test.describe('The Algorithm Version and Config Page', () => {
  const versionpageUrl = '/algorithm/version';
  const configpageUrl = '/algorithm/config';
  const randomNumLetter = 'arm64';
  const algo_name = 'rsi_formatter';
  const real_algo = 'rsi'; // 项目已实现的算法版本名

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test('successfully create algo version', async ({ page }) => {
    await page.goto(versionpageUrl);
    await clickCreateBtn(page);

    await setSelectValue(page, 'module', '#module_list');
    await setSelectValue(page, 'algo', '#algo_list');
    await setModalFormItemValue(page, '#version', randomNumLetter);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });
  test('create repeat algo version failedly', async ({ page }) => {
    await page.goto(versionpageUrl);
    await clickCreateBtn(page);

    await setSelectValue(page, 'module', '#module_list');
    await setSelectValue(page, 'algo', '#algo_list');
    await setModalFormItemValue(page, '#version', randomNumLetter);

    await globalModalSubmitBtn(page);
    await checkErrorMsg(page);
  });
  test.skip('create repeat default algo version failedly', async ({ page }) => {
    // 创建同名算法版本，与已实现的算法版本同名，预期是创建失败
    await page.goto(versionpageUrl);
    await clickCreateBtn(page);

    await setSelectValue(page, 'module', '#module_list');
    await setSelectValue(page, 'algo', '#algo_list');
    await setModalFormItemValue(page, '#version', real_algo);

    await globalModalSubmitBtn(page);
    await checkErrorMsg(page);
  });
  test('successfully query via version', async ({ page }) => {
    await page.goto(versionpageUrl);
    await searchItemAndQuery(page, '#version', randomNumLetter);
    await checkTableItemContainValue(page, randomNumLetter, 3);
  });
  test('successfully edit config', async ({ page }) => {
    await page.goto(configpageUrl);
    await searchItemAndQuery(page, '#algo', algo_name);
    await editAlgoConfigSelectValue(page, '禁用', 2);
    await checkSuccessMsg(page);
    // 检查是否编辑成功
    await searchItemAndQuery(page, '#algo', algo_name);
    await checkTableItemEqualValue(page, '禁用', 4);
    await checkTableItemEqualValue(page, randomNumLetter, 3);
  });
  test('config in use can not delete ', async ({ page }) => {
    await page.goto(versionpageUrl);
    await searchItemAndQuery(page, '#version', randomNumLetter);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkErrorMsg(page);
  });
  test('successfully delete version', async ({ page }) => {
    // 恢复原样
    await page.goto(configpageUrl);
    await editAlgoConfigSelectValue(page, '启用', 1);
    // 删除版本
    await page.goto(versionpageUrl);
    await searchItemAndQuery(page, '#version', randomNumLetter);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});
