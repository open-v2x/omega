import React, { Suspense } from 'react';
import AppContext from '#/common/AppContext';
import { IAppContext } from '#/types/IAppContext';
import i18n from '#/utils/i18n';
import { getRouteConfigs } from '#/router';
import { BrowserRouter, useRoutes } from 'react-router-dom';
window.t = i18n.t;

const App = () => {
  const getLiveContextValue = (): IAppContext => ({
    token: '',
  });

  const RenderRouter = () => {
    const routes = useRoutes(getRouteConfigs());
    return routes;
  };

  return (
    <>
      <AppContext.Provider value={getLiveContextValue()}>
        <BrowserRouter>
          <Suspense fallback={<p> Loading...</p>}>
            <RenderRouter />
          </Suspense>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
};

export default App;
