import React from 'react';
import {Provider} from 'react-redux';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import {renderToString} from 'react-dom/server';
import {Helmet} from "react-helmet";
import {getRouter,matchRoutesConfig} from '@/router';
import getStore from '@/store';


export default (req,res,next)=>{
  const context = {};
  const store = getStore();
  const css = new Set()
  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
  const promises = matchRoutesConfig(req.path).map((route)=>route.loadData).filter(Boolean).map((loadData)=>loadData(store,{
    baseURL:`${req.protocol}://${req.get('host')}`
  }))
  Promise.all(promises).then(()=>{
    const content = renderToString(<StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        {getRouter('server')({location:req.url,context})}
      </Provider>
    </StyleContext.Provider>)
    const helmet = Helmet.renderStatic();
    if(context.url){
      res.redirect(context.url);
    }else{
      if(context.NOT_FOUND) res.status(404);
      res.render('index',{
        title:helmet.title.toString(),
        metas:helmet.meta.toString(),
        storeStateData:JSON.stringify(store.getState()),
        content,
        style:[...css].join('')
      })
    }
  }).catch((err)=>{
    next(err)
  });
}