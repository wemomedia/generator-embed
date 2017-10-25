import React from 'react';

import ColorPicker from '../ColorPicker/ColorPicker';
import TextAlignmentEditor from '../TextEditors/TextAlignmentEditor';
import FontWeightEditor from '../TextEditors/FontWeightEditor';
import FontSizeEditor from '../TextEditors/FontSizeEditor';
import TextFieldEditor from '../TextEditors/TextFieldEditor';
import LetterSpacingEditor from '../TextEditors/LetterSpacingEditor';

export default function HeadlineEditor(props) {
  return (
    <fieldset>
      <h3>Edit Headline</h3>

      <TextFieldEditor
        editingIndex={props.editingIndex}
        text={props.componentData.text}
        handleEditorChange={props.handleEditorChange}
      />

      <label>
        Headline Color
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

      <TextAlignmentEditor
        editingIndex={props.editingIndex}
        alignment={props.componentData.alignment}
        handleEditorChange={props.handleEditorChange}
      />

      <LetterSpacingEditor
        editingIndex={props.editingIndex}
        letterSpacing={props.componentData.letterSpacing}
        handleEditorChange={props.handleEditorChange}
      />

      <label>
        Column
        <select data-index={props.editingIndex}
          id="headline-column-editor"
          value={props.componentData.column}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'column')}}>
          <option value="33.333%">One-Third</option>
          <option value="50%">Half</option>
          <option value="66.667%">Two-thirds</option>
          <option value="100%">Full Width</option>
        </select>
      </label>

      <button onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Headline
      </button>
    </fieldset>
  )
}

HeadlineEditor.propTypes = {
  componentData: React.PropTypes.shape({
    fontSize: React.PropTypes.string.isRequired,
    fontWeight: React.PropTypes.string.isRequired,
    letterSpacing: React.PropTypes.string.isRequired,
    alignment: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    textColor: React.PropTypes.string.isRequired,
  }).isRequired,
  'data-index': React.PropTypes.number,
  editingIndex: React.PropTypes.number,
  handleEditorChange: React.PropTypes.func.isRequired,
  isEditing: React.PropTypes.bool,
}
