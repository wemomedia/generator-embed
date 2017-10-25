import React from 'react';

import ColorPicker from '../ColorPicker/ColorPicker';
import ImageUploader from '../ImageUploader/ImageUploader';
import FontWeightEditor from '../TextEditors/FontWeightEditor';
import FontSizeEditor from '../TextEditors/FontSizeEditor';
import TextFieldEditor from '../TextEditors/TextFieldEditor';
import LetterSpacingEditor from '../TextEditors/LetterSpacingEditor';

export default function TransportHeaderEditor(props) {
  const componentData = props.componentData;

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
      <h3>Edit Header</h3>

      <label>

        <input type="radio" name="contentType" value="premium" checked={componentData.contentType === 'premium'} onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'contentType')}}/>Premium<br/>
        <input type="radio" name="contentType" value="free" checked={componentData.contentType === 'free'} onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'contentType')}}/>Free
      </label>

      <label>
        <ImageUploader editingIndex={props.editingIndex} updateImageSource={props.updateImageSource} />
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
          color={componentData.textColor}
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

    </fieldset>
  )
}
