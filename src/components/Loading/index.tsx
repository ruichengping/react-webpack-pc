import React, { FC, ReactElement } from 'react';

import './style.scss';

interface LoadingProps {
  loading?:boolean,
  children?:ReactElement
}

const Loading:FC<LoadingProps> = ({loading=true,children})=>{
  return (
    loading?<div className="comp-loading">
      <div className="item-1"></div>
      <div className="item-2"></div>
      <div className="item-3"></div>
      <div className="item-4"></div>
      <div className="item-5"></div>
    </div>:children
  )
}
export default Loading;