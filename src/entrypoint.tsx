import * as React from 'react';
import { render } from 'react-dom';
// App wrapped with redux Provider, store, etc.
import './index.less';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Button } from 'antd';
import { rootReducer } from './store/reducer';
import App from './ui/App';
// @ts-ignore
import module from './rustyfunctions/Cargo.toml';

const testWasm = () => {
  const t0 = performance.now();
  for (let i = 0; i < 100000; i += 1) {
    module.test_function();
  }
  const t1 = performance.now();
  const tupleStruct = module.test_function();
  console.log(tupleStruct);
  console.log(t1 - t0);
};

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
  <Provider store={store}>
      <Button onClick={testWasm}>
          test me
      </Button>
    <App />
  </Provider>,
  document.getElementById('root'),
);
