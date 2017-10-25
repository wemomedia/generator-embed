import React from 'react';

export default function VideoEditor(props) {
  const embedURL = props.componentData.embedURL;

  const fileInput = {
    color: 'white',
    border: '1px solid rgba(70,70,70,1)',
    padding: '.75em 1em',
    width: '13em',
    marginLeft: 0,
    fontWeight: 400,
    cursor: 'pointer'
  }

  return (
    <fieldset>
      <h3>Edit Video</h3>
      <label>
        Video Url (Youtube or Vimeo)
        <input data-index={props.editingIndex}
          id="video-url-editor"
          type="text"
          value={embedURL}
          onChange={(e) => {props.sourceChange(e)}} />
      </label>
      <label>
        Column
        <select data-index={props.editingIndex}
          id="video-column-editor"
          value={props.componentData.column}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'column')}}>
          <option value="33.333%">One-Third</option>
          <option value="50%">Half</option>
          <option value="66.667%">Two-thirds</option>
          <option value="100%">Full Width</option>
        </select>
      </label>
      <button onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Video
      </button>
    </fieldset>
  )
}

VideoEditor.propTypes = {
  componentData: React.PropTypes.shape({
    embedURL: React.PropTypes.string.isRequired,
  }).isRequired,
  'data-index': React.PropTypes.number,
  editingIndex: React.PropTypes.number,
  handleEditorChange: React.PropTypes.func.isRequired,
  isEditing: React.PropTypes.bool,
}
