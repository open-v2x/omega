import { test } from '@playwright/test';
import { setQuerySelectValue } from '../../utils/form';
import { clickBackToListBtn } from '../../utils/detail';
import {
  gotoPageAndExpectUrl,
  useUserStorageState,
  gotoRoadSimulator,
  checkDetailUrl,
} from '../../utils/global';
import { checkDataset, connectMqtt } from '../../utils/road_simulator';

import { checkEmptyTable, checkTableRowLength, clickDetailTextBtn } from '../../utils/table';

test.describe('The Vrucw Page', () => {
  const pageUrl = '/event/vrucw';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();
  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('用路侧模拟器发送[弱势交通参与者碰撞预警]数据', async ({ page }) => {
    await gotoRoadSimulator(page);
    await connectMqtt(page);
    await checkDataset(page, 'VPTC_CW_track_stright');
    await checkDataset(page, 'VPTC_CW_track_turn');
    // 直到loading结束再点击发送按钮
    await page.locator('#loading-VPTC_CW_track_stright').waitFor({ state: 'hidden' });
    await page.locator('#loading-VPTC_CW_track_turn').waitFor({ state: 'hidden' });
    await page.click('#publishDataSetButton');
    await page.waitForTimeout(10000); // 发送10s数据后停止发送
    await page.click('#connectButton');
  });

  test('成功接收到数据', async ({ page }) => {
    page.reload();

    await checkTableRowLength(page, 3);
  });

  test('成功通过下拉框筛选数据', async ({ page }) => {
    page.goto(pageUrl);
    await setQuerySelectValue(page, '#collisionType', 1);
    checkEmptyTable(page);
  });

  test('成功查看详情', async ({ page }) => {
    await clickDetailTextBtn(page);
    await checkDetailUrl(page, pageUrl);
    await clickBackToListBtn(page);
  });
});
