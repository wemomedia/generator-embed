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
        <ImageUploader editingIndex={props.editingIndex} updateImageSource={props.updateImageSource} />
      </label>

      <label>
        Headline Text Color
        <ColorPicker
          targetProperty="textColor"
          editingIndex={props.editingIndex}
          color={componentData.textColor}
          handleEditorChange={props.handleEditorChange} />
      </label>

      <TextFieldEditor
        label="Header Title"
        editingIndex={props.editingIndex}
        text={props.componentData.text}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Header Subtitle"
        targetProperty="subheadText"
        editingIndex={props.editingIndex}
        text={props.componentData.subheadText}
        handleEditorChange={props.handleEditorChange}
      />

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

TransportHeaderEditor.propTypes = {
  componentData: React.PropTypes.shape({
    fontSize: React.PropTypes.string.isRequired,
    fontWeight: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    letterSpacing: React.PropTypes.string.isRequired,
    subheadText: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    textColor: React.PropTypes.string.isRequired,
    contentType: React.PropTypes.string.isRequired,
    buttonColor: React.PropTypes.string.isRequired,
    buttonTextColor: React.PropTypes.string.isRequired,
  }).isRequired,
  'data-index': React.PropTypes.number,
  editingIndex: React.PropTypes.number,
  handleEditorChange: React.PropTypes.func.isRequired,
  updateImageSource: React.PropTypes.func.isRequired,
  isEditing: React.PropTypes.bool,
}
