import { test, expect } from '@playwright/test';
import { generateNumLetter } from '../../utils';
import {
  globalModalSubmitBtn,
  setCascaderValue,
  setModalFormItemValue,
  setSelectValue,
} from '../../utils/form';
import {
  checkDetailUrl,
  checkSuccessMsg,
  uploadFile,
  useUserStorageState,
  gotoRoadSimulator,
  provinceNameVal,
} from '../../utils/global';
import {
  connectMqtt,
  addListenTopic,
  ReceiveMessageHaveData,
  getseqNumForSendAck,
} from '../../utils/road_simulator';
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

test.describe('The MAP Page', () => {
  const mapNameVal = `map_name_${1}`;
  const descVal = 'test description info';
  const pageUrl = '/maintenance/map';
  const topic = 'V2X/RSU/R328328/MAP/DOWN';
  const ackTopic = 'V2X/RSU/R328328/MAP/DOWN/ACK';
  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('配置 RSE Simulator 建立监听-界面添加 Map 并下发 RSU', async ({ browser }) => {
    const deviceContext = await browser.newContext();
    const simulatorContext = await browser.newContext();

    const deviceContextPage = await deviceContext.newPage();
    const simulatorPage = await simulatorContext.newPage();
    // 配置 RSE Simulator 建立监听
    await gotoRoadSimulator(simulatorPage);
    await connectMqtt(simulatorPage);
    await addListenTopic(simulatorPage, topic);
    // 设备管理-添加 Map
    await deviceContextPage.goto(pageUrl);
    await clickCreateBtn(deviceContextPage);

    await setModalFormItemValue(deviceContextPage, '#name', mapNameVal);
    await setModalFormItemValue(deviceContextPage, '#desc', descVal);
    await setCascaderValue(deviceContextPage, 'province', provinceNameVal);
    await uploadFile(deviceContextPage, '#data', './e2e/testdata/MapExample.json');
    await uploadFile(deviceContextPage, '#bitmapFilename', './e2e/testdata/bitmap.png');
    await deviceContextPage.waitForTimeout(2000);
    await globalModalSubmitBtn(deviceContextPage);
    await checkSuccessMsg(deviceContextPage);
    //选择下发的 RSU
    await clickDetailTextBtn(deviceContextPage);
    await deviceContextPage.click('#sendRSU');
    await setSelectValue(deviceContextPage, 'rsus', '#rsus_list'); // 选择第一个 RSU
    await globalModalSubmitBtn(deviceContextPage);
    await deviceContextPage.waitForTimeout(3000);

    await checkSuccessMsg(deviceContextPage);
    // RSE Simulator 接收数据
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
    await searchItemAndQuery(page, '#name', mapNameVal);
    await clickDetailTextBtn(page);
    await checkDetailUrl(page, pageUrl);
    // 确认下发状态为下发成功
    const status = await getTabelVal(page, 1, 5);
    expect(status).toEqual('下发成功');
    await clickBackToListBtn(page);
  });

  test('successfully edit map', async ({ page }) => {
    await searchItemAndQuery(page, '#name', mapNameVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#name', `update_${mapNameVal}`);

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view map detail', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${mapNameVal}`);
    await clickDetailTextBtn(page);
    await checkDetailUrl(page, pageUrl);
    await clickBackToListBtn(page);
  });

  test('successfully delete map', async ({ page }) => {
    await searchItemAndQuery(page, '#name', `update_${mapNameVal}`);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});
