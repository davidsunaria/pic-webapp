import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { StoreProvider, useStoreRehydrated } from "easy-peasy";
import store from '../src/store';
import AppRouter from '../src/routes';
import { BrowserRouter } from "react-router-dom"
import { ToastContainer, Zoom } from 'react-toastify';
import "./index.scss";
import 'bootstrap/dist/css/bootstrap.min.css';


import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/es';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en'
import '@formatjs/intl-numberformat/locale-data/es'

import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en'
import '@formatjs/intl-numberformat/locale-data/en-GB'
import '@formatjs/intl-numberformat/locale-data/de'
import './language';

function WaitForStateRehydration({ children }: {children: any}) {
  const isRehydrated = useStoreRehydrated();
  return isRehydrated ? children : null;
}
ReactDOM.render(
  <React.StrictMode>
    {/* <ToastContainer limit={2} transition={Zoom} autoClose={3000}
 /> */}
    <StoreProvider store={store}>
    <WaitForStateRehydration>
      <BrowserRouter>
          <AppRouter />
      </BrowserRouter>
      </WaitForStateRehydration>
    </StoreProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
