import 'normalize.css/normalize.css';
import 'swiper_css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TabBar from '../../components/TabBar/TabBar';
import NavBar from '../../components/NavBar/NavBar';

import Router from './Router';

import { getProfile } from '../../actions/auth';

import config from '../../../../config';

import './App.styl';
import styles from './App.module.styl';

class App extends Component {
  componentDidMount() {
    if (!this.props.isAuthenticated && this.props.getProfile)
      this.props.getProfile();
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Helmet>
          <html lang="ru" />
          <title>
            {config('htmlPage.defaultTitle')}
          </title>
          <meta
            name="application-name"
            content={config('htmlPage.defaultTitle')}
          />
          <meta name="description" content={config('htmlPage.description')} />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1"
          />
          <link rel="icon" sizes="16x16 32x32" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
        </Helmet>
        <div className={styles.appLayout}>
          <NavBar />
          <div className={styles.content}>
            <Router />
          </div>
          <TabBar />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  getProfile: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

App.defaultProps = {
  isAuthenticated: false,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  getProfile: bindActionCreators(getProfile, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
