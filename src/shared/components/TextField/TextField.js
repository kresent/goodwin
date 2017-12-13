import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './../Icon/Icon';
import PhoneInput from '../common/PhoneInput/PhoneInput';
import classnames from 'classnames';

import styles from './TextField.module.styl';

/**
 * Класс для вывода поля ввода
 * @param {string} placeholder Подсказка
 * @param {string} glyph Глиф иконки
 * @param {string} type Тип инпута
 * @param {bool} error
 */

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      focus: false,
      error: this.props.error,
      showPassword: false,
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.error !== this.props.error)
      this.setState({ error: nextProps.error });
    if (nextProps.value !== this.props.value)
      this.setState({ value: nextProps.value });
  };

  onChange = event => {
    const value = event.currentTarget.value;
    if (this.props.onChange) this.props.onChange(value);
    this.setState({ value });
  };

  onFocus = () => {
    this.setState({ focus: true });
  };

  onBlur = () => {
    this.setState({ focus: false });
  };

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const { focus, error, showPassword, value } = this.state;
    const {
      placeholder,
      glyph,
      type,
      autoFocus,
      disabled,
      noMask,
    } = this.props;

    const container = classnames({
      [styles.container]: true,
      [styles.containerFocus]: focus,
      [styles.containerError]: error,
    });

    return (
      <label disabled={disabled} className={container}>
        {glyph
          ? <Icon
              className={styles.iconLeft}
              glyph={glyph}
              size={24}
              color={error ? '#ff4081' : '#546e7a'}
            />
          : null}
        {type === 'tel' && !noMask
          ? <PhoneInput
              className={styles.input}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={this.onChange}
              value={value}
              autoFocus={autoFocus}
              disabled={disabled}
            />
          : <input
              className={styles.input}
              type={showPassword ? 'text' : type}
              placeholder={placeholder}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={this.onChange}
              value={value}
              autoFocus={autoFocus}
              disabled={disabled}
            />}
        {type === 'password'
          ? <Icon
              className={styles.iconRight}
              glyph={
                !showPassword
                  ? 'ic_eye_androidl_24px'
                  : 'ic_invisible_androidl_24px'
              }
              size={24}
              color="#546e7a"
              clickEvent={this.togglePasswordVisibility}
            />
          : null}
      </label>
    );
  }
}

TextField.propTypes = {
  placeholder: PropTypes.string,
  glyph: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  noMask: PropTypes.bool, // для type="tel", чтобы показать цифровую клавиатуру, но не маскированный инпут
};

TextField.defaultProps = {
  placeholder: '',
  glyph: '',
  type: 'text',
  error: false,
  autoFocus: false,
};

export default TextField;
