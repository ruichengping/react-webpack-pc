import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './style.scss';

export default withStyles(styles)(()=>{
  return (
    <div className={styles["comp-loading"]}>
      <div className={styles["item-1"]}></div>
      <div className={styles["item-2"]}></div>
      <div className={styles["item-3"]}></div>
      <div className={styles["item-4"]}></div>
      <div className={styles["item-5"]}></div>
    </div>
  )
})
