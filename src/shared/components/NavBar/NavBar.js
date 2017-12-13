import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import styles from './NavBar.module.styl';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';

class NavBar extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <div className={styles.wrapper}>
        {'NAVBAR'}
      </div>
    );
  }
}

export default withRouter(NavBar);
