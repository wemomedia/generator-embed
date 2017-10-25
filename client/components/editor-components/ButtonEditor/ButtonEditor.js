import React from 'react';
import styles from './button-editor.scss';

import ColorPicker from '../ColorPicker/ColorPicker';

export default function ButtonEditor(props) {
  return (
    <fieldset data-index={props.editingIndex} className={styles['button-editor']}>
      <h3>Edit Button</h3>
      <label>
        Button Text
        <input
          data-index={props.editingIndex}
          id="button-text-editor"
          type="text"
          value={props.componentData.buttonText}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'buttonText')}} />
      </label>

      <label>
        Button Color
        <ColorPicker
          targetProperty="buttonColor"
          editingIndex={props.editingIndex}
          color={props.componentData.buttonColor}
          handleEditorChange={props.handleEditorChange} />
      </label>

      <label>
        Text Color
        <ColorPicker
          targetProperty="buttonTextColor"
          editingIndex={props.editingIndex}
          color={props.componentData.buttonTextColor}
          handleEditorChange={props.handleEditorChange} />
      </label>

      <label>
        Button Link
        <input
          data-index={props.editingIndex}
          id="button-link-editor"
          type="text"
          value={props.componentData.buttonLink}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'buttonLink')}} />
      </label>
      <button onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Button
      </button>
    </fieldset>
  )
}

ButtonEditor.propTypes = {
  componentData: React.PropTypes.shape({
    buttonLink: React.PropTypes.string.isRequired,
    buttonColor: React.PropTypes.string.isRequired,
    buttonText: React.PropTypes.string.isRequired,
  }).isRequired,
  'data-index': React.PropTypes.number,
  editingIndex: React.PropTypes.number,
  handleEditorChange: React.PropTypes.func.isRequired,
  isEditing: React.PropTypes.bool,
}
