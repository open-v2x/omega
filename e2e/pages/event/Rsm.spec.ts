import { expect, test } from '@playwright/test';
import { clickBackToListBtn } from '../../utils/detail';
import { setQuerySelectValue } from '../../utils/form';
import { checkDetailUrl, useUserStorageState, gotoRoadSimulator } from '../../utils/global';
import { checkDataset, connectMqtt } from '../../utils/road_simulator';
import { clickDetailTextBtn, getTableTotal,waitUntilTableHavedata } from '../../utils/table';
test.describe('The Rsm Page', () => {
  const pageUrl = '/event/rsm';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();
  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('用路侧模拟器发送[路侧安全消息]数据并成功收到消息', async ({ browser }) => {
    const deviceContext = await browser.newContext();
    const simulatorContext = await browser.newContext();

    // Create pages and interact with contexts independently
    const deviceContextPage = await deviceContext.newPage();
    const simulatorPage = await simulatorContext.newPage();
    //先统计列表有多少数据再用模拟器发送消息
    await deviceContextPage.goto(pageUrl);
    const rows_init = await getTableTotal(deviceContextPage);
    await gotoRoadSimulator(simulatorPage);
    await connectMqtt(simulatorPage);
    await checkDataset(simulatorPage, 'video_track');
    await checkDataset(simulatorPage, 'radar_track');

    // 直到loading结束再点击发送按钮
    await simulatorPage.locator('#loading-video_track').waitFor({ state: 'hidden' });
    await simulatorPage.locator('#loading-radar_track').waitFor({ state: 'hidden' });
    await simulatorPage.click('#publishDataSetButton');
    await waitUntilTableHavedata(deviceContextPage,pageUrl,6000,rows_init);
    const rows_after = await getTableTotal(deviceContextPage); // 经过模拟器发送后表格数据应该比原来多
    expect(Number(rows_init)).toBeLessThan(Number(rows_after));
    await deviceContextPage.close();
    await simulatorPage.close();
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
