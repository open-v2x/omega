import { expect, test } from '@playwright/test';
import { clickBackToListBtn } from '../../utils/detail';
import { setQuerySelectValue } from '../../utils/form';
import {
  checkDetailUrl,
  gotoPageAndExpectUrl,
  useUserStorageState,
  gotoRoadSimulator,
} from '../../utils/global';
import { checkDataset, connectMqtt } from '../../utils/road_simulator';
import { clickDetailTextBtn, getTableTotal } from '../../utils/table';
test.describe('The Rsm Page', () => {
  const pageUrl = '/event/rsm';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();
  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('用路侧模拟器发送[路侧安全消息]数据并成功收到消息', async ({ page }) => {
    //先统计列表有多少数据再用模拟器发送消息
    await page.goto(pageUrl);
    const rows_init = await getTableTotal(page);
    await gotoRoadSimulator(page);
    await connectMqtt(page);
    await checkDataset(page, 'video_track');
    await checkDataset(page, 'radar_track');

    // 直到loading结束再点击发送按钮
    await page.locator('#loading-video_track').waitFor({ state: 'hidden' });
    await page.locator('#loading-radar_track').waitFor({ state: 'hidden' });
    await page.click('#publishDataSetButton');
    await page.waitForTimeout(5000); // 发送5s数据后停止发送
    await page.click('#connectButton');

    await page.goto(pageUrl);
    const rows_after = await getTableTotal(page); // 经过模拟器发送后表格数据应该比原来多
    expect(Number(rows_init)).toBeLessThan(Number(rows_after));
  });

  test('成功通过下拉框筛选数据', async ({ page }) => {
    const res_before = await getTableTotal(page);
    await setQuerySelectValue(page, '#ptcType', 1);
    const res_after = await getTableTotal(page);
    expect(Number(res_before)).toBeGreaterThan(Number(res_after));
  });

  test('成功查看详情', async ({ page }) => {
    await clickDetailTextBtn(page);
    await checkDetailUrl(page, pageUrl);
    await clickBackToListBtn(page);
  });
});