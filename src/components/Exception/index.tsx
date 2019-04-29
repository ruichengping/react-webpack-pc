import React, { createElement, ReactElement } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import config from './typeConfig';
import './style.scss';

interface ExceptionProps{
  className:string,
  backText:string,
  linkElement:string,
  type:string,
  title:string,
  desc:string,
  img:string,
  actions:ReactElement,
  redirect:string
}
class Exception extends React.PureComponent<ExceptionProps> {
  static defaultProps = {
    backText: '返回首页',
    redirect: '/',
  };
  render() {
    const {
      className,
      backText,
      linkElement = 'a',
      type,
      title,
      desc,
      img,
      actions,
      redirect,
      ...rest
    } = this.props;
    const pageType = type in config ? type : '404';
    const clsString = classNames("component-exception", className);
    return (
      <div className={clsString} {...rest}>
        <div className="imgBlock">
          <div
            className="imgEle"
            style={{ backgroundImage: `url(${img || config[pageType].img})` }}
          />
        </div>
        <div className="content">
          <h1>{title || config[pageType].title}</h1>
          <div className="desc">{desc || config[pageType].desc}</div>
          <div className="actions">
            {actions ||
              createElement(
                linkElement,
                {
                  to: redirect,
                  href: redirect,
                },
                <Button type="primary">{backText}</Button>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Exception;
