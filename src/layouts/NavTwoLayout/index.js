import React from 'react';
import {Link} from 'react-router-dom';
import BasicLayout from '../BasicLayout';
import {Menu,Icon} from 'antd'
import './style.scss';
const SubMenu = Menu.SubMenu;
const navMenuList = [{
  title:'老师列表',
  icon:'bars',
  path:'/navtwo/teachers'
},{
  title:'影片列表',
  icon:'play-circle',
  path:'/navtwo/films'
},{
  title:'菜单',
  icon:'appstore',
  children:[{
    title:'菜单一',
    path:'/navtwo/menuone'
  },{
    title:'菜单一',
    path:'/navtwo/menutwo'
  }]
}];

class NavTwoLayout extends React.PureComponent{
  renderNavMenuList(navMenuList){
    return navMenuList.map((navMenu)=>{
      const {children,title,icon,path} = navMenu;
      if(children){
        return <SubMenu key={title} title={<span><Icon type={icon} /><span> {title}</span></span>}>{this.renderNavMenuList(children)}</SubMenu>
      }else{
        return <Menu.Item key={path}><Link to={path}><Icon type={icon} /> {title}</Link></Menu.Item>
      }
    })
  } 
  getOpenKeyAndSelectedKey(navMenuList,matchedPath){
    const openKeys=[],selectedKeys=[];
    Array.isArray(navMenuList)&&navMenuList.forEach((navMenu)=>{
      const {title,path,children} = navMenu;
      if(children){
        const matchedChild=children.find((child)=>child.path===matchedPath)
        if(matchedChild){
          openKeys.push(title);
          selectedKeys.push(matchedChild.path);
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
  render(){
    const {children,location} = this.props;
    const {pathname} = location;
    const {openKeys,selectedKeys} = this.getOpenKeyAndSelectedKey(navMenuList,pathname);
    return (
      <BasicLayout className="g-navtwo">
        <div className="g-slider">
          <Menu 
            className="m-menu"
            mode="inline"
            openKeys={openKeys}
            selectedKeys={selectedKeys}
          >
            {
              this.renderNavMenuList(navMenuList)
            }
          </Menu>
        </div>
        <div className="g-main">{children}</div>
      </BasicLayout>
    )
  }
}
export default NavTwoLayout;