import { test } from '@playwright/test';
import { setQuerySelectValue } from '../../utils/form';
import { gotoPageAndExpectUrl, useUserStorageState, gotoRoadSimulator } from '../../utils/global';
import { checkDataset, connectMqtt } from '../../utils/road_simulator';

import { checkEmptyTable, checkTableRowLength,waitUntilTableHavedata } from '../../utils/table';

test.describe('The Sds Page', () => {
  const pageUrl = '/event/dnpw';
  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();
  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('用路侧模拟器发送[逆向超车预警]数据--事件列表成功接收到数据', async ({ browser }) => {
    const deviceContext = await browser.newContext();
    const simulatorContext = await browser.newContext();

    // Create pages and interact with contexts independently
    const deviceContextPage = await deviceContext.newPage();
    const simulatorPage = await simulatorContext.newPage();

    await gotoRoadSimulator(simulatorPage);
    await connectMqtt(simulatorPage);
    await checkDataset(simulatorPage, 'DNP_track');
    await checkDataset(simulatorPage, 'msg_VIR_DNP');
    // 直到loading结束再点击发送按钮
    await simulatorPage.locator('#loading-DNP_track').waitFor({ state: 'hidden' });
    await simulatorPage.click('#publishDataSetButton');
    // await page.waitForTimeout(10000); // 发送10s数据后停止发送
    // await page.click('#connectButton');
    await waitUntilTableHavedata(deviceContextPage,pageUrl,6000);
    await checkTableRowLength(deviceContextPage, 3);
    await deviceContextPage.close();
    await simulatorPage.close();
  });

  test('成功通过下拉框筛选数据', async ({ page }) => {
    await setQuerySelectValue(page, '#info', 2);
    await checkEmptyTable(page);
  });
});
