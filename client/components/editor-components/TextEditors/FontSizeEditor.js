import React from 'react';

export default function TextAlignmentEditor(props) {
  const property = props.targetProperty ? props.targetProperty : 'fontSize'
  return (
    <label>
      Font Size
      <input id="font-size-editor"
        data-index={props.editingIndex}
        min="1" max="10" step="0.1" type="range"
        value={props.fontSize}
        onChange={(e) => {props.handleEditorChange(e, props.editingIndex, property)}} />
    </label>
  )
}
