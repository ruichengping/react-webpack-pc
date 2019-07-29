import React from 'react';
import {Provider} from 'react-redux';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import {renderToString} from 'react-dom/server';
import createRouter from '@/router';
import getStore from '@/store';


export default (req,res)=>{
  const context = {};
  const store = getStore();
  const css = new Set()
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
  const content = renderToString(<StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        {createRouter('server')({location:req.url,context})}
      </Provider>
    </StyleContext.Provider>)
  if(context.url){
    res.redirect(context.url);
  }else{
    if(context.NOT_FOUND) res.status(404);
    res.render('index',{
      content,
      style:[...css].join('')
    })
  }
}