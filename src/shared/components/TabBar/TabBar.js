import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import styles from './TabBar.module.styl';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from '../Icon/Icon';

class TabBar extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.location.pathname !== nextProps.location.pathname;
  }

  render() {
    const { className } = this.props;

    return (
      <div className={cn(styles.wrapper, className)}>
        <NavLink
          exact
          to="/mobile/map"
          className={styles.navTab}
          activeClassName={styles.navTabActive}
        >
          <Icon glyph="ic_map_black_24px" color="#546e7a" />
        </NavLink>
        <span className={styles.divider} />
        <NavLink
          to="/account/filters"
          className={styles.navTab}
          activeClassName={styles.navTabActive}
        >
          <Icon glyph="ic_favorite_black_24px" color="#546e7a" />
        </NavLink>

        <NavLink
          to="/account"
          className={styles.navTabCabineteActive}
          activeClassName={styles.navTabCabinete}
        >
          <span className={styles.ripple} />
          <span className={styles.logo} />
        </NavLink>

        <NavLink
          to="/chat"
          className={styles.navTab}
          activeClassName={styles.navTabActive}
        >
          <Icon glyph="ic_forum_black_24px" color="#546e7a" />
        </NavLink>
        <span className={styles.divider} />

        <NavLink
          to="/profile"
          className={styles.navTab}
          activeClassName={styles.navTabActive}
        >
          <Icon glyph="ic_settings_applications_black_24px" color="#546e7a" />
        </NavLink>
      </div>
    );
  }
}

TabBar.propTypes = {
  className: PropTypes.string,
};

TabBar.defaultTypes = {
  className: '',
};

export default withRouter(TabBar);
