import { test, expect } from '@playwright/test';
import { generatePureNumber } from '../../utils';
import { globalModalSubmitBtn, setModalFormItemValue } from '../../utils/form';
import {
  connectMqtt,
  addListenTopic,
  ReceiveMessageHaveData,
  getseqNumForSendAck,
} from '../../utils/road_simulator';
import {
  checkDetailUrl,
  checkSuccessMsg,
  gotoRoadSimulator,
  useUserStorageState,
} from '../../utils/global';

import { clickBackToListBtn } from '../../utils/detail';
import {
  clickConfirmModalOkBtn,
  clickCreateBtn,
  clickDeleteTextBtn,
  clickDetailTextBtn,
  clickEditBtn,
  searchItemAndQuery,
  getTabelVal,
} from '../../utils/table';

test.describe('The Business Page', () => {
  const randomNum = generatePureNumber();
  const businessNameVal = `business_name_${1}`;
  const pageUrl = '/maintenance/business';
  const topic = 'V2X/RSU/R328328/CONFIG/DOWN';
  const ackTopic = 'V2X/RSU/R328328/CONFIG/DOWN/ACK';
  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test('配置 RSE Simulator 建立监听-运维管理添加 RSU 业务配置', async ({ browser }) => {
    const deviceContext = await browser.newContext();
    const simulatorContext = await browser.newContext();

    const deviceContextPage = await deviceContext.newPage();
    const simulatorPage = await simulatorContext.newPage();
    // 配置 RSE Simulator 建立监听
    await gotoRoadSimulator(simulatorPage);
    await connectMqtt(simulatorPage);
    await addListenTopic(simulatorPage, topic);
    // 设备管理-添加 RSU 业务配置
    await deviceContextPage.goto(pageUrl);
    await clickCreateBtn(deviceContextPage);

    await setModalFormItemValue(deviceContextPage, '#name', businessNameVal);

    await deviceContextPage.check('text="全局采样"');
    await setModalFormItemValue(deviceContextPage, '#bsm_sampleRate', randomNum);
    await setModalFormItemValue(deviceContextPage, '#bsm_upLimit', randomNum);
    await setModalFormItemValue(deviceContextPage, '#rsm_upLimit', randomNum);
    await setModalFormItemValue(deviceContextPage, '#map_upLimit', randomNum);
    await setModalFormItemValue(deviceContextPage, '#spat_upLimit', randomNum);
    await deviceContextPage.click('text="配置 RSU"');
    await deviceContextPage.click(':nth-match(.ant-checkbox-wrapper, 2)'); // 选择第一个 RSU
    await deviceContextPage.click('.ant-modal-footer > button:nth-child(2)'); // 配置 RSU 的确定按钮
    await deviceContextPage.waitForTimeout(1000);

    await globalModalSubmitBtn(deviceContextPage);
    await checkSuccessMsg(deviceContextPage);
    // RSE Simulator 接收数据
    await simulatorPage.waitForTimeout(1000);
    const res = await ReceiveMessageHaveData(simulatorPage);
    expect(res).toBeGreaterThan(0);
    // RSE Simulator 发送应答数据
    await getseqNumForSendAck(simulatorPage, ackTopic);
    await simulatorPage.waitForTimeout(2000);
    // RSE Simulator 断开连接
    await deviceContextPage.close();
    await simulatorPage.close();
  });

  test('查看详情并确认配置下发成功', async ({ page }) => {
    await page.goto(pageUrl);
    await page.reload();
    await searchItemAndQuery(page, '#name', 'business_name_1');
    await clickDetailTextBtn(page);
    await checkDetailUrl(page, pageUrl);
    // 确认下发状态为下发成功
    const status = await getTabelVal(page, 1, 6);
    expect(status).toEqual('下发成功');
    await clickBackToListBtn(page);
  });

  test('successfully edit business', async ({ page }) => {
    await page.goto(pageUrl);
    await searchItemAndQuery(page, '#name', businessNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${businessNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully delete business', async ({ page }) => {
    await page.goto(pageUrl);
    await searchItemAndQuery(page, '#name', `update_${businessNameVal}`);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});
