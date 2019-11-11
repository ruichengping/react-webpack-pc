import React,{ReactNode,ReactNodeArray} from 'react';
import {Menu,Popover,Avatar,Icon,Layout} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators,Dispatch} from 'redux';
import {Link,RouteComponentProps} from 'react-router-dom';
import {withRouter} from 'react-router';
import * as globalActions from '../../store/actions';
import './style.scss';
const { Header, Content} = Layout;

interface BasicLayoutProps extends RouteComponentProps{
  userInfo:any,
  className:string,
  children:ReactNode|ReactNodeArray
}
interface BasicLayoutState{
  menuSelectedKeys:string[]
}


class BasicLayout extends React.PureComponent<BasicLayoutProps,BasicLayoutState>{
  state={
    menuSelectedKeys:[this.props.match.path.match(/^\/[a-zA-Z]+/)[0]]
  }
  //响应导航栏跳转
  handleMenuClick=({key}:any)=>{
    const {history} = this.props;
    history.push(key);
  }
  render(){
    const {menuSelectedKeys} = this.state;
    const {userInfo,children,className} = this.props;
    const {username} = userInfo;
    const content=(
      <ul className="m-user-operation-list">
        <li className="operation-item" key="1"><Link to="/user/center">用户信息</Link></li>
        <li className="operation-item" key="2"><a href="javascript:;">退出登录</a></li>
      </ul>
    )
    return (
      <Layout className="g-container">
        <Header className="g-header">
            <div className="m-left"><span className="u-title">样本系统</span></div>
            <div className="m-middle">
              <Menu
                className="m-slider"
                theme="dark"
                mode="horizontal"
                selectedKeys={menuSelectedKeys}
                onClick={this.handleMenuClick}
              >
                <Menu.Item key="/navone"><Icon type="mail" /> 导航1</Menu.Item>
                <Menu.Item key="/navtwo"><Icon type="appstore" /> 导航2</Menu.Item>
              </Menu>
            </div>
            <div className="m-right text-right">
              <Popover placement="bottom" content={content}>
                <Avatar icon="user" />
                <span className="u-user-name ml-10">{username}</span>
              </Popover>
            </div>
        </Header>
        <Content className={`g-body ${className}`}>
          {children}
        </Content>
      </Layout>
    )
  }
}
export default connect(
  (state:State)=>({userInfo:state.global.userInfo}),
  (dispatch:Dispatch)=>bindActionCreators(globalActions,dispatch)
)(withRouter(BasicLayout));