import React from 'react';

export default function AudioEditor(props) {
  return (
    <fieldset>
      <h3>Edit Audio</h3>
      <label>
        Audio Url (soundcloud)
        <input data-index={props.editingIndex}
          id="audio-editor"
          value={props.componentData.src}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'src')}} />
      </label>
      <button onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Audio
      </button>
    </fieldset>
  )
}
