import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from '@/store';
import App from '@/App';
import '@/scss/reset.scss';
import '@/scss/base.scss';


render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)