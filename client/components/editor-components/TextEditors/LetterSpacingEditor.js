import React from 'react';

export default function LetterSpacingEditor(props) {
  return (
    <label>
      Letter Spacing
      <input id="letter-spacing-editor"
        data-index={props.editingIndex}
        min="0" max="1" step="0.01" type="range"
        value={props.letterSpacing}
        onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'letterSpacing')}} />
    </label>
  )
}
