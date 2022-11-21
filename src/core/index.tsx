import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.less';
import 'antd/dist/antd.css';

try {
  const rootElement = document.getElementById('root');

  ReactDOM.createRoot(rootElement).render(<App />);
} catch (error) {
  console.log('e', error);
}
