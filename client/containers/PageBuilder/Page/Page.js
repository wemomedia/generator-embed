import React from 'react';
// import * as babel from 'babel-core';


// import static styles
import styles from './page.scss';
// import components
import * as Components from '../../../components/presentation-components';

// export default function Page(props) {
//
//
//   window.addEventListener('generator-register-plugin', e => {
//     console.log('plugin data', e.detail)
//   })
//
//   // grab the header component from the component array
//   // build an element
//   const header = (() => {
//     const headerData = props.activeComponents[0];
//     const HeaderComponent = Components[headerData.title];
//     return <HeaderComponent
//               data-index={0}
//               data={headerData.data}
//               isEditing={props.editing}
//               editingIndex={props.pageData.editingIndex}
//               handleClick={props.handlePageClick}
//               viewMode={props.pageData.viewMode}
//             />
//   })();
//
//   // map over activeComponents array following the header component
//   // for each item build an element
//   const activeComponents = props.activeComponents.map((component, i) => {
//     if (i > 0) {
//       if (!component) return console.log('failing', i, props.activeComponents);
//       const Component = Components[component.title];
//       return <Component key={i}
//                 data-index={i}
//                 data={component.data}
//                 isEditing={props.editing}
//                 editingIndex={props.pageData.editingIndex}
//                 handleClick={props.handlePageClick}
//                 reorderComponent={props.reorderComponent}
//                 viewMode={props.pageData.viewMode}
//                 handleEditorChange={props.handleEditorChange}
//               />
//     }
//   })
//
//   // if not in editing mode
//   // set page to full width
//   const pageStyle = {};
//   if (props.editing) {
//     pageStyle.width = 'calc(100vw - 18.625em)';
//   }
//   pageStyle.background = props.pageStyle.background;
//
//
//   // check if background is main element is header or video
//   // set new container style if video
//   const containerStyle = {};
//   containerStyle.background = props.pageStyle.containerBackground;
//   if (props.activeComponents[0].title === 'FullscreenVideo') {
//     containerStyle.marginTop = '10em';
//   }
//
//   if (props.activeComponents[0].title === 'VideoHeader') {
//     pageStyle.marginTop = '100vh';
//     pageStyle.paddingBottom = 0;
//     pageStyle.minHeight = '100vh';
//   }
//
//   // set styles for homepage template
//   if (props.activeComponents[0].title === 'TransportHomeHeader') {
//     pageStyle.paddingBottom = '0';
//     containerStyle.paddingBottom = '0';
//     containerStyle.paddingTop = '0';
//   }
//
//   const viewWrapper = (() => {
//     const wrapper = {};
//
//     if (props.pageData.viewMode === 'mobile') {
//       wrapper.transform = 'translate3d(0,0,0)';
//       wrapper.width = '375px'
//       wrapper.height = '667px'
//       wrapper.minHeight = '0'
//       wrapper.top = '10vh'
//       wrapper.right = '10vh'
//       wrapper.margin = '0 auto'
//       wrapper.position = 'relative'
//       wrapper.overflowY = 'scroll'
//       wrapper.overflowX = 'hidden'
//       wrapper.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
//       pageStyle.width = '375px';
//       pageStyle.minHeight = '0';
//     }
//     return wrapper;
//   })();
//
//   console.log('components', Components, activeComponents)
//
//   return (
//     <div style={viewWrapper}>
//       <div className={styles.page} style={pageStyle}>
//         { header }
//         <div className={styles['main-container']} style={containerStyle}>
//           { activeComponents }
//         </div>
//         {
//           props.editing &&
//           <button
//             className={styles['background-edit-button']}
//             onClick={(e) => {props.handlePageClick(e, 'page')}}>
//             Edit Background
//           </button>
//         }
//       </div>
//     </div>
//   )
// }


export default class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ComponentMap: Components, activeComponentData: this.props.activeComponents}
  }

  componentDidMount() {
    const that = this;
    // listen for register event from parent
    window.addEventListener('generator-register-plugin', e => {
      var fileUrl = e.detail.url
      //get component data from file
      var client = new XMLHttpRequest();
      client.open('GET', fileUrl);
      client.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          const componentString = client.responseText;
          insertComponent(componentString)
        }
      }
      client.send();

      function insertComponent(string) {
        // translate component from string to function
        const translated = Babel.transform(string, { presets: ['es2017', 'react'] }).code;
        const Component = eval('(' + translated + ')')

        // add component data to component index
        const newComponent = {}
        newComponent[e.detail.title] = Component
        const componentMap = Object.assign({}, that.state.ComponentMap, newComponent)
        // add component to active component list
        const activeData = { title: e.detail.title, data: e.detail.data }
        const activeList = that.state.activeComponentData.slice()
        activeList.push(activeData)
        return that.setState({ ComponentMap: componentMap, activeComponentData: activeList})
      }
    })
  }

  render() {
    const props = this.props
    const { ComponentMap, activeComponentData } = this.state

    // grab the header component from the component array
    // build an element
    const header = (() => {
      const headerData = activeComponentData[0];
      const HeaderComponent = ComponentMap[headerData.title];
      return <HeaderComponent
                data-index={0}
                data={headerData.data}
                isEditing={props.editing}
                editingIndex={props.pageData.editingIndex}
                handleClick={props.handlePageClick}
                viewMode={props.pageData.viewMode}
              />
    })();

    // map over activeComponents array following the header component
    // for each item build an element
    const activeComponents = activeComponentData.map((component, i) => {
      if (i > 0) {
        if (!component) return console.log('failing', i, activeComponentData);
        const Component = ComponentMap[component.title];
        return <Component key={i}
                  data-index={i}
                  data={component.data}
                  isEditing={props.editing}
                  editingIndex={props.pageData.editingIndex}
                  handleClick={props.handlePageClick}
                  reorderComponent={props.reorderComponent}
                  viewMode={props.pageData.viewMode}
                  handleEditorChange={props.handleEditorChange}
                />
      }
    })

    // if not in editing mode
    // set page to full width
    const pageStyle = {};
    if (props.editing) {
      pageStyle.width = 'calc(100vw - 18.625em)';
    }
    pageStyle.background = props.pageStyle.background;


    // check if background is main element is header or video
    // set new container style if video
    const containerStyle = {};
    containerStyle.background = props.pageStyle.containerBackground;
    if (activeComponentData[0].title === 'FullscreenVideo') {
      containerStyle.marginTop = '10em';
    }

    if (activeComponentData[0].title === 'VideoHeader') {
      pageStyle.marginTop = '100vh';
      pageStyle.paddingBottom = 0;
      pageStyle.minHeight = '100vh';
    }

    // set styles for homepage template
    if (activeComponentData[0].title === 'TransportHomeHeader') {
      pageStyle.paddingBottom = '0';
      containerStyle.paddingBottom = '0';
      containerStyle.paddingTop = '0';
    }

    const viewWrapper = (() => {
      const wrapper = {};

      if (props.pageData.viewMode === 'mobile') {
        wrapper.transform = 'translate3d(0,0,0)';
        wrapper.width = '375px'
        wrapper.height = '667px'
        wrapper.minHeight = '0'
        wrapper.top = '10vh'
        wrapper.right = '10vh'
        wrapper.margin = '0 auto'
        wrapper.position = 'relative'
        wrapper.overflowY = 'scroll'
        wrapper.overflowX = 'hidden'
        wrapper.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
        pageStyle.width = '375px';
        pageStyle.minHeight = '0';
      }
      return wrapper;
    })();

    return (
      <div style={viewWrapper}>
        <div className={styles.page} style={pageStyle}>
          { header }
          <div className={styles['main-container']} style={containerStyle}>
            { activeComponents }
          </div>
          {
            props.editing &&
            <button
              className={styles['background-edit-button']}
              onClick={(e) => {props.handlePageClick(e, 'page')}}>
              Edit Background
            </button>
          }
        </div>
      </div>
    )
  }
}
