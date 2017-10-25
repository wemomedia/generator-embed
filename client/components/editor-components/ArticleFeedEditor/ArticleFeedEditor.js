import React from 'react';
import ImageUploader from '../ImageUploader/ImageUploader';

import ColorPicker from '../ColorPicker/ColorPicker';
import TextAlignmentEditor from '../TextEditors/TextAlignmentEditor';
import FontWeightEditor from '../TextEditors/FontWeightEditor';
import FontSizeEditor from '../TextEditors/FontSizeEditor';
import TextFieldEditor from '../TextEditors/TextFieldEditor';
import LetterSpacingEditor from '../TextEditors/LetterSpacingEditor';

export default function ArticleFeedEditor(props) {
  return (
    <fieldset>
      <h3>Edit Image</h3>
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

      <label>
        Text Color
        <ColorPicker
          targetProperty="textColor"
          color={props.componentData.textColor}
          editingIndex={props.editingIndex}
          handleEditorChange={props.handleEditorChange} />
      </label>

      <label>
        Sub-Headline Color
        <ColorPicker
          targetProperty="subtextColor"
          color={props.componentData.subtextColor}
          editingIndex={props.editingIndex}
          handleEditorChange={props.handleEditorChange} />
      </label>

      <TextFieldEditor
        label="Feature Date"
        targetProperty="date"
        editingIndex={props.editingIndex}
        text={props.componentData.date}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Feature Headline"
        targetProperty="headline"
        editingIndex={props.editingIndex}
        text={props.componentData.headline}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Feature Sub-Headline"
        targetProperty="subHeadline"
        editingIndex={props.editingIndex}
        text={props.componentData.subHeadline}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Feature Url Slug"
        targetProperty="urlSlug"
        editingIndex={props.editingIndex}
        text={props.componentData.urlSlug}
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

      <label>
        Accent Color
        <ColorPicker
          targetProperty="accentColor"
          color={props.componentData.accentColor}
          editingIndex={props.editingIndex}
          handleEditorChange={props.handleEditorChange} />
      </label>

      <label>
        Link Hover Color
        <ColorPicker
          targetProperty="linkHoverColor"
          color={props.componentData.linkHoverColor}
          editingIndex={props.editingIndex}
          handleEditorChange={props.handleEditorChange} />
      </label>

      <TextFieldEditor
        label="Slot 1 Date"
        targetProperty="slot1Date"
        editingIndex={props.editingIndex}
        text={props.componentData.slot1Date}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Slot 1 Title"
        targetProperty="slot1Headline"
        editingIndex={props.editingIndex}
        text={props.componentData.slot1Headline}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Slot 1 Url Slug"
        targetProperty="slot1UrlSlug"
        editingIndex={props.editingIndex}
        text={props.componentData.slot1UrlSlug}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Slot 2 Date"
        targetProperty="slot2Date"
        editingIndex={props.editingIndex}
        text={props.componentData.slot2Date}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Slot 2 Title"
        targetProperty="slot2Headline"
        editingIndex={props.editingIndex}
        text={props.componentData.slot2Headline}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Slot 2 Url Slug"
        targetProperty="slot2UrlSlug"
        editingIndex={props.editingIndex}
        text={props.componentData.slot2UrlSlug}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Slot 3 Date"
        targetProperty="slot3Date"
        editingIndex={props.editingIndex}
        text={props.componentData.slot3Date}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Slot 3 Title"
        targetProperty="slot3Headline"
        editingIndex={props.editingIndex}
        text={props.componentData.slot3Headline}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Slot 3 Url Slug"
        targetProperty="slot3UrlSlug"
        editingIndex={props.editingIndex}
        text={props.componentData.slot3UrlSlug}
        handleEditorChange={props.handleEditorChange}
      />

      <button onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Image
      </button>
    </fieldset>
  )
}

ArticleFeedEditor.propTypes = {
  componentData: React.PropTypes.shape({
    urlSlug: React.PropTypes.string.isRequired,
    subHeadline: React.PropTypes.string.isRequired,
    headline: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    fontSize: React.PropTypes.string.isRequired,
    fontWeight: React.PropTypes.string.isRequired,
    textColor: React.PropTypes.string.isRequired,
    overlayColor: React.PropTypes.string.isRequired,
  }).isRequired,
  'data-index': React.PropTypes.number,
  editingIndex: React.PropTypes.number,
  handleEditorChange: React.PropTypes.func.isRequired,
  isEditing: React.PropTypes.bool,
  updateImageSource: React.PropTypes.func.isRequired,
}
