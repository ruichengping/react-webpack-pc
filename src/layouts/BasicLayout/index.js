  
import React,{useState,useCallback,useEffect} from 'react';
import {Menu,Popover,Avatar,Icon,Layout,Select} from 'antd';
import intl from 'react-intl-universal';
import {bindActionCreators} from 'redux';
import {useSelector,useDispatch} from 'react-redux';
import {get} from 'lodash';
import {useHistory,useRouteMatch} from 'react-router';
import {languages} from '@/constants';
import * as actions from '@/store/actions';
import './style.scss';
const { Header, Content} = Layout;
const {Option} = Select;
function generateNavMenus(){
  return [{
    displayName:intl.get('TopNavMenu.NavOne'),
    link:'/navone',
    reg:/^\/navone/
  },{
    displayName:intl.get('TopNavMenu.NavTwo'),
    link:'/navtwo',
    reg:/^\/navtwo/
  }];
}
const BasicLayout = (props)=>{
  const {children,className} = props;
  const history = useHistory();
  const match = useRouteMatch();
  const [navMenus,setNavMenus] = useState([]);
  const menuSelectedKeys = [get(navMenus.find((menu)=>menu.reg.test(match.path)),'link')].filter(Boolean);
  const {userInfo,language} = useSelector((state)=>({userInfo:state.global.userInfo,language:state.global.language}));
  const onMenuClick=({key})=>{
    history.push(key);
  }
  //监听语言变化
  useEffect(()=>{
    setNavMenus(generateNavMenus());
  },[language])
  const renderUserInfoPanel=useCallback(()=>{
    const {changeSystemLanguage}= bindActionCreators(actions,useDispatch());
    const {username,email} = userInfo;
    return <div className="user-info-panel">
    <div className="basic-info">
      <div>
        <Avatar src={require('@/assets/avtar.jpeg')} size={38}/>
      </div>
      <div style={{paddingLeft:16}}>
        <div>{username}</div>
        <div>{email}</div>
      </div>
    </div>
    <ul className="action-menu">
      <li>
        <Icon type="diff" />
        <span> {intl.get('Action.ChangeLanguage')}</span> 
        <Select value={language} placeholder="请选择" style={{width:100,float:'right'}} size="small" onChange={changeSystemLanguage}>
          {
            languages.map((lang)=><Option key={lang.value} value={lang.value}>{lang.label}</Option>)
          }
        </Select>
      </li>
      <li><Icon type="logout" /><span> {intl.get('Action.Logout')}</span></li>
    </ul>
   </div>
  },[userInfo,language])
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
              {
                navMenus.map((navMenu)=>{
                  const {displayName,link} = navMenu;
                  return <Menu.Item key={link}>{displayName}</Menu.Item>
                })
              }
            </Menu>
          </div>
          <div className="m-right text-right">
            <Icon className="icon-notice" type="bell" />
            <Icon className="icon-help" type="question-circle" />
            <Popover placement="bottomRight" content={renderUserInfoPanel()}>
              <Avatar src={require('@/assets/avtar.jpeg')} />
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
