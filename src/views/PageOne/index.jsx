import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './redux/actions'; 
import * as globalActions from '../../store/actions';
import './style.scss';
import avtar from '@/assets/avtar.jpeg'
import NavOneLayout from '@/layouts/NavOneLayout'
import {Input,Button} from 'antd';
@connect(
  state=>({user:state.user}),
  dispatch=>bindActionCreators(Object.assign({},
    globalActions,actions),dispatch)
)
class PageOne extends React.PureComponent{
  render(){
    return (
      <NavOneLayout>
          <div className="text-center mt-30">
             <img height="180" src={avtar}/>
          </div>
          <div className="text-center mt-30"><strong>博客地址：</strong>https://segmentfault.com/u/wuming_585cbbbfcac46/articles</div>
          <div className="text-center mt-10"><strong>github地址：</strong>https://github.com/ruichengping</div>
      </NavOneLayout>
    )
   
  }
}
export default PageOne;