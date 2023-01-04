// log 上传到 Rsu
import { test, expect } from '@playwright/test';
import { generateNumLetter } from '../../utils';
import { connectMqtt, addListenTopic, ReceiveMessageHaveData } from '../../utils/road_simulator';
import { globalModalSubmitBtn, setModalFormItemValue, setSelectValue } from '../../utils/form';
import { checkSuccessMsg, gotoRoadSimulator, useUserStorageState } from '../../utils/global';
import { clickCreateBtn, clickDeleteTextBtn, clickConfirmModalOkBtn } from '../../utils/table';
test.describe('配置 RSU 设备日志上报地址', () => {
  const topic = 'V2X/RSU/R328328/Log/UP';
  const pageUrl = '/maintenance/log';
  const randomNumLetter = generateNumLetter();

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test('路侧模拟器添加监听主题-设备管理配置日志上报-模拟器成功接收数据', async ({ browser }) => {
    const deviceContext = await browser.newContext();
    const simulatorContext = await browser.newContext();

    // Create pages and interact with contexts independently
    const deviceContextPage = await deviceContext.newPage();
    const simulatorPage = await simulatorContext.newPage();
    await gotoRoadSimulator(simulatorPage);
    await connectMqtt(simulatorPage);
    await addListenTopic(simulatorPage, topic);
    // 设备管理配置日志上报
    await deviceContextPage.goto(pageUrl);
    await clickCreateBtn(deviceContextPage);
    await setModalFormItemValue(deviceContextPage, '#uploadUrl', randomNumLetter);
    await setModalFormItemValue(deviceContextPage, '#userId', randomNumLetter);
    await setModalFormItemValue(deviceContextPage, '#password', randomNumLetter);
    await setSelectValue(deviceContextPage, 'transprotocal', '#transprotocal_list');
    await setSelectValue(deviceContextPage, 'rsus', '#rsus_list');
    await globalModalSubmitBtn(deviceContextPage);
    await checkSuccessMsg(deviceContextPage);
    // 模拟器成功接收数据
    await simulatorPage.waitForTimeout(1000);
    const res = await ReceiveMessageHaveData(simulatorPage);
    expect(res).toBeGreaterThan(0);
    await simulatorPage.click('#connectButton'); // 模拟器断开连接
    // 删除日志
    await clickDeleteTextBtn(deviceContextPage);
    await clickConfirmModalOkBtn(deviceContextPage);
    await checkSuccessMsg(deviceContextPage);
    await deviceContextPage.close();
    await simulatorPage.close();
  });
});
