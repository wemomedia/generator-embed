import React from 'react';

import ColorPicker from '../ColorPicker/ColorPicker';

export default function ParagraphEditor(props) {
  return (
    <fieldset>
      <h3>Edit Paragraph</h3>
      <label>
        Paragraph Color
        <ColorPicker
          targetProperty="textColor"
          color={props.componentData.textColor}
          editingIndex={props.editingIndex}
          handleEditorChange={props.handleEditorChange} />
      </label>
      <label>
        Paragraph Alignment
        <select data-index={props.editingIndex}
          id="paragraph-alignment-editor"
          value={props.componentData.alignment}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'alignment')}}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </label>
      <label>
        Link Color
        <ColorPicker
          targetProperty="linkColor"
          color={props.componentData.linkColor}
          editingIndex={props.editingIndex}
          handleEditorChange={props.handleEditorChange} />
      </label>
      <label>
        Link Hover Color
        <ColorPicker
          targetProperty="linkHoverColor"
          color={props.componentData.linkHoverColor}
          editingIndex={props.editingIndex}
          handleEditorChange={props.handleEditorChange} />
      </label>
      <label>
        Column
        <select data-index={props.editingIndex}
          id="paragraph-column-editor"
          value={props.componentData.column}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'column')}}>
          <option value="33.333%">One-Third</option>
          <option value="50%">Half</option>
          <option value="66.667%">Two-thirds</option>
          <option value="100%">Full Width</option>
        </select>
      </label>
      <button onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Paragraph
      </button>
    </fieldset>
  )
}

ParagraphEditor.propTypes = {
  componentData: React.PropTypes.shape({
    alignment: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    textColor: React.PropTypes.string.isRequired,
  }).isRequired,
  'data-index': React.PropTypes.number,
  editingIndex: React.PropTypes.number,
  handleEditorChange: React.PropTypes.func.isRequired,
  isEditing: React.PropTypes.bool,
}
