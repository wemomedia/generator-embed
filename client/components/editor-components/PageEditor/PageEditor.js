import React from 'react';

import styles from './page-editor.scss';
import ColorPicker from '../ColorPicker/ColorPicker';

export default function PageEditor(props) {
  const editingIndex = props.pageData.editingIndex;
  const EditorComponents = props.pageData.editorComponents;

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
      <div className={styles['page-editor-title-bar']} />
      <form>
        {formComponent}
      </form>
    </div>
  )
}
