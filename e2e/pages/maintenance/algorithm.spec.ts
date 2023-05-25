import { test,request } from '@playwright/test';
import config from '../../../playwright.config';
import cookies from '../../storage/userStorageState.json'
import {
  globalModalSubmitBtn,
  editAlgoConfigSelectValue,
  setSelectValue,
  setModalFormItemValue,
} from '../../utils/form';
import { checkErrorMsg, checkSuccessMsg, useUserStorageState } from '../../utils/global';
import {
  clickConfirmModalOkBtn,
  clickCreateBtn,
  clickDeleteTextBtn,
  searchItemAndQuery,
  checkTableItemContainValue,
  checkTableItemEqualValue,
} from '../../utils/table';

test.describe('The Algorithm Version and Config Page', () => {
  const versionpageUrl = '/algorithm/version';
  const configpageUrl = '/algorithm/config';
  const randomNumLetter = 'arm64';
  const algo_name = 'overspeed_warning';
  const real_algo = 'overspeed_warning'; // 项目已实现的算法版本名

  // Use signed-in state of 'userStorageState.json'.
  useUserStorageState();
  const baseURL = config.use?.baseURL;
  const basePort = '2288'
  const baseApiUrl = baseURL?.split(`:${basePort}`)[0];  
  const baseApiUrl_1 = `${baseApiUrl}:28300/api/v1/service_types`;
  const baseApiUrl_2 = `${baseApiUrl}:28300/api/v1/services`;
  const baseApiUrl_3 = `${baseApiUrl}:28300/api/v1/endpoints`;

  const login_authorization = cookies.origins[0].localStorage[0].value
  test('使用api生成endpoint', async ({ request }) => {
          const response1 = await request.post(baseApiUrl_1, {
              data: {
                "name": "algo/scenario_algo/overspeed_warning/grpc",
                "description": "grpc"
              },
              headers: {
                  authorization: login_authorization
              }
          
            });
            const response2 = await request.post(baseApiUrl_2, {
              data: {
                
              "name": "grpc service",
              "type_id": 1,
              "vendor": "myself",
              "description": "grpc service"

              },
              headers: {
                  authorization: login_authorization
              }
          
            });
            const response3 = await request.post(baseApiUrl_3, {
              data: {
                
                "service_id": 1,
                "enabled": true,
                "url": "127.0.0.1:28303"

              },
              headers: {
                  authorization: login_authorization
              }
          
            });
   });
  test('successfully create algo version', async ({ page }) => {
    await page.goto(versionpageUrl);
    await clickCreateBtn(page);

    await setSelectValue(page, 'module', '#module_list',3);
    await setSelectValue(page, 'algo', '#algo_list',7);
    await setModalFormItemValue(page, '#version', randomNumLetter);
    await setSelectValue(page, 'undefined', '#endpointID_list');
    await globalModalSubmitBtn(page);
    await checkSuccessMsg(page);
  });
  test('create repeat algo version failedly', async ({ page }) => {
    await page.goto(versionpageUrl);
    await clickCreateBtn(page);
    await setSelectValue(page, 'module', '#module_list',3);
    await setSelectValue(page, 'algo', '#algo_list',7);
    await setModalFormItemValue(page, '#version', randomNumLetter);
    await setSelectValue(page, 'undefined', '#endpointID_list');
    await globalModalSubmitBtn(page);
    await checkErrorMsg(page);
  });
  test('create repeat default algo version failedly', async ({ page }) => {
    // 创建同名算法版本，与已实现的算法版本同名，预期是创建失败
    await page.goto(versionpageUrl);
    await clickCreateBtn(page);

    await setSelectValue(page, 'module', '#module_list',3);
    await setSelectValue(page, 'algo', '#algo_list',7);
    await setModalFormItemValue(page, '#version', real_algo);
    await setSelectValue(page, 'undefined', '#endpointID_list');
    await globalModalSubmitBtn(page);
    await checkErrorMsg(page);
  });
  test('successfully query via version', async ({ page }) => {
    await page.goto(versionpageUrl);
    await searchItemAndQuery(page, '#version', randomNumLetter);
    await checkTableItemContainValue(page, randomNumLetter, 3);
  });
  test('successfully edit config', async ({ page }) => {
    await page.goto(configpageUrl);
    await searchItemAndQuery(page, '#algo', algo_name);
    await editAlgoConfigSelectValue(page,'禁用',2); //写禁用，代表要禁用这个算法，填2，代表要选择算法版本下拉框里的第二个
    await checkSuccessMsg(page);
    // 检查是否编辑成功
    await searchItemAndQuery(page, '#algo', algo_name);
    await checkTableItemEqualValue(page, '禁用', 4);
    await checkTableItemEqualValue(page, randomNumLetter, 3);
  });
  test('config in use can not delete ', async ({ page }) => {
    await page.goto(versionpageUrl);
    await searchItemAndQuery(page, '#version', randomNumLetter);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkErrorMsg(page);
  });
  test('successfully delete version', async ({ page }) => {
    // 恢复原样
    await page.goto(configpageUrl);
    await searchItemAndQuery(page, '#algo', algo_name);
    await editAlgoConfigSelectValue(page, '启用', 1);
    // 删除版本
    await page.goto(versionpageUrl);
    await searchItemAndQuery(page, '#version', randomNumLetter);
    await clickDeleteTextBtn(page);
    await clickConfirmModalOkBtn(page);
    await checkSuccessMsg(page);
  });
});
