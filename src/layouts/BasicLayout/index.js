import React from 'react';
import {Layout,Menu,Popover,Avatar,Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';
import * as globalActions from '../../store/actions';
const { Header, Content} = Layout;
import './style.scss';
@connect(
  state=>({userInfo:state.global.userInfo}),
  dispatch=>bindActionCreators(globalActions,dispatch)
)
class BasicLayout extends React.PureComponent{
  static propTypes = {
    history: PropTypes.object.isRequired,
    match:PropTypes.object.isRequired
  }
  state={
    menuSelectedKeys:[this.props.match.path.match(/^\/[a-zA-Z]+/)[0]]
  }
  //响应导航栏跳转
  handleMenuClick=({key})=>{
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
export default withRouter(BasicLayout) ;