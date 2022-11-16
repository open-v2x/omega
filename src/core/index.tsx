import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18n from '#/utils/i18n';
import './index.less';
import 'antd/dist/antd.css';

try {
  const rootElement = document.getElementById('root');
  window.t = i18n.t;

  ReactDOM.createRoot(rootElement).render(<App />);
} catch (error) {
  console.log('e', error);
}
