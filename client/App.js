import React from 'react';
import { connect } from 'react-redux';

import Header from './containers/Header/Header';

import styles from './styles/app.scss';

class App extends React.Component {
  render() {
    const header = (() => {
      if (this.props.location.pathname !== '/build') {
        return <Header />
      }
      return;
    })();

    // remove background in build mode, unless mobile view
    const backgroundStyle = (() => {
      if (this.props.location.pathname === '/build' && this.props.pageData.viewMode !== 'mobile') {
        return { background: 'rgba(0,0,0,0)' }
      } else if (this.props.location.pathname === '/build' && this.props.pageData.viewMode === 'mobile') {
        return { minHeight: 'calc(100vh + 250px)' }
      }
    })();

    return (
      <div className={styles.app} style={backgroundStyle}>
        { header }
        { this.props.children }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { pageData: state.pageData }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, null)(App);
