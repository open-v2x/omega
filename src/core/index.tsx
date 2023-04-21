import React from 'react';

import ReactDOM from 'react-dom';
import './index.less';
import 'antd/dist/antd.css';
import App from './App';
import 'default-passive-events';

try {
  const rootElement = document.getElementById('root');

  ReactDOM.render(<App />, rootElement);
} catch (error) {
  console.log('e', error);
}
