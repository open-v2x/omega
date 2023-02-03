// MAP 上报云控中心
import { test, expect } from '@playwright/test';
import {
  connectMqtt,
  addListenTopic,
  checkDataset,
  ReceiveMessageHaveData,
} from '../../utils/road_simulator';
import { checkSuccessMsg, gotoRoadSimulator, useUserStorageState } from '../../utils/global';
import {
  searchItemAndQuery,
  checkTableRowLength,
  clickDeleteTextBtn,
  clickConfirmModalOkBtn,
} from '../../utils/table';
test.describe('MAP 上报云控中心', () => {
  const topic = 'V2X/RSU/R328328/MAP/UP';
  const pageUrl = '/maintenance/map';
  const M_NameVal = '';

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test('路侧模拟器添加监听主题并发送数据-设备管理 MAP 配置界面上看到 RSU 上报的 MAP 数据-模拟器成功接收数据', async ({
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
    await checkDataset(simulatorPage, 'RSU_MAP');
    await simulatorPage.locator('#loading-RSU_MAP').waitFor({ state: 'hidden' });
    await simulatorPage.click('#publishDataSetButton');
    // 设备管理 MAP 配置界面上能看到 RSU 上报的 MAP 数据
    await deviceContextPage.goto(pageUrl);
    await checkTableRowLength(deviceContextPage, 1);
    // 模拟器成功接收数据
    const res = await ReceiveMessageHaveData(simulatorPage);
    expect(res).toBeGreaterThan(0);
    await simulatorPage.click('#connectButton'); // 模拟器断开连接
    // 删除 map 配置
    await searchItemAndQuery(deviceContextPage, '#name', M_NameVal);
    await clickDeleteTextBtn(deviceContextPage);
    await clickConfirmModalOkBtn(deviceContextPage);
    await checkSuccessMsg(deviceContextPage);

    await deviceContextPage.close();
    await simulatorPage.close();
  });
});
