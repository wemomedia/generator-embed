import React from 'react';
import ImageUploader from '../ImageUploader/ImageUploader';

import ColorPicker from '../ColorPicker/ColorPicker';
import TextAlignmentEditor from '../TextEditors/TextAlignmentEditor';
import FontWeightEditor from '../TextEditors/FontWeightEditor';
import FontSizeEditor from '../TextEditors/FontSizeEditor';
import TextFieldEditor from '../TextEditors/TextFieldEditor';
import LetterSpacingEditor from '../TextEditors/LetterSpacingEditor';

export default function OverlayImageEditor(props) {
  return (
    <fieldset>
      <h3>Edit Image</h3>
      <label>
        <ImageUploader editingIndex={props.editingIndex} updateImageSource={props.updateImageSource} />
      </label>
      <label>
        Image Size
        <select
          id="image-size-editor"
          data-index={props.editingIndex}
          value={props.componentData.width}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'width')}} >
          <option value="inset">Small</option>
          <option value="container">Medium</option>
          <option value="window">Large</option>
        </select>
      </label>
      <label>
        Image Overlay Color
        <ColorPicker
          targetProperty="overlayColor"
          color={props.componentData.overlayColor}
          editingIndex={props.editingIndex}
          handleEditorChange={props.handleEditorChange} />
      </label>

      <TextFieldEditor
        editingIndex={props.editingIndex}
        text={props.componentData.text}
        handleEditorChange={props.handleEditorChange}
      />

      <label>
        Text Color
        <ColorPicker
          targetProperty="textColor"
          color={props.componentData.textColor}
          editingIndex={props.editingIndex}
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

      <button onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Image
      </button>
    </fieldset>
  )
}
