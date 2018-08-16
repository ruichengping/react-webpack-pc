import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './redux/actions'; 
import * as globalActions from '../../store/actions';
import './style.scss';
import BasicLayout from '@/layouts/BasicLayout'
import {Icon} from 'antd';
@connect(
  state=>({user:state.user,author:state.author}),
  dispatch=>bindActionCreators(actions,dispatch)
)
class PageOne extends React.PureComponent{
  constructor(props){
    super(props);
    const {fetchAuthorData} = props;
    fetchAuthorData();
  }
  render(){
    const {author} = this.props;
    const {info} =author;
    const {github,blog,qq,name,address,avtar} = info;
    return (
      <BasicLayout>
          <div className="text-center mt-30">
             <img height="180" src={avtar}/>
          </div>
          <div className="m-info-wrapper">
            <div className="m-info">
              <div className="u-info-item mt-30"><strong className="mr-20"><Icon type="user" /></strong>{name}</div>
              <div className="u-info-item"><strong className="mr-20"><Icon type="qq" /></strong>{qq}</div>
              <div className="u-info-item"><strong className="mr-20"><Icon type="environment-o" /></strong>{address}</div>
              <div className="u-info-item"><strong className="mr-20"><Icon type="book" /></strong><a target="_blank" href={blog}>{blog}</a></div>
              <div className="u-info-item"><strong className="mr-20"><Icon type="github" /></strong><a target="_blank" href={github}>{github}</a></div>
            </div>
          </div>
        
      </BasicLayout>
    )
   
  }
}
export default PageOne;