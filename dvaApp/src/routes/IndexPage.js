import React from 'react';
import { connect } from 'dva';
import {Link} from "dva/router"
import styles from './IndexPage.css';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <Link to="products">products</Link>
      <hr/>
      <Link to="user">user</Link>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
