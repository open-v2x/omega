import { test } from '@playwright/test';
import { setQuerySelectValue } from '../../utils/form';
import { useUserStorageState, gotoRoadSimulator,checkDetailUrl} from '../../utils/global';
import { checkDataset, connectMqtt } from '../../utils/road_simulator';
import { clickBackToListBtn } from '../../utils/detail';
import { checkEmptyTable, checkTableRowLength,waitUntilTableHavedata,clickDetailTextBtn } from '../../utils/table';

test.describe('The Congestion Page', () => {
  const pageUrl = '/event/congestion';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();
  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('用路侧模拟器发送[拥堵预警]数据--事件列表成功接收到数据', async ({ browser }) => {
    const deviceContext = await browser.newContext();
    const simulatorContext = await browser.newContext();

    // Create pages and interact with contexts independently
    const deviceContextPage = await deviceContext.newPage();
    const simulatorPage = await simulatorContext.newPage();

    
    await gotoRoadSimulator(simulatorPage);
    await connectMqtt(simulatorPage);
    await checkDataset(simulatorPage, 'congestion');
    // 直到loading结束再点击发送按钮
    await simulatorPage.locator('#loading-congestion').waitFor({ state: 'hidden' });
    await simulatorPage.click('#publishDataSetButton');
    // await simulatorPage.waitForTimeout(10000); 
    // await simulatorPage.click('#connectButton');
    // 循环刷新页面直到出现数据，最大超时时间是 1 分钟
    await waitUntilTableHavedata(deviceContextPage,pageUrl,6000);
    await checkTableRowLength(deviceContextPage, 3);
    await deviceContextPage.close();
    await simulatorPage.close();
  });

  test('成功通过下拉框筛选数据', async ({ page }) => {
    await setQuerySelectValue(page, '#cgwLevel', 2);
    await checkEmptyTable(page);
  });

  test('成功查看详情', async ({ page }) => {
    await clickDetailTextBtn(page);
    await checkDetailUrl(page, pageUrl);
    await clickBackToListBtn(page);
  });
});
