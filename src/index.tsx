import React from 'react';
import { render } from 'react-dom';
import './index.less';

try {
  const rootElement = document.getElementById('root');
  const App = () => <div className="hello">hello</div>;

  render(<App />, rootElement);
} catch (error) {
  console.log('e', error);
}
