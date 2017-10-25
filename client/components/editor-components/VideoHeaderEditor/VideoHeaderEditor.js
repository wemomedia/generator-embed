import React from 'react';

import ColorPicker from '../ColorPicker/ColorPicker';
import FontWeightEditor from '../TextEditors/FontWeightEditor';
import FontSizeEditor from '../TextEditors/FontSizeEditor';
import TextFieldEditor from '../TextEditors/TextFieldEditor';
import LetterSpacingEditor from '../TextEditors/LetterSpacingEditor';

export default function VideoHeaderEditor(props) {
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
      <label style={{ fontSize: '1rem', color: 'rgba(255,255,255,.7)' }}>
        <input data-index={props.editingIndex}
          style={{ width: '1em', display: 'inline-block', height: '1em', marginRight: '.5rem' }}
          id="fullscreen-video-source-editor"
          type="checkbox"
          checked={props.componentData.muted}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'muted')}} />
          Mute Video
      </label>
      <label style={{ fontSize: '1rem', color: 'rgba(255,255,255,.7)' }}>
        <input data-index={props.editingIndex}
          style={{ width: '1em', display: 'inline-block', height: '1em', marginRight: '.5rem' }}
          id="video-header-loop-editor"
          type="checkbox"
          checked={props.componentData.looping}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'looping')}} />
          Loop Video
      </label>

      <label>
        Overlay Color
        <ColorPicker
          targetProperty="overlayColor"
          editingIndex={props.editingIndex}
          color={props.componentData.overlayColor}
          handleEditorChange={props.handleEditorChange} />
      </label>

      <TextFieldEditor
        editingIndex={props.editingIndex}
        text={props.componentData.text}
        handleEditorChange={props.handleEditorChange}
      />

      <label>
        Headline Text Color
        <ColorPicker
          targetProperty="textColor"
          editingIndex={props.editingIndex}
          color={props.componentData.textColor}
          handleEditorChange={props.handleEditorChange} />
      </label>

      <FontSizeEditor
        editingIndex={props.editingIndex}
        fontSize={props.componentData.fontSize}
        handleEditorChange={props.handleEditorChange}
      />

      <FontWeightEditor
        editingIndex={props.editingIndex}
        fontWeight={props.componentData.fontWeight}
        handleEditorChange={props.handleEditorChange}
      />

      <LetterSpacingEditor
        editingIndex={props.editingIndex}
        letterSpacing={props.componentData.letterSpacing}
        handleEditorChange={props.handleEditorChange}
      />

      <label>
        Button Color
        <ColorPicker
          targetProperty="buttonColor"
          editingIndex={props.editingIndex}
          color={props.componentData.buttonColor}
          handleEditorChange={props.handleEditorChange} />
      </label>

    </fieldset>
  )
}
