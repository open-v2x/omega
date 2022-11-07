import React from 'react';
import ReactDOM from 'react-dom/client';
import '#/assets/css/init.less';
import App from './App';

try {
  const rootElement = document.getElementById('root');

  ReactDOM.createRoot(rootElement).render(<App />);
} catch (error) {
  console.log('e', error);
}
