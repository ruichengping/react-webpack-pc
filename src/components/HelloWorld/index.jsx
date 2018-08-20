import React from 'react';
import './style.scss';
class HelloWorld extends React.PureComponent{
  render(){
    return (
      <h4 className="u-text" style=\{{lineHeight:28}}>Hello World</h4>
    )
  }
}
export default HelloWorld;