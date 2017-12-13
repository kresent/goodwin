import React from 'react';
import PropTypes from 'prop-types';
import Ink from 'react-ink';
import Icon from './../../Icon/Icon';

import styles from './SlideCounter.module.styl';

import EllipsePanel from '../EllipsePanel/EllipsePanel';

const SlideCounter = props =>
  <EllipsePanel
    className={
      props.isMobile || props.dark ? styles.containerMobile : styles.container
    }
    style={props.style}
  >
    {(!props.isMobile || props.dark) &&
      <button
        disabled={props.currentSlideIndex === 0 || props.disabled}
        className={styles.button}
        type="button"
        onClick={props.clickPreviousSlide}
      >
        <Icon
          glyph="ic_arrow_drop_down_black_24px"
          size={24}
          rotate={90}
          color="#607d8b"
        />
        <Ink
          style={{ color: 'rgba(83, 109, 254, 1)' }}
          background={false}
          touched={true}
        />
      </button>}
    <div className={styles.counter}>
      <span
        className={
          props.isMobile || props.dark ? styles.curSlideMobile : styles.curSlide
        }
      >
        {`${props.currentSlideIndex + 1}`} /{' '}
      </span>
      <span
        className={
          props.isMobile || props.dark ? styles.sumSlideMobile : styles.sumSlide
        }
      >
        {`${props.slidesCount}`}
      </span>
    </div>
    {(!props.isMobile || props.dark) &&
      <button
        disabled={
          props.currentSlideIndex === props.slidesCount - 1 || props.disabled
        }
        className={styles.button}
        type="button"
        onClick={props.clickNextSlide}
      >
        <Icon
          glyph="ic_arrow_drop_down_black_24px"
          size={24}
          rotate={270}
          color="#607d8b"
        />
        <Ink
          style={{ color: 'rgba(83, 109, 254, 1)' }}
          background={false}
          touched={true}
        />
      </button>}
  </EllipsePanel>;

SlideCounter.propTypes = {
  currentSlideIndex: PropTypes.number.isRequired,
  slidesCount: PropTypes.number.isRequired,
  clickNextSlide: PropTypes.func.isRequired,
  clickPreviousSlide: PropTypes.func.isRequired,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  isMobile: PropTypes.bool,
  dark: PropTypes.bool,
};

export default SlideCounter;
