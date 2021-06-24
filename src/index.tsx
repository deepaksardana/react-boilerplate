import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import loadable from '@loadable/component';

import LazyLoading from "components/common/LazyLoading";
import reportWebVitals from './reportWebVitals';
import configureStore, {history} from "store";

const initialState = window.initialReduxState;
const store = configureStore(initialState);

const AppIntialization = loadable(() => import('./AppIntialization'), {
  fallback: <LazyLoading/>  
})

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <AppIntialization history={history} />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
