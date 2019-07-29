import React from 'react';
import {Layout,Menu,Popover,Avatar,Icon} from 'antd';
import classnames  from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router';
import withStyles from 'isomorphic-style-loader/withStyles';
import * as globalActions from '../../store/actions';
const { Header, Content} = Layout;
import styles from './style.scss';
@connect(
  state=>({user:state.user}),
  dispatch=>bindActionCreators(globalActions,dispatch)
)
class BasicLayout extends React.PureComponent{
  static propTypes = {
    history: PropTypes.object.isRequired,
    match:PropTypes.object.isRequired
  }
  constructor(props){
    super(props);
    const {match} = props;
    const {fecthUserName} = props;
    fecthUserName();
    this.state={
      menuSelectedKeys:[match.path.match(/^\/[a-zA-Z]+/)[0]]
    }
  }
  //响应导航栏跳转
  handleMenuClick=({key})=>{
    const {history} = this.props;
    history.push(key);
  }
  render(){
    const {menuSelectedKeys} = this.state;
    const {user,children,className} = this.props;
    const {username} = user;
    const content=(
      <ul className={styles.userOperationList}>
        <li className={styles.operationItem} key="1"><Link to="/user/center">用户信息</Link></li>
        <li className={styles.operationItem} key="2"><a href="javascript:;">退出登录</a></li>
      </ul>
    )
    return (
      <Layout className={styles.container}>
        <Header className={styles.header}>
            <div className={styles.left}><span className={styles.title}>样本系统</span></div>
            <div className={styles.middle}>
              <Menu
                className={styles.slider}
                theme="dark"
                mode="horizontal"
                selectedKeys={menuSelectedKeys}
                onClick={this.handleMenuClick}
              >
                <Menu.Item key="/navone"><Icon type="mail" /> 导航1</Menu.Item>
                <Menu.Item key="/navtwo"><Icon type="appstore" /> 导航2</Menu.Item>
              </Menu>
            </div>
            <div className={classnames(styles.right,"text-right")}>
              <Popover placement="bottom" content={content}>
                <Avatar icon="user" />
                <span className={classnames(styles.userName,"ml-10")}>{username}</span>
              </Popover>
            </div>
        </Header>
        <Content className={classnames(styles.body,className)}>
          {children}
        </Content>
      </Layout>
    )
  }
}
export default withStyles(styles)(withRouter(BasicLayout));