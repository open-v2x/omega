import React from 'react';
import AppContext from '#/common/AppContext';
import { IAppContext } from '#/types/IAppContext';
import i18n from '#/utils/i18n';
import { getRouteConfigs } from '#/router';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { getLocale } from '#/utils/storage';
import { useTranslation } from 'react-i18next';
import { QIANKUN_PREFIX } from '#/constants/variable';
window.t = i18n.t;

const App = () => {
  const [t] = useTranslation();
  const getLiveContextValue = (): IAppContext => ({
    token: '',
  });
  window.t = t;

  const RenderRouter = () => {
    const routes = useRoutes(getRouteConfigs());
    return routes;
  };

  const basename = window.__POWERED_BY_QIANKUN__ ? QIANKUN_PREFIX : undefined;

  return (
    <>
      <AppContext.Provider value={getLiveContextValue()}>
        <ConfigProvider locale={{ locale: getLocale() }}>
          <BrowserRouter basename={basename}>
            <RenderRouter />
          </BrowserRouter>
        </ConfigProvider>
      </AppContext.Provider>
    </>
  );
};

export default App;
