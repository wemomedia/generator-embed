import React from 'react';
import styles from './button-editor.scss';
import PropTypes from 'prop-types';

import ColorPicker from '../ColorPicker/ColorPicker';
import TextAlignmentEditor from '../TextEditors/TextAlignmentEditor';

export default function SocialShareEditor(props) {
  return (
    <fieldset data-index={props.editingIndex} className={styles['button-editor']}>
      <h3>Edit Social Share</h3>

      <label>
        Button Color
        <ColorPicker
          targetProperty="backgroundColor"
          editingIndex={props.editingIndex}
          color={props.componentData.backgroundColor}
          handleEditorChange={props.handleEditorChange} />
      </label>

      <label>
        Logo Color
        <ColorPicker
          targetProperty="logoFillColor"
          editingIndex={props.editingIndex}
          color={props.componentData.logoFillColor}
          handleEditorChange={props.handleEditorChange} />
      </label>

      <label>
        Share Link
        <input
          data-index={props.editingIndex}
          type="text"
          value={props.componentData.url}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'url')}} />
      </label>

      <label>
        Share Title
        <input
          data-index={props.editingIndex}
          type="text"
          value={props.componentData.title}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'title')}} />
      </label>

      <TextAlignmentEditor
        editingIndex={props.editingIndex}
        alignment={props.componentData.alignment}
        handleEditorChange={props.handleEditorChange}
      />

      <button onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Social
      </button>
    </fieldset>
  )
}

SocialShareEditor.propTypes = {
  componentData: PropTypes.shape({
    url: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    logoFillColor: PropTypes.string.isRequired,
    alignment: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  'data-index': PropTypes.number,
  editingIndex: PropTypes.number,
  handleEditorChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
}
