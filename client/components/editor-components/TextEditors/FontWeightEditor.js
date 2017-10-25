import React from 'react';

export default function FontWeightEditor(props) {
  return (
    <label>
      Font Weight
      <select data-index={props.editingIndex}
        id="paragraph-alignment-editor"
        value={props.fontWeight}
        onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'fontWeight')}}>
        <option value="300">Light</option>
        <option value="400">Medium</option>
        <option value="500">Bold</option>
      </select>
    </label>
  )
}
