import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Toggle.module.styl';

class Toggle extends Component {
  render() {
    const { onChange, checked, className, disabled } = this.props;

    const classNames = classnames({
      [className]: className,
      [styles.container]: true,
      [styles.containerActive]: checked,
    });

    return (
      <label disabled={disabled} className={classNames}>
        <input
          className={styles.input}
          type="checkbox"
          onChange={onChange}
          checked={checked}
          disabled={disabled}
        />
      </label>
    );
  }
}

Toggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Toggle.defaultProps = {
  checked: false,
  className: '',
};

export default Toggle;
