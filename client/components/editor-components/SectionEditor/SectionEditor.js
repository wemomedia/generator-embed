import React from 'react';
import ImageUploader from '../ImageUploader/ImageUploader';

import ColorPicker from '../ColorPicker/ColorPicker';
import TextAlignmentEditor from '../TextEditors/TextAlignmentEditor';
import FontWeightEditor from '../TextEditors/FontWeightEditor';
import FontSizeEditor from '../TextEditors/FontSizeEditor';
import TextFieldEditor from '../TextEditors/TextFieldEditor';
import LetterSpacingEditor from '../TextEditors/LetterSpacingEditor';

export default function SectionEditor(props) {
  return (
    <fieldset>
      <h3>Edit Section</h3>

      <label>
        <ImageUploader editingIndex={props.editingIndex} updateImageSource={props.updateImageSource} />
      </label>

      <label>
        Background Color
        <ColorPicker
          targetProperty="backgroundColor"
          color={props.componentData.backgroundColor}
          editingIndex={props.editingIndex}
          handleEditorChange={props.handleEditorChange} />
      </label>

      <TextFieldEditor
        label={'Section headline'}
        targetProperty={'headline'}
        editingIndex={props.editingIndex}
        text={props.componentData.headline}
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
        Delete Section
      </button>
    </fieldset>
  )
}

SectionEditor.propTypes = {
  componentData: React.PropTypes.shape({
    backgroundColor: React.PropTypes.string.isRequired,
    fontSize: React.PropTypes.string.isRequired,
    fontWeight: React.PropTypes.string.isRequired,
    headline: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    textColor: React.PropTypes.string.isRequired,
    letterSpacing: React.PropTypes.string.isRequired,
  }).isRequired,
  'data-index': React.PropTypes.number,
  editingIndex: React.PropTypes.number,
  handleEditorChange: React.PropTypes.func.isRequired,
  isEditing: React.PropTypes.bool,
}
