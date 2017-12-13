import React, { Component } from 'react';
import PropTypes from 'prop-types';

const iconsContext = require.context(
  '../../../../public/images',
  false,
  /\.svg$/
);
const icons = iconsContext.keys().reduce((res, icon) => {
  res[icon.replace(/.*\/([\w\-]+)\.svg/, '$1')] = iconsContext(icon);
  return res;
}, {});

/**
 * Класс для вывода векторной иконки
 * @param {string} glyph Название выводимой иконки (имя файла из папки images/icons)
 * @param {string} [size] Размер иконки, ширина/высота
 * @param {string} [color] Цвет иконки
 * @param {string} [rotate=0] Угол поворота
 * @param {string} [className] Дополнительный класс
 */
export default class Icon extends Component {
  render() {
    let { glyph, size, color, rotate, className, clickEvent } = this.props;

    let iconStyles = {};

    if (rotate !== 0) {
      iconStyles.transform = iconStyles.WebkitTransform = iconStyles.MozTransform = iconStyles.OTransform = iconStyles.msTransform = `rotate(${rotate}deg)`;
    }

    return (
      <svg
        onClick={clickEvent}
        className={className}
        style={iconStyles}
        fill={color || '#000'}
        height={size || 24}
        width={size || 24}
        xmlns="http://www.w3.org/2000/svg"
      >
        <use xlinkHref={icons[glyph]} />
      </svg>
    );
  }
}

Icon.displayName = 'Icon';

Icon.propTypes = {
  glyph: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  rotate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  clickEvent: PropTypes.func,
};

Icon.defaultProps = {
  rotate: 0,
  className: '',
  color: '',
};
