import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Ripple from 'react-ink';
import Icon from './../Icon/Icon';

import styles from './Button.module.styl';

/**
 * Класс для вывода кнопки
 * @param {string} styling Стиль кнопки (mdWhite, mdBlueGradient, mdTransparent, mdPinkGradient)
 * @param {string} glyph Глиф иконки
 * @param {string} text Текст кнопки
 * @param {string} ripple Цвет ripple'а
 * @param {bool} rounded
 * @param {bool} disabled
 * @param {func} clickEvent
 *test
 */

class Button extends Component {
  render() {
    const {
      styling,
      glyph,
      text,
      ripple,
      rounded,
      disabled,
      clickEvent,
      color,
      style,
      type,
    } = this.props;

    return (
      <button
        className={styles.container}
        disabled={disabled}
        onClick={clickEvent}
        style={style}
        type={type}
      >
        <div className={cn(styles[styling], rounded ? styles.rounded : null)}>
          {glyph
            ? <Icon className={styles.icon} glyph={glyph} size={24} />
            : null}
          <span className={styles.text} style={{ color }}>
            {text}
          </span>
          {!disabled ? <Ripple style={{ color: ripple }} /> : null}
        </div>
      </button>
    );
  }
}

Button.propTypes = {
  styling: PropTypes.string,
  color: PropTypes.string,
  glyph: PropTypes.string,
  text: PropTypes.string.isRequired,
  ripple: PropTypes.string,
  rounded: PropTypes.bool,
  disabled: PropTypes.bool,
  clickEvent: PropTypes.func,
  style: PropTypes.shape(),
  type: PropTypes.string,
};

Button.defaultProps = {
  styling: 'mdWhite',
  color: '',
  glyph: '',
  ripple: '#536dfe',
  rounded: false,
  disabled: false,
  type: 'button',
};

export default Button;
