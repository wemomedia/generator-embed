import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import * as actions from '../../actions/index';
import styles from './template-menu.scss';
import * as PageTemplates from '../../component-data-templates/page-templates';

// import PublishMenu from '../../components/application-components/PublishMenu/PublishMenu';
// import SavedPageListItem from '../../components/application-components/SavedPageListItem/SavedPageListItem';
import TemplateMenuItem from './TemplateMenuItem'

class TemplateMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // editablePosts: [],
      currentPage: null
    }

    // this.retrieveSaved = this.retrieveSaved.bind(this)
    this.startNew = this.startNew.bind(this);
    // this.getTransportPages = this.getTransportPages.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    // this.cancelPublishing = this.cancelPublishing.bind(this);
    // this.postToTransport = this.postToTransport.bind(this);
    // this.updatePageList = this.updatePageList.bind(this);
  }

  componentDidMount() {
    // this.props.getUserPages();
  }

  startNew(template) {
    this.props.loadComponents(template.components);
    this.props.loadPageStyle(template.pageStyle);
    this.props.setPageData();
    browserHistory.push('/build');
  }

  // retrieveSaved(pageStyle, activeComponents) {
  //   this.props.loadComponents(activeComponents);
  //   this.props.loadPageStyle(pageStyle);
  //   this.props.setPageData();
  //   browserHistory.push('/build');
  // }

  // getTransportPages(transportToken) {
  //   const that = this;
  //   const localToken = localStorage.getItem('token');
  //   const xhr = new XMLHttpRequest();
  //   xhr.withCredentials = true;
  //
  //   xhr.addEventListener('readystatechange', function () {
  //     if (this.readyState === 4) {
  //       return that.setState({ editablePosts: JSON.parse(this.responseText) });
  //     }
  //   });
  //
  //   xhr.open('GET', '/api/oauth/transport/editable-posts');
  //   xhr.setRequestHeader('transport-access', `Bearer ${transportToken}`);
  //   xhr.setRequestHeader('authorization', localToken)
  //   xhr.send();
  // }

  setCurrentPage(page) {
    return this.setState({ currentPage: page });
  }

  // cancelPublishing() {
  //   return this.setState({ currentPage: null, editablePosts: [] });
  // }
  //
  // postToTransport(transportPost) {
  //   const that = this;
  //   const page = this.state.currentPage;
  //   const transportToken = localStorage.getItem('transport-access');
  //   const genToken = localStorage.getItem('token');
  //
  //   const postData = {
  //     id: transportPost.id,
  //     content: page.htmlString,
  //     transportToken
  //   }

  //   const xhr = new XMLHttpRequest();
  //   xhr.withCredentials = true;
  //   xhr.addEventListener('readystatechange', function () {
  //     if (this.readyState === 4 && this.status === 200) {
  //       alert('Page posted to transport')
  //       that.cancelPublishing()
  //     }
  //   });
  //
  //   xhr.open('POST', `/api/pages/${page._id}/transport`);
  //   xhr.setRequestHeader('authorization', genToken);
  //   xhr.setRequestHeader('content-type', 'application/json');
  //   xhr.send(JSON.stringify(postData));
  // }
  //
  // updatePageList(id) {
  //   this.props.getUserPages()
  // }

  render() {
    const that = this;
    // const transportAccess = localStorage.getItem('transport-access');
    //
    // const savedPageList = (() => {
    //   if (this.props.user.pages && this.props.user.pages.length > 0) {
    //     return this.props.user.pages.map(page => {
    //       let pageStyle = JSON.parse(page.pageData).pageStyle;
    //       let activeComponents = JSON.parse(page.pageData).activeComponents;
    //       return (
    //         <SavedPageListItem
    //           key={page.title}
    //           savedPageData={page}
    //           pageStyle={pageStyle}
    //           activeComponents={activeComponents}
    //           transportAccess={transportAccess}
    //           getTransportPages={this.getTransportPages}
    //           setCurrentPage={this.setCurrentPage}
    //           retrieveSaved={this.retrieveSaved}
    //           updatePageList={this.updatePageList}
    //         />
    //       )
    //     }, this)
    //   } else {
    //     return <h3>No pages created</h3>
    //   }
    // })();

    // const publishMenu = (() => {
    //   if (this.state.editablePosts !== [] && this.state.editablePosts.length > 0) {
    //     return (
    //       <PublishMenu
    //         editablePosts={this.state.editablePosts}
    //         cancelPublishing={this.cancelPublishing}
    //         postToTransport={this.postToTransport} />
    //       )
    //   }
    // })();

    return (
      <div className={styles['template-menu']}>
        <div className={styles['template-menu-container']}>
          <h2>Choose a Template</h2>
          <div>

          <TemplateMenuItem
            title="Blank Template"
            template="blankTemplate"
            icon="blank"
            img={null}
            startNew={this.startNew} />

            <TemplateMenuItem
              title="Transport Content Piece"
              template="transportPageTemplate"
              img="https://igen.wevr.com/a8d1654b-0ae2-40c3-8f9d-b288bae1760a_transport-content-preview.jpg"
              startNew={this.startNew} />

            <TemplateMenuItem
              title="Header Template"
              template="headerPageTemplate"
              img="https://igen.wevr.com/6a4732bf-110a-4ca2-8989-f68a28f73024_header_layout_thumb.jpg"
              startNew={this.startNew} />

              <TemplateMenuItem
                title="Article Template"
                template="articleTemplate"
                img="https://igen.wevr.com/c7ceb238-039b-483f-8bcf-aa8f7fc3c067_article-preview.jpg"
                startNew={this.startNew} />

              <TemplateMenuItem
                title="Fullscreen Video"
                template="videoPageTemplate"
                img="https://igen.wevr.com/9c702b4e-1e12-45f1-81b3-5979d0b9b3d5_fullscreen_video_thumb.jpg"
                startNew={this.startNew} />

              <TemplateMenuItem
                title="Transport Home"
                template="transportHomeTemplate"
                img="https://igen.wevr.com/8db8ea94-a11d-4e21-8534-bd7632197e7c_transport-home-thumb.jpg"
                startNew={this.startNew} />
              </div>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { activeComponents: state.activeComponents }
}

// result will modify redux store, with new state
function mapDispatchToProps(dispatch) {
  // when loadTemplate is called, pass component array to reducers
  return bindActionCreators(actions, dispatch)
}

// connect template menu to the redux store
// gives access to actions (actions => reducers => modified state)
export default connect(mapStateToProps, mapDispatchToProps)(TemplateMenu);
