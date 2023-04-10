import React from 'react';
import AppContext from '#/common/AppContext';
import { IAppContext } from '#/types/IAppContext';
import i18n from '#/utils/i18n';
import { getRouteConfigs } from '#/router';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { getLocale } from '#/utils/storage';
import { useTranslation } from 'react-i18next';
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

  return (
    <>
      <AppContext.Provider value={getLiveContextValue()}>
        <ConfigProvider locale={{ locale: getLocale() }}>
          <BrowserRouter>
            <RenderRouter />
          </BrowserRouter>
        </ConfigProvider>
      </AppContext.Provider>
    </>
  );
};

export default App;
