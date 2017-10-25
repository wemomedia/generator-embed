import React from 'react';

import styles from './page-editor.scss';

// import components
import * as EditorComponents from '../index';
import ColorPicker from '../ColorPicker/ColorPicker';

export default function PageEditor(props) {
  const editingIndex = props.pageData.editingIndex;

  const formComponent = (() => {
    if (editingIndex === null) {
      // default render background editor
      return (
        <fieldset>
          <h3>Edit Background</h3>
          <label>
            Background Color
            <ColorPicker
              color={props.pageStyle.background}
              handleEditorChange={(e) => {props.handleBackgroundChange(e, 'background')}} />
          </label>
          <label>
            Container Background Color
            <ColorPicker
              color={props.pageStyle.containerBackground}
              handleEditorChange={(e) => {props.handleBackgroundChange(e, 'container')}} />
          </label>
        </fieldset>
      )
    } else {
      let component = props.activeComponents[editingIndex];
      let ComponentElem = EditorComponents[component.title + 'Editor'];

      return (
        <ComponentElem
          updateImageSource={props.updateImageSource}
          sourceChange={props.sourceChange}
          handleEditorChange={props.handleEditorChange}
          componentData={component.data}
          editingIndex={editingIndex}
          deleteComponent={props.deleteComponent} />
      );
    }
  })();

  return (
    <div className={styles['page-editor']}>
      <img src="https://s3.amazonaws.com/igen.wevr.com/5a257672-7c35-4357-b9de-aae49ceef06a_tranport-white.png"/>
      <form>
        {formComponent}
      </form>
    </div>
  )
}
