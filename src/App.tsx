import React from 'react';
import AppContext from '#/common/AppContext';
import { IAppContext } from './types/IAppContext';
import RouterUI from '#/router';
import routerConfig from '#/router/routes';
import i18n from './utils/i18n';

window.t = i18n.t;

const App = () => {
  const getLiveContextValue = (): IAppContext => ({
    token: '',
  });

  return (
    <>
      <AppContext.Provider value={getLiveContextValue()}>
        <RouterUI routers={routerConfig.routes} />
      </AppContext.Provider>
    </>
  );
};

export default App;
