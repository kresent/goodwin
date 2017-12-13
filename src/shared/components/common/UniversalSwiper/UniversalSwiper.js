import React from 'react';
import PropTypes from 'prop-types';

// prevents 'window not defined' error on server
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

class UniversalSwiper extends React.Component {
  render() {
    const { setRef: ref } = this.props;
    const props = {
      ...this.props,
      ref,
    };

    return (
      <div style={{ height: '100%' }}>
        {canUseDOM &&
          React.createElement(
            require('react-id-swiper').default,
            props,
            this.props.children
          )}
      </div>
    );
  }
}

UniversalSwiper.propTypes = {
  setRef: PropTypes.func,
};

export default UniversalSwiper;
