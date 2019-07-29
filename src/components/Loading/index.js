import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './style.scss';
const Loading = (props)=>{
  const {loading=true,children} = props;
  return (
    loading?<div className={styles.compLoading}>
      <div className={styles.item1}></div>
      <div className={styles.item2}></div>
      <div className={styles.item3}></div>
      <div className={styles.item4}></div>
      <div className={styles.item5}></div>
    </div>:children
  )
}
export default withStyles(styles)(Loading)
