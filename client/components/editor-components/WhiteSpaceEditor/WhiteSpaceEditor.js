import React from 'react';

export default function WhiteSpaceEditor(props) {
  return (
    <fieldset>
      <h3>Edit White-Space</h3>
      <label>
        White-Space Height
        <input data-index={props.editingIndex}
          id="white-space-height-editor"
          value={props.componentData.height}
          min="1" max="15" step="1" type="range"
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'height')}} />
      </label>
      <button onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete White-Space
      </button>
    </fieldset>
  )
}
