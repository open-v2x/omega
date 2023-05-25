import { test } from '@playwright/test';
import { generateIntNum, generateNumLetter, generatePureNumber } from '../../utils';
import { clickBackToListBtn } from '../../utils/detail';
import {
  globalModalSubmitBtn,
  setModalFormItemValue,
  setSelectValue,
  setCascaderValue,
  clickUnfoldBtn,
  setQueryCascaderValue,
  setQuerySelectValue,
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
  checkTableItemEqualValue,
  clickMoreBtn,
} from '../../utils/table';

test.describe('The Camera Page', () => {
  const randomNumLetter = generateNumLetter();
  const randomNum = generatePureNumber();
  const cameraNameVal = `camera_name_${1}`;
  const camernSnVal = `C_${randomNumLetter}`;
  const videoUrl = generateNumLetter();
  const lng = generateIntNum({ max: 180 });
  const lat = generateIntNum({ max: 90 });
  const descVal = 'test description info';
  const pageUrl = '/device/camera';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('successfully create camera', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#name', cameraNameVal);
    await setModalFormItemValue(page, '#sn', camernSnVal);
    await setModalFormItemValue(page, '#streamUrl', videoUrl);
    await setModalFormItemValue(page, '#lng', String(lng));
    await setModalFormItemValue(page, '#lat', String(lat));
    await setModalFormItemValue(page, '#elevation', randomNum);
    await setModalFormItemValue(page, '#towards', randomNum);
    await setModalFormItemValue(page, '#desc', descVal);
    await setSelectValue(page, 'rsuId', '#rsuId_list');

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully query via camera name', async ({ page }) => {
    await searchItemAndQuery(page, '#name', cameraNameVal);
    await checkTableItemContainValue(page, cameraNameVal, 1);
  });

  test('successfully query via associated rsu', async ({ page }) => {
    const res_v: any = await setQuerySelectValue(page, '#rsuId');
    await checkTableItemContainValue(page, res_v, 5);
  });

  test('successfully edit camera', async ({ page }) => {
    await searchItemAndQuery(page, '#name', cameraNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${cameraNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view detail', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${cameraNameVal}`);
    await clickNameBtn(page);
    await checkDetailPage(page);
    await clickBackToListBtn(page);
  });

  test('successfully delete camera', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${cameraNameVal}`);
    await clickMoreBtn(page);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});
