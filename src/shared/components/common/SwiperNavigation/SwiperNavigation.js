import React from 'react';
import PropTypes from 'prop-types';

import MDSpinner from 'react-md-spinner';
import cn from 'classnames';

import Swiper from '../../common/UniversalSwiper/UniversalSwiper';

import styles from './SwiperNavigation.module.styl';

const spinner = (
  <div className={styles.spinner}>
    <MDSpinner size={32} singleColor={'#8c9eff'} />
  </div>
);

class SwiperNavigation extends React.Component {
  constructor(props) {
    super();

    const { views } = props;

    this.state = {
      currentView: 0,
      controls: views.map(item => item.controls),
      titles: this._populateTitles(views, 0),
    };

    this.viewSwiper = null;
    this.pageSwiper = null;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      controls: nextProps.views.map(item => item.controls),
    });

    if (nextProps.currentViewIndex !== this.props.currentViewIndex) {
      this.handlePageClick(nextProps.currentViewIndex);
    }
  }

  _populateTitles = (views, activeIndex) =>
    views.map((item, index) =>
      <div key={`page-${index}`} onClick={() => this.handlePageClick(index)}>
        <div
          className={
            index === activeIndex
              ? cn(styles.pageActive, styles.page, 'swiper-no-swiping')
              : cn(styles.page, 'swiper-no-swiping')
          }
        >
          {item.title}
        </div>
      </div>
    );

  toggleActivePages = index => {
    // текущий слайд и активная кнопка в Pages - разные сущности
    this.setState({ titles: this._populateTitles(this.props.views, index) });
  };

  handlePageClick = index => {
    this.viewSwiper.slideTo(index, 400, true);
  };

  updateCurrentView = index => {
    this.setState({ currentView: index });
    this.pageSwiper.slideTo(Math.max(index - 1, 0), 400, false);
    this.props.onPageChange && this.props.onPageChange(index);
  };

  get viewSwiperSettings() {
    return {
      slidesPerView: 'auto',
      runCallbacksOnInit: true,
      centeredSlides: true,
      containerClass: styles.pageSwiper,
      slideClass: styles.viewSlide,
      wrapperClass: styles.wrapper,

      observer: true,
      observeParents: true,

      onInit: swiper => {
        this.viewSwiper = swiper;
      },

      onSlideChangeStart: swiper => this.toggleActivePages(swiper.activeIndex),
      onSlideChangeEnd: swiper => this.updateCurrentView(swiper.activeIndex),
    };
  }

  get pageSwiperSettings() {
    return {
      slidesPerView: 'auto',
      runCallbacksOnInit: true,

      spaceBetween: 24,
      slidesOffsetBefore: 12,
      slidesOffsetAfter: 12,
      slideClass: styles.pageSlide,
      wrapperClass: styles.wrapper,

      observer: true,
      observeParents: true,

      onInit: swiper => (this.pageSwiper = swiper),
    };
  }

  render() {
    const { title, views } = this.props;
    const { currentView, controls, titles } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.controls}>
            {controls[currentView]}
          </div>
        </div>
        <div className={styles.pagination}>
          <Swiper {...this.pageSwiperSettings}>
            {titles}
          </Swiper>
        </div>
        <Swiper {...this.viewSwiperSettings}>
          {views.map((item, index) =>
            <div key={`view-${index}`}>
              {!item.unload || currentView === index ? item.view : spinner}
            </div>
          )}
        </Swiper>
      </div>
    );
  }
}

SwiperNavigation.propTypes = {
  // заголовок блока
  title: PropTypes.string.isRequired,
  // представления
  views: PropTypes.arrayOf(
    PropTypes.shape({
      // название представления (в кнопках)
      title: PropTypes.string.isRequired,
      // кнопки, связанные с представлением
      controls: PropTypes.arrayOf(PropTypes.node),
      // представление
      view: PropTypes.node.isRequired,
      // если true, представление выгружается после перехода с него
      unload: PropTypes.bool,
    })
  ),
  currentViewIndex: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default SwiperNavigation;
