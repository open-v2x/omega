import { test } from '@playwright/test';
import { generateIntNum, generateNumLetter, generatePureNumber } from '../../utils';
import { clickBackToListBtn } from '../../utils/detail';
import {
  globalModalSubmitBtn,
  setModalFormItemValue,
  setQuerySelectValue,
  setSelectValue,
  clickUnfoldBtn,
} from '../../utils/form';
import {
  checkDetailPage,
  checkSuccessMsg,
  useUserStorageState,
  gotoRoadSimulator,
} from '../../utils/global';
import {
  checkTableItemContainValue,
  clickNameBtn,
  clickConfirmModalOkBtn,
  clickCreateBtn,
  clickDeleteBtn,
  clickMoreBtn,
  clickEditBtn,
  clickEnableDisableTextBtn,
  searchItemAndQuery,
  checkTableRowLength,
  clickDeleteTextBtn,
} from '../../utils/table';
import { connectMqtt, addListenTopic, sendTopicPublic } from '../../utils/road_simulator';

test.describe('The Rsu Page', () => {
  const randomNumLetter = generateNumLetter();
  const randomNum = generatePureNumber();
  const rsuNameVal = `rsu_name_${1}`;
  const queryRsuEsn = 'R328328';
  const rsuEsnVal = 'R123123';
  const rsuIdVal = `${randomNum}`;
  const rsuIPVal = [
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
    generateIntNum({ max: 256 }),
  ].join('.');
  const lng = generateIntNum({ max: 180 });
  const lat = generateIntNum({ max: 90 });
  const descVal = 'test description info';
  const pageUrl = '/device/rsu';
  const topic = 'V2X/RSU/INFO/UP';
  const rsuUpMessage = {
    rsuId: 'ID01',
    rsuEsn: 'ESN01',
    rsuName: 'NAME01',
    rsuStatus: true,
    version: 'v1',
    location: {
      lon: 118.840897,
      lat: 31.88335,
    },
    config: {
      mapConfig: {
        mapSlice: 'slice',
        eTag: 'tag',
      },
      bsmConfig: {
        sampleMode: 'ByAll',
        sampleRate: 0,
        actualSampleRate: 0,
        upLimit: 0,
      },
      rsiConfig: {
        maxRsiNum: 1,
        curRsiNum: 1,
        downRsis: [
          {
            alertID: 'EVENT01',
            eTag: 'TAG01',
          },
        ],
      },
      spatConfig: {
        upLimit: 0,
        downLimit: 0,
      },
      rsmConfig: {
        upLimit: 0,
        downLimit: 0,
      },
    },
  };

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();

  test.beforeEach(async ({ page }) => {
    await page.goto(pageUrl);
  });

  test('successfully create rsu', async ({ page }) => {
    await clickCreateBtn(page);

    await setModalFormItemValue(page, '#rsuName', rsuNameVal);
    await setModalFormItemValue(page, '#rsuEsn', rsuEsnVal);
    await setModalFormItemValue(page, '#rsuId', rsuIdVal);
    await setModalFormItemValue(page, '#rsuIP', rsuIPVal);
    await setModalFormItemValue(page, '#lon', String(lng));
    await setModalFormItemValue(page, '#lat', String(lat));
    await setModalFormItemValue(page, '#desc', descVal);
    await setSelectValue(page, 'rsuModelId', '#rsuModelId_list');

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully query via rsuName', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuName', rsuNameVal);
    await checkTableItemContainValue(page, rsuNameVal, 1);
  });

  test('successfully query via rsuEsn', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuEsn', queryRsuEsn);
    await checkTableItemContainValue(page, queryRsuEsn, 2);
  });

  test('successfully query via status', async ({ page }) => {
    await clickUnfoldBtn(page);
    await setQuerySelectValue(page, '#enabled');
    await checkTableItemContainValue(page, '启用', 5);
  });

  test('successfully edit rsu', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuEsn', rsuEsnVal);
    await clickEditBtn(page);

    await setModalFormItemValue(page, '#rsuName', `update_${rsuNameVal}`);
    await setModalFormItemValue(page, '#rsuEsn', rsuEsnVal);
    await setModalFormItemValue(page, '#rsuId', rsuIdVal);
    await setModalFormItemValue(page, '#rsuIP', rsuIPVal);
    await setModalFormItemValue(page, '#desc', `update ${descVal}`);
    await setSelectValue(page, 'rsuModelId', '#rsuModelId_list');

    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully view detail', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuEsn', rsuEsnVal);
    await clickNameBtn(page);
    await checkDetailPage(page);
    await clickBackToListBtn(page);
  });

  test('successfully enable and disable rsu', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuEsn', rsuEsnVal);
    await clickMoreBtn(page);
    await clickEnableDisableTextBtn(page, 'text="禁用"');
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });

  test('successfully delete rsu', async ({ page }) => {
    await searchItemAndQuery(page, '#rsuEsn', rsuEsnVal);
    await clickMoreBtn(page);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });

  test('RSU 信息上报', async ({ page }) => {
    await gotoRoadSimulator(page);
    await connectMqtt(page);
    await addListenTopic(page, topic);
    await sendTopicPublic(page, topic, JSON.stringify(rsuUpMessage));
    await page.goto(pageUrl);
    await page.click('#rc-tabs-0-tab-2');
    await checkTableRowLength(page, 1);
  });
  test('删除未注册 RSU 数据', async ({ page }) => {
    await page.click('#rc-tabs-0-tab-2');
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await await checkSuccessMsg(page);
  });
});
