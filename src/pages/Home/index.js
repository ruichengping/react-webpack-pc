import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import withStyles from 'isomorphic-style-loader/withStyles';
import * as actions from './redux/actions';
import styles from './style.scss';
import {Icon} from 'antd';
@connect(
  state=>({user:state.user,author:state.author}),
  dispatch=>bindActionCreators(actions,dispatch)
)
class Home extends React.PureComponent{
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
      <div className={styles["page-one"]}>
        <div className={classnames("text-center", "mt-30")}>
          <img height="180" src={avtar}/>
        </div>
        <div className={styles["m-info-wrapper"]}>
          <div className={styles["m-info"]}>
            <div className={classnames(styles["u-info-item"],"mt-30")}><strong className="mr-20"><Icon type="user" /></strong>{name}</div>
            <div className={styles["u-info-item"]}><strong className="mr-20"><Icon type="qq" /></strong>{qq}</div>
            <div className={styles["u-info-item"]}><strong className="mr-20"><Icon type="environment-o" /></strong>{address}</div>
            <div className={styles["u-info-item"]}><strong className="mr-20"><Icon type="book" /></strong><a target="_blank" href={blog}>{blog}</a></div>
            <div className={styles["u-info-item"]}><strong className="mr-20"><Icon type="github" /></strong><a target="_blank" href={github}>{github}</a></div>
          </div>
        </div>
      </div>)
  }
}
export default withStyles(styles)(Home);