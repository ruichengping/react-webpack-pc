import React, { useState,useEffect, ReactNodeArray,ReactNode } from 'react';
import {Location} from 'history';
import {Menu,Icon} from 'antd'
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import intl from 'react-intl-universal';
import BasicLayout from '../BasicLayout';
import './style.scss';


const SubMenu = Menu.SubMenu;
function getNavMenuList(){
  return [{
    title:intl.get('NavTwo.SiderMenu.TeacherList'),
    icon:'bars',
    path:'/navtwo/teachers'
  },{
    title:intl.get('NavTwo.SiderMenu.FilmList'),
    icon:'play-circle',
    path:'/navtwo/films'
  },{
    title:intl.get('NavTwo.SiderMenu.Menu'),
    icon:'appstore',
    children:[{
      title:intl.get('NavTwo.SiderMenu.Menu.One'),
      path:'/navtwo/menuone'
    },{
      title:intl.get('NavTwo.SiderMenu.Menu.Two'),
      path:'/navtwo/menutwo'
    }]
  }]
}
function renderNavMenuList(navMenuList){
  return navMenuList.map((navMenu)=>{
    const {children,title,icon,path} = navMenu;
    if(children){
      return <SubMenu key={title} title={<span>{icon&&<Icon type={icon} />}<span> {title}</span></span>}>{renderNavMenuList(children)}</SubMenu>
    }else{
    return <Menu.Item key={path}><Link to={path}>{icon&&<Icon type={icon} />} {title}</Link></Menu.Item>
    }
  })
} 
function getOpenKeyAndSelectedKey(navMenuList,matchedPath){
  const openKeys=[],selectedKeys=[];
  Array.isArray(navMenuList)&&navMenuList.forEach((navMenu)=>{
    const {title,path,children} = navMenu;
    if(children){
      const matchedChild=children.find((child)=>child.path===matchedPath)
      if(matchedChild){
        openKeys.push(title);
        matchedChild.path&&selectedKeys.push(matchedChild.path);
      }
    }else if(path===matchedPath){
      selectedKeys.push(path);
    }
  });
  return {
    openKeys,
    selectedKeys
  }
}
const NavTwoLayout = (props)=>{
  const navMenuList =  getNavMenuList();
  const {children,location} = props;
  const {pathname} = location;
  const {language} = useSelector((state)=>({language:state.global.language}));
  const [openKeys,setOpenKeys] = useState([]);
  const [selectedKeys,setSelectedKeys] = useState([]);
  useEffect(()=>{
    const {openKeys,selectedKeys} = getOpenKeyAndSelectedKey(navMenuList,pathname);
    setOpenKeys(openKeys);
    setSelectedKeys(selectedKeys)
  },[language]);
  const onMenuOpenChange=(openKeys)=>{
    setOpenKeys(openKeys);
  }
  return (
    <BasicLayout className="g-navtwo">
      <div className="g-slider">
        <Menu 
          className="m-menu"
          mode="inline"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={onMenuOpenChange}
        >
          {
            renderNavMenuList(navMenuList)
          }
        </Menu>
      </div>
      <div className="g-main">{children}</div>
    </BasicLayout>
  )
}
export default NavTwoLayout;
