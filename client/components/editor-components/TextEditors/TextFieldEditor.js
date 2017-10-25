import React from 'react';

export default function TextFieldEditor(props) {
  const textType = () => {
    if (props.targetProperty) return props.targetProperty
    return 'text'
  }

  return (
    <label>
      { props.label }
      <input data-index={props.editingIndex}
        id="text-field-editor"
        value={props.text}
        onChange={(e) => {props.handleEditorChange(e, props.editingIndex, textType())}} />
    </label>
  )
}
