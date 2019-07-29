import '@babel/polyfill';
import React from 'react';
import {hydrate,render} from 'react-dom';
import App from './App';

import '@/styles/css/reset.css';
import '@/styles/css/base.css';
const renderMethod = module.hot?render:hydrate;
renderMethod(
  <App/>,
  document.getElementById('app')
)