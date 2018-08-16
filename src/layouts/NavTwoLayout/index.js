import React from 'react';
import BasicLayout from '../BasicLayout';
import {Menu,Icon} from 'antd'
import './style.scss';
const SubMenu = Menu.SubMenu;
class NavTwoLayout extends React.PureComponent{
  render(){
    const {children} = this.props;
    return (
      <BasicLayout className="g-navone">
        <div className="g-slider">
          <Menu 
            className="m-menu"
            mode="inline"
          >
            <SubMenu title={<span><Icon type="mail" /><span> 菜单一</span></span>}>
              <Menu.Item key="/navone/one">选项一</Menu.Item>
              <Menu.Item key="/navone/two">选项二</Menu.Item>
            </SubMenu>
            <Menu.Item key="/navone/three"><Icon type="desktop" /> 菜单一</Menu.Item>
            <Menu.Item key="/navone/four"><Icon type="inbox" /> 菜单三</Menu.Item>
          </Menu>
        </div>
        <div className="g-main">{children}</div>
      </BasicLayout>
    )
  }
}
export default NavTwoLayout;