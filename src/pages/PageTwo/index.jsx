import React from 'react';
import avtar from '../../assets/avtar.jpeg';
import PropTypes from 'prop-types';
import HelloWorld from '@/components/HelloWorld'
import {Button} from 'antd';
import {withRouter} from 'react-router-dom';

class PageTwo extends React.PureComponent{
  static propTypes = {
    history: PropTypes.object.isRequired
  }
  handleBack=()=>{
    const {history} = this.props;
    history.push('/navone/pageone');
  }
  render(){
    return (
      <div>
        <div className="text-center mt-30">
          <img height="180" src={avtar}/>
        </div>
        <div className="text-center mt-20">
          <HelloWorld/>
          <Button type="primary" onClick={this.handleBack}>点击返回首页</Button>
        </div>
      </div>
    )
  }
}
export default withRouter(PageTwo);