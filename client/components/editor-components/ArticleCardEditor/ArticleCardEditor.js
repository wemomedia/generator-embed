import React from 'react';

import ImageUploader from '../ImageUploader/ImageUploader';
import TextFieldEditor from '../TextEditors/TextFieldEditor';
import ColorPicker from '../ColorPicker/ColorPicker';

export default function ArticleCardEditor(props) {
  return (
    <fieldset>
      <h3>Edit Article Card</h3>
      <label>
        <ImageUploader
          editingIndex={props.editingIndex}
          handleEditorChange={props.handleEditorChange}
          componentData={props.componentData}
          updateImageSource={props.updateImageSource} />
      </label>

      <TextFieldEditor
        label="Article Date"
        targetProperty="date"
        editingIndex={props.editingIndex}
        text={props.componentData.date}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Article Headline"
        targetProperty="headline"
        editingIndex={props.editingIndex}
        text={props.componentData.headline}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Link Text"
        targetProperty="link"
        editingIndex={props.editingIndex}
        text={props.componentData.link}
        handleEditorChange={props.handleEditorChange}
      />

      <TextFieldEditor
        label="Article link"
        targetProperty="url"
        editingIndex={props.editingIndex}
        text={props.componentData.url}
        handleEditorChange={props.handleEditorChange}
      />

      <button onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Image
      </button>
    </fieldset>
  )
}

ArticleCardEditor.propTypes = {
  componentData: React.PropTypes.shape({
    // image: React.PropTypes.string.isRequired,
    // width: React.PropTypes.string.isRequired,
    // alignment: React.PropTypes.string.isRequired,
    // text: React.PropTypes.string.isRequired,
    // textColor: React.PropTypes.string.isRequired,
    // lineHeight: React.PropTypes.string.isRequired,
    // fontSize: React.PropTypes.string.isRequired,
    // fontWeight: React.PropTypes.string.isRequired
  }).isRequired,
  'data-index': React.PropTypes.number,
  editingIndex: React.PropTypes.number,
  handleEditorChange: React.PropTypes.func.isRequired,
  isEditing: React.PropTypes.bool,
}
