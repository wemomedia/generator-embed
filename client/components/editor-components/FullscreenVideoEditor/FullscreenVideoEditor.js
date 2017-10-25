import React from 'react';

export default function FullscreenVideoEditor(props) {
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
      <h3>Edit Fullscreen Video</h3>
      <label>
        Video Url (Youtube or Vimeo)
        <input data-index={props.editingIndex}
          id="fullscreen-video-source-editor"
          type="text"
          value={props.componentData.embedUrl}
          onChange={props.sourceChange} />
      </label>
    </fieldset>
  )
}
