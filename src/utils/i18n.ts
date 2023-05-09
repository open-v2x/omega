import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhCN from '#/locales/zh-CN.json';
import enUS from '#/locales/en-US.json';
import axios from 'axios';
import yaml from 'js-yaml';
import { useRootStore } from '#/store/root';

const getResource = async () => {
  const { data } = await axios.get('/assets/file/globals.yml');
  const ymlData = yaml.load(data);
  useRootStore.setState({
    globalConfig: ymlData,
  });
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { v2x_info_title = { en: 'OpenV2X', zh: 'OpenV2X' } } = ymlData;
  i18n.addResources('en-US', 'translation', {
    'OpenV2X Title': v2x_info_title.en,
  });
  i18n.addResources('zh-CN', 'translation', {
    'OpenV2X Title': v2x_info_title.zh,
  });
};

getResource();

const resources = {
  'zh-CN': { translation: zhCN },
  'en-US': { translation: enUS },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem(`${process.env.V2X}_locale`) || 'zh-CN',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
