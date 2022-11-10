import React from 'react';
import ReactDOM from 'react-dom/client';
import '#/assets/css/init.less';
import App from './App';
import i18n from '#/utils/i18n';

try {
  const rootElement = document.getElementById('root');
  window.t = i18n.t;

  ReactDOM.createRoot(rootElement).render(<App />);
} catch (error) {
  console.log('e', error);
}
