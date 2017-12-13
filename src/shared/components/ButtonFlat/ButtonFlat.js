import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Ripple from 'react-ink';

import styles from './ButtonFlat.module.styl';

class ButtonFlat extends Component {
  render() {
    const { text, color, className, onClick } = this.props;

    const classNames = classnames({
      [className]: className,
      [styles.default]: true,
      [styles[color]]: true,
    });

    return (
      <button className={classNames} onClick={onClick}>
        {text}
        <Ripple style={{ color }} />
      </button>
    );
  }
}

ButtonFlat.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

ButtonFlat.defaultProps = {
  color: 'blue',
  className: '',
  onClick: undefined,
};

export default ButtonFlat;
