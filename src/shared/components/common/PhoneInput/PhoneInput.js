import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-input-mask';

class PhoneInput extends Component {
  constructor(props) {
    super();

    this.state = {
      mask: '+7 (999) 999 99 99',
      placeholderChar: '_',
      value: props.value || '',
    };

    this.firstInput = true;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  onChange = e => {
    if (e.target.value === '+7 (___) ___ __ __' && !this.firstInput)
      return this.setState({
        mask: '+99999999999999999999',
        placeholderChar: ' ',
        value: '',
      });

    this.setState({ value: e.target.value });
    this.props.onChange && this.props.onChange(e);
    this.firstInput = false;
  };

  render() {
    return (
      <MaskedInput
        mask={this.state.mask}
        placeholder={this.state.placeholder}
        className={this.props.className}
        onChange={this.onChange}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        autoFocus={this.props.autoFocus}
        disabled={this.props.disabled}
        value={this.state.value}
        ref={this.props.setRef}
        maskChar={this.state.placeholderChar}
        type="tel"
        alwaysShowMask
      />
    );
  }
}

PhoneInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  setRef: PropTypes.func,
  value: PropTypes.string,
};

export default PhoneInput;
