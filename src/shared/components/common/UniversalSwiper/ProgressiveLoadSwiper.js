import React from 'react';
import PropTypes from 'prop-types';
import CancelablePromise from 'cancelable-promise';

import { API_REQUEST_BASE_PROD } from '../../../constants/ApiRequestConstants';

import Swiper from './UniversalSwiper';

import photoBlack24px from '../../../../../public/images/ic_photo_black_24px.file.svg';

import styles from './UniversalSwiper.module.styl';

const imageLoadSequence = {
  LOAD_ALL: 0,
  LOAD_FIRST_ONLY: 1,
  LOAD_EXCEPT_FIRST: 2,
};

class ProgressiveLoadSwiper extends React.Component {
  constructor(props) {
    super(props);

    const pics = [...Array(this.props.pics.length)];

    this.state = {
      pics,
    };

    // набор промисов для отмены в случае Unmount
    this.promises = [];
  }

  checkImage = path => {
    if (!!path) {
      const p = new CancelablePromise(resolve => {
        const img = new Image();
        img.onload = () => resolve({ path, status: 'ok' });
        img.onerror = () => resolve({ path, status: 'error' });

        img.src = `${API_REQUEST_BASE_PROD}${path}`;
      });
      this.promises.push(p);
      return p;
    }
  };

  onTouchTap = () => {
    if (this.props.onTouchTap) this.props.onTouchTap();
  };

  imageConstructor = (src = null, index) =>
    <div key={`swiperItem-${index}`} className={this.props.slideClass}>
      <div
        key={`sliderImage-${index}`}
        style={{
          ...(src && {
            backgroundImage: `url(${API_REQUEST_BASE_PROD}${src})`,
          }),
          opacity: src ? 1 : 0.1,
        }}
        className={this.props.imageClass}
      />
      <div className={!src ? styles.placeholder : styles.placeholderHidden}>
        <img src={photoBlack24px} />
      </div>
    </div>;

  componentWillMount() {
    const dummyPics = this.state.pics.map(this.imageConstructor);

    this.setState({ pics: dummyPics });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loadFirstOnly && !nextProps.loadFirstOnly)
      this.loadPictures(imageLoadSequence.LOAD_EXCEPT_FIRST);

    if (this.props.pics !== nextProps.pics) {
      const pics = [...Array(nextProps.pics.length)];
      const dummyPics = pics.map(this.imageConstructor);

      this.setState({ pics: dummyPics }, () => {
        this.loadPictures(
          this.props.loadFirstOnly && imageLoadSequence.LOAD_FIRST_ONLY
        );
      });

      this.promises.forEach(item => !!item && item.cancel());
      this.promises.length = 0;
    }
  }

  // обработка второго и последующих изображений
  _processNImages = promise => {
    /* eslint-disable no-unused-vars */
    const [first, second, third, fourth, ...remaining] = this.props.pics;
    const newPics = this.state.pics;

    let imageIndex = 1;

    return promise
      .then(vals => {
        if (vals.length === 0) return [];

        vals.forEach((val, index) => {
          if (val && !!val.path) {
            newPics[imageIndex] = this.imageConstructor(val.path, imageIndex++);
          }
          this.promises[1 + index] = null;
        });

        this.setState({ pics: newPics });

        const promises = [...remaining].map(this.checkImage);

        return CancelablePromise.all(promises);
      })
      .then(vals => {
        if (vals.length === 0) return [];

        vals.forEach((val, index) => {
          if (!!val.path) {
            newPics[imageIndex] = this.imageConstructor(val.path, imageIndex++);
          }
          this.promises[4 + index] = null;
        });

        this.setState({ pics: newPics });
      });
  };

  loadPictures = (loadSequence = imageLoadSequence.LOAD_ALL) => {
    const [first, second, third, fourth] = this.props.pics;
    const newPics = this.state.pics;

    const promise =
      loadSequence === imageLoadSequence.LOAD_EXCEPT_FIRST
        ? CancelablePromise.all([second, third, fourth].map(this.checkImage))
        : this.checkImage(first).then(val => {
          newPics[0] = this.imageConstructor(val.path, 0);
          this.promises[0] = null;

          this.setState({ pics: newPics });

            // загрузить только первое изображение
          if (loadSequence === imageLoadSequence.LOAD_FIRST_ONLY) return [];

            // загрузить остальные
          const promises = [second, third, fourth].map(this.checkImage);
          return CancelablePromise.all(promises);
        });

    this._processNImages(promise);
  };

  componentDidMount() {
    this.loadPictures(
      this.props.loadFirstOnly && imageLoadSequence.LOAD_FIRST_ONLY
    );
  }

  componentWillUnmount() {
    this.promises.filter(item => !!item).forEach(item => item.cancel());
  }

  render() {
    // Свайпер проверяет по референсу, поэтому каждый раз делаем клон массива
    let swiperContent = this.state.pics.slice();

    return this.props.loadFirstOnly
      ? this.state.pics[0]
      : <Swiper onTap={this.onTouchTap} {...this.props.settings}>
          {swiperContent}
        </Swiper>;
  }
}

ProgressiveLoadSwiper.propTypes = {
  settings: PropTypes.shape(),
  imageClass: PropTypes.string,
  slideClass: PropTypes.string,
  pics: PropTypes.arrayOf(PropTypes.string),
  onTouchTap: PropTypes.func,
  loadFirstOnly: PropTypes.bool,
};

export default ProgressiveLoadSwiper;
