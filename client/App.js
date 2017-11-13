import React from 'react';
import { connect } from 'react-redux';

import Header from './containers/Header/Header';

import styles from './styles/app.scss';

class App extends React.Component {
  render() {
    const { theme } = this.props.pageData

    const header = (() => {
      if (this.props.location.pathname !== '/build') return <Header />
      return;
    })();

    // remove background in build mode, unless mobile view
    const style = (() => {
      if (this.props.location.pathname === '/build' && this.props.pageData.viewMode !== 'mobile') {
        return { background: 'rgba(0,0,0,0)' }
      } else if (this.props.location.pathname === '/build' && this.props.pageData.viewMode === 'mobile') {
        return { minHeight: 'calc(100vh + 250px)' }
      }
    })();

    var fontOverride = ''
    if (theme) {
      style.fontFamily = theme.font.fontFamily
      fontOverride = `body, button, input { font-family: ${theme.font.fontFamily} !important;} }`
    }

    return (
      <div className={styles.app} style={style}>
        { (theme && theme.font) && <link href={theme.font.src} rel="stylesheet" /> }
        { (theme && theme.font) && <style>{fontOverride}</style> }
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
