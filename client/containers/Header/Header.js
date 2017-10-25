import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import * as actions from '../../actions';

import styles from './header.scss';

function Header(props) {
  return (
    <div className={styles.header}>
      <Link to={'/'}><img src="https://www.transportvr.com/xassets/logo.svg?3" /> | Generator Lite</Link>
    </div>
  )
}

export default Header;
