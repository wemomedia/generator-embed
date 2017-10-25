import React from 'react';
import PropTypes from 'prop-types';

import ImageUploader from '../ImageUploader/ImageUploader';
import ParagraphEditor from '../ParagraphEditor/ParagraphEditor';
import ColorPicker from '../ColorPicker/ColorPicker';

export default function InlineImageEditor(props) {
  return (
    <fieldset>
      <h3>Edit Image</h3>
      <label>
        <ImageUploader
          editingIndex={props.editingIndex}
          handleEditorChange={props.handleEditorChange}
          componentData={props.componentData}
          updateImageSource={props.updateImageSource} />
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
        Text Alignment
        <select data-index={props.editingIndex}
          id="paragraph-alignment-editor"
          value={props.componentData.alignment}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'alignment')}}>
          <option value="left">Image Left</option>
          <option value="right">Image Right</option>
        </select>
      </label>
      <label>
        Image Width
        <select
          id="inline-image-width-editor"
          data-index={props.editingIndex}
          value={props.componentData.width}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'width')}} >
          <option value="33">One-Third</option>
          <option value="66">Two-Thirds</option>
        </select>
      </label>
      <button onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Image
      </button>
    </fieldset>
  )
}


// position editors
// <label>
//   Image Position (Horizontal)
//   <select data-index={props.editingIndex}
//     id="image-position-editor"
//     value={props.componentData.imagePositionX}
//     onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'imagePositionX')}}>
//     <option value="left">Align Left</option>
//     <option value="center">Align Center</option>
//     <option value="right">Align Right</option>
//   </select>
// </label>
// <label>
//   Image Position (Vertical)
//   <select data-index={props.editingIndex}
//     id="image-position-editor"
//     value={props.componentData.imagePositionY}
//     onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'imagePositionY')}}>
//     <option value="top">Align Top</option>
//     <option value="center">Align Center</option>
//     <option value="bottom">Align Bottom</option>
//   </select>
// </label>

InlineImageEditor.propTypes = {
  componentData: PropTypes.shape({
    image: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    alignment: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    lineHeight: PropTypes.string.isRequired,
    fontSize: PropTypes.string.isRequired,
    fontWeight: PropTypes.string.isRequired
  }).isRequired,
  'data-index': PropTypes.number,
  editingIndex: PropTypes.number,
  handleEditorChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
}
