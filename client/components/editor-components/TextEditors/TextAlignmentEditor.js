import React from 'react';

export default function TextAlignmentEditor(props) {
  return (
    <label>
      Text Alignment
      <select data-index={props.editingIndex}
        id="alignment-editor"
        value={props.alignment}
        onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'alignment')}}>
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </label>
  )
}
