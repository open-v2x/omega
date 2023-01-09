import { expect, Page } from '@playwright/test';
const clientId = 'R328328';
const password = 'password';
//   const rsu_simulator_Url = 'http://47.100.126.13:6688'

export const connectMqtt = async (page: Page) => {
  await page.fill('#clientId', clientId);
  await page.fill('#password', password);
  await page.click('#connectButton');
  const locator = page.locator('#state');
  await expect(locator).toHaveText('connected');
};
// 勾选复选框
export const checkDataset = async (page: Page, name: string) => {
  await page.click(`xpath=//td[contains(text(), "${name}")]/preceding-sibling::td[1]`);
};
// 添加监听主题
export const addListenTopic = async (page: Page, topic: string) => {
  await page.fill('#subscribeTopic', topic);
  await page.click('#subscribeButton');
};
// receive messages 有数据
export const ReceiveMessageHaveData = async (page: Page) => {
  const rowCount = await page.locator('#messageList > li').count();
  return rowCount;
};
//  获取 seqNum，发送应答数据
export const getseqNumForSendAck = async (page: Page, topic: string) => {
  const targetString: any = await page.locator('#messageList > li:nth-child(1)').textContent();
  const rExp: RegExp = /"seqNum": "(\d+)"/;
  const getdata = targetString.match(rExp);
  const ackNum = getdata[1];
  await page.fill('#publishTopic', topic);
  await page.fill('#publishMessage', `{"seqNum": "${ackNum}", "errorCode": 0}`);
  await page.click('#publishButton');
};
