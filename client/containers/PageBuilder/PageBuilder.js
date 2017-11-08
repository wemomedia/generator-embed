import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import styles module
import styles from './page-builder.scss';
//import components
import Page from './Page/Page'
import PageEditor from '../../components/editor-components/PageEditor/PageEditor';
import PageController from '../../components/controller-components/PageController/PageController';
// import action creators
import * as actions from '../../actions/index';

function PageBuilder(props) {

  // listen for plugin register event from parent
  window.addEventListener('generator-register-plugin', e => {
    const fileUrls = e.detail.urls
    var viewPromise = readComponentData(fileUrls.view)
    var editorPromise = readComponentData(fileUrls.editor)
    var dataPromise = readComponentData(fileUrls.data)

    function readComponentData(url) {
      return new Promise((resolve, reject) => {
        //get component data from file
        var client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            const componentString = client.responseText;
            resolve(componentString)
          }
        }
        client.send();
      })
    }

    Promise.all([viewPromise, editorPromise, dataPromise])
    .then(values => {
      const componentStrings = { view: values[0], editor: values[1], data: values[2] }
      insertComponent(componentStrings)
    });

    function insertComponent(strings) {
      const data = JSON.parse(strings.data);
      // translate component from string to function
      const viewTranslate = Babel.transform(strings.view, { presets: ['es2017', 'react'] }).code;
      const editorTranslate = Babel.transform(strings.editor, { presets: ['es2017', 'react'] }).code;
      const ViewComponent = eval('(' + viewTranslate + ')')
      const EditorComponent = eval('(' + editorTranslate + ')')

      // add component data to component index
      const newComponent = { view: {}, editor: {} }
      newComponent.view[data.title] = ViewComponent
      newComponent.editor[data.title + 'Editor'] = EditorComponent
      props.addPluginComponent(newComponent)
      // add component to active component list
      props.addComponent(null, data)
    }
  })
  // end plugin listener

  // check if in editor mode, send component index to update the editor
  const handlePageClick = function(e, component, ind) {
    if (props.pageData.editing) {
      // check for paragraph component => pass index from argument
      if (component === 'paragraph') return props.changeComponentForEditing(ind);
      e.preventDefault();
      const target = e.target;
      const componentIndex = target.getAttribute('data-index');
      if (component === 'page') return props.changeComponentForEditing(null)
      if (componentIndex) return props.changeComponentForEditing(componentIndex);
    }
  }

  // define presentation page component
  const page = (() => {
      if (props.activeComponents.length !== 0) {
        return (
          <Page
            pageData={props.pageData}
            pageStyle={props.pageStyle}
            editing={props.pageData.editing}
            activeComponents={props.activeComponents}
            handlePageClick={handlePageClick.bind(this)}
            reorderComponent={props.reorderComponent}
            handleEditorChange={props.handleEditorChange}
            addPluginComponent={props.addPluginComponent}
          />
        )
      }
  })();

  // if in edit mode, render the editor component
  const editor = (() => {
    if (props.pageData.editing && props.activeComponents.length !== 0) {
      return (
        <PageEditor
          pageData={props.pageData}
          pageStyle={props.pageStyle}
          deleteComponent={props.deleteComponent}
          activeComponents={props.activeComponents}
          sourceChange={props.sourceChange}
          handleEditorChange={props.handleEditorChange}
          updateImageSource={props.updateImageSource}
          handleBackgroundChange={props.handleBackgroundChange}
        />
      )
    }
  })();

  // define controller component
  const controller = (() => {
    if (!props.pageData.saving) {
      return (
        <PageController
          editing={props.pageData.editing}
          addComponent={props.addComponent}
          togglePreview={props.togglePreview}
          changeViewMode={props.changeViewMode}
          controllerMenu={props.pageData.controllerMenu}
          toggleControllerMenu={props.toggleControllerMenu}
          savePage={props.setPageTitle}
        />
      )
    }
  })();

  // render elements
  return (
    <div>
      <div className={styles['page-builder']}>
        { controller }
        { page }
        { editor }
      </div>
      <div id="embed-page" style={{ display: 'none'}}>
        <Page
          pageData={props.pageData}
          pageStyle={props.pageStyle}
          editing={false}
          activeComponents={props.activeComponents}
          handlePageClick={handlePageClick.bind(this)}
          reorderComponent={props.reorderComponent}
          handleEditorChange={props.handleEditorChange}
          addPluginComponent={props.addPluginComponent}
          addComponent={props.addComponent}
        />
      </div>
    </div>
  )
}

// inject redux state into props for the PageBuilder component
function mapStateToProps(state) {
  return {
    activeComponents: state.activeComponents,
    pageData: state.pageData,
    pageStyle: state.pageStyle
  }
}

// inject action creators into props for the PageBuilder component
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

// connect PageBuilder component to redux
export default connect(mapStateToProps, mapDispatchToProps)(PageBuilder);
