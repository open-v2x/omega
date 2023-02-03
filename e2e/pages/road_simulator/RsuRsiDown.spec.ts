// RSI 下发至 RSU
import { test, expect } from '@playwright/test';
import {
  connectMqtt,
  addListenTopic,
  ReceiveMessageHaveData,
  checkDataset,
} from '../../utils/road_simulator';
import { gotoRoadSimulator, useUserStorageState } from '../../utils/global';
test.describe('RSI 下发至 RSU', () => {
  const topic = 'V2X/RSU/32011501/RSI/DOWN';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test('路侧模拟器添加监听主题模拟发送数据-模拟器成功接收数据', async ({ page }) => {
    await gotoRoadSimulator(page);
    await connectMqtt(page);
    await addListenTopic(page, topic);
    await checkDataset(page, 'RSI_data');

    // 直到loading结束再点击发送按钮
    await page.locator('#loading-RSI_data').waitFor({ state: 'hidden' });
    await page.click('#publishDataSetButton');
    await page.waitForTimeout(1000); // 发送1s数据后停止发送

    const res = await ReceiveMessageHaveData(page);
    expect(res).toBeGreaterThan(0);
  });
});
