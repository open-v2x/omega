// 下发运维配置至 RSU 设备
import { test, expect } from '@playwright/test';
import { connectMqtt, addListenTopic, ReceiveMessageHaveData } from '../../utils/road_simulator';
import { checkSuccessMsg, gotoRoadSimulator, useUserStorageState } from '../../utils/global';
import { searchItemAndQuery, clickDownTextBtn } from '../../utils/table';
test.describe('下发运维配置至 RSU 设备', () => {
  const topic = 'V2X/RSU/R328328/MNG/DOWN';
  const pageUrl = '/maintenance/maintenance';
  const M_NameVal = 'demoRsu';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test('路侧模拟器添加监听主题-设备管理下发 RSU 运维配置-模拟器成功接收数据', async ({
    browser,
  }) => {
    const deviceContext = await browser.newContext();
    const simulatorContext = await browser.newContext();

    // Create pages and interact with contexts independently
    const deviceContextPage = await deviceContext.newPage();
    const simulatorPage = await simulatorContext.newPage();
    await gotoRoadSimulator(simulatorPage);
    await connectMqtt(simulatorPage);
    await addListenTopic(simulatorPage, topic);
    // 设备管理下发 RSU 运维配置
    await deviceContextPage.goto(pageUrl);
    await searchItemAndQuery(deviceContextPage, '#rsuName', M_NameVal);
    await clickDownTextBtn(deviceContextPage);
    await checkSuccessMsg(deviceContextPage);
    // 模拟器成功接收数据
    await simulatorPage.waitForTimeout(1000);
    const res = await ReceiveMessageHaveData(simulatorPage);
    expect(res).toBeGreaterThan(0);
    await simulatorPage.click('#connectButton'); // 模拟器断开连接

    await deviceContextPage.close();
    await simulatorPage.close();
  });
});
