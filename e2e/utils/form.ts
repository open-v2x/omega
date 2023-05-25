import type { Page } from '@playwright/test';
import { clickQuerySearchBtn } from './table';

export const formItemSelect = (page: Page, selector: string) => {
  return page.locator(`.antd-form-item-${selector}`).locator('.ant-select');
};

// 创建和编辑时选择的下拉框
export const setSelectValue = async (
  page: Page,
  selector: string,
  detail_selector: string,
  nthChild: number = 1,
) => {
  await formItemSelect(page, selector).click();
  await page
    .locator(`${detail_selector} + .rc-virtual-list`)
    .locator(`.rc-virtual-list-holder-inner > div:nth-child(${nthChild})`)
    .click();
};

// 查询时选择的下拉框
export const setQuerySelectValue = async (page: Page, selector: string, nthchild: number = 1) => {
  // 返回值是下拉框选择的值
  await page.click(selector);
  await page.locator(`.rc-virtual-list-holder-inner > div:nth-child(${nthchild})`).click();
  const res = await page
    .locator(`.rc-virtual-list-holder-inner > div:nth-child(${nthchild})`)
    .textContent();
  await clickQuerySearchBtn(page);
  await page.waitForTimeout(1000);
  return res;
};
// 编辑算法配置：替换算法和禁用/启用算法
export const editAlgoConfigSelectValue = async (
  page: Page,
  status: string, //算法状态
  nthchild: number = 1, 
) => {
  await page.click('text="编辑"');
  await page.click('.ant-form-item .ant-select-selector');
  await page.locator(`.rc-virtual-list-holder-inner > div:nth-child(${nthchild})`).click(); //算法选择下拉框，选择第几个选项
  await page.waitForTimeout(500);
  await page.click('.ant-table-tbody > tr:nth-child(2) > td:nth-child(4) .ant-select-selector');//启用禁用的下拉框

  await page.click(`div[title="${status}"]`);
  
  await page.click('text="保存"');
  await page.click('.ant-pro-table-list-toolbar-right button'); // 点击配置;
};

export const formItemCascader = (page: Page, selector: string) => {
  return page.locator(`.antd-form-item-${selector}`).locator('.ant-cascader');
};

export const setCascaderItemValue = async (page: Page, index: number = 0) => {
  await page
    .locator(`.ant-cascader-dropdown`)
    .locator('.ant-cascader-menu-item')
    .nth(index)
    .click();
};

// indexs: 级联菜单下标列表
export const setCascaderValue = async (page: Page, selector: string, indexs: number[]) => {
  await formItemCascader(page, selector).click();
  for (let i = 0; i < indexs.length; i++) {
    await setCascaderItemValue(page, indexs[i]);
  }
};

export const setQueryCascaderValue = async (page: Page, indexs: number[]) => {
  await page.click('xpath=//input[starts-with(@id,"rc_select")]');
  for (let i = 0; i < indexs.length; i++) {
    await setCascaderItemValue(page, indexs[i]);
  }
  await clickQuerySearchBtn(page);
  await page.waitForTimeout(1000);
  const res = await page.locator('.ant-select-selection-item').textContent();
  return res;
};
export const globalModal = (page: Page) => {
  const modal = page.locator('.ant-modal-wrap .ant-modal');
  return modal;
};

export const globalModalFormItem = (page: Page, selector: string) => {
  const item = globalModal(page).locator(selector);
  return item;
};

export const setModalFormItemValue = async (page: Page, selector: string, value: string) => {
  const item = globalModalFormItem(page, selector);
  await item.fill(value);
};

export const globalModalFormItems = (page: Page, selectors: string[]) => {
  const list: any = [];
  selectors.map(selector => {
    const item = globalModalFormItem(page, selector);
    list.push(item);
  });
  return list;
};

export const globalModalSubmitBtn = async (page: Page) => {
  const footer = globalModal(page).locator('.ant-modal-footer');
  const btn = footer.locator('#submitButton');
  await btn.click();
};

export const globalModalCancelBtn = async (page: Page) => {
  const footer = globalModal(page).locator('.ant-modal-footer');
  const btn = footer.locator('#cancelButton');
  await btn.click();
};

export const clickUnfoldBtn = async (page: Page) => {
  await page.click('.ant-pro-query-filter-collapse-button'); // 点击展开
};
