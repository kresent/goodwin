import React from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import withRouter from 'react-router-dom/withRouter';
import Redirect from 'react-router-dom/Redirect';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Error404 from '../../components/Error404';

import './Router.styl';
import styles from './Router.module.styl';

class Router extends React.Component {
  render() {
    const { location } = this.props;
    const { pathname: keyPath = '' } = location;

    return (
      <TransitionGroup className={styles.transitionGroup}>
        <CSSTransition timeout={0}>
          <section className={styles.routerSection}>
            <Switch location={location}>
              <Redirect exact from="/" to="/account" />

              <Route
                path="/account"
                render={() =>
                  <div
                    style={{
                      background: 'cyan',
                      height: '200px',
                      width: '100%',
                      top: 0,
                      left: 0,
                    }}
                  >
                    {'account'}
                  </div>}
              />
              <Route
                path="/chat"
                render={() =>
                  <div>
                    {`Chat`}
                  </div>}
              />
              <Route
                path="/profile"
                render={() =>
                  <div>
                    {`profile`}
                  </div>}
              />
              <Route component={Error404} />
            </Switch>
          </section>
        </CSSTransition>
        <CSSTransition
          key={keyPath.split('/')[2] || ''}
          timeout={200}
          classNames="slide"
          appear
        >
          <section className={styles.routerSubSection}>
            <Switch location={location}>
              <Route
                path="/account/filters"
                render={() =>
                  <div
                    style={{
                      background: 'red',
                      height: '1000px',
                      position: 'absolute',
                    }}
                  >
                    {`account/filters`}
                  </div>}
              />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(Router);
