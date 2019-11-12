import React,{ReactNode,ReactNodeArray,useState} from 'react';
import {Menu,Popover,Avatar,Icon,Layout} from 'antd';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {useHistory,useRouteMatch} from 'react-router';
import './style.scss';
const { Header, Content} = Layout;

interface BasicLayoutProps{
  className:string,
  children:ReactNode|ReactNodeArray
}
const BasicLayout = (props:BasicLayoutProps)=>{
  const {children,className} = props;
  const history = useHistory();
  const match = useRouteMatch();
  const [menuSelectedKeys] = useState([match.path.match(/^\/[a-zA-Z]+/)[0]]);
  const {userInfo} = useSelector((state:State)=>({userInfo:state.global.userInfo}),);
  const onMenuClick=({key}:any)=>{
    history.push(key);
  }
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
              onClick={onMenuClick}
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

export default BasicLayout;