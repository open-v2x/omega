// rsm 下发到 rsu,'video_track','multi_source_fusion_track','radar_track'
import { test,expect} from '@playwright/test';
import { useUserStorageState, gotoRoadSimulator } from '../../utils/global';
import { checkDataset, connectMqtt,addListenTopic,ReceiveMessageHaveData } from '../../utils/road_simulator';

test.describe('Rsm 下发 Rsu', () => {
  const topic = 'V2X/RSU/32011501/RSM/DOWN'

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();
  test.beforeEach(async ({ page }) => {
    await gotoRoadSimulator(page);
  });
  const SendToCerebrumMessage = ['video_track','multi_source_fusion_track','radar_track']; 
  for (const message of SendToCerebrumMessage) {
    test(`testing with ${message},路侧模拟器添加监听主题-发送数据-成功接收数据`, async ({ page }) => {
      await connectMqtt(page);
      await addListenTopic(page,topic);
      await checkDataset(page, message);
      // 直到loading结束再点击发送按钮
      await page.locator(`#loading-${message}`).waitFor({ state: 'hidden' });
      await page.click('#publishDataSetButton');
      await page.waitForTimeout(2000); 
      const res = await ReceiveMessageHaveData(page);
      expect(res).toBeGreaterThan(0);
      await page.click('#connectButton');
    });
  }
  
});
