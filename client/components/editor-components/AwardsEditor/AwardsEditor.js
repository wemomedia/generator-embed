import React from 'react';

import ImageUploader from '../ImageUploader/ImageUploader';
import ColorPicker from '../ColorPicker/ColorPicker';

export default function AwardsEditor(props) {
  const awardUploaders = props.componentData.items.map((data, i) => {
    return (
      <label key={i}>
        Award { i + 1 }
        <ImageUploader imageIndex={i} editingIndex={props.editingIndex} updateImageSource={props.updateImageSource} />
      </label>
    )
  })

  return (
    <fieldset data-index={props.editingIndex}>
      <h3>Edit Awards</h3>
      <label>
        Header Color
        <ColorPicker
          targetProperty="textColor"
          color={props.componentData.textColor}
          editingIndex={props.editingIndex}
          handleEditorChange={props.handleEditorChange} />
      </label>
      { awardUploaders }
      <p onClick={(e) => {props.handleEditorChange(e, props.editingIndex, 'awards', 'addItem')}}>
        Add an Award
      </p>
      <p onClick={(e) => {props.handleEditorChange(e, props.editingIndex, 'awards', 'deleteItem')}}>
        Delete an Award
      </p>
      <button
        style={{ marginTop: '.5em' }}
        onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Awards
      </button>
    </fieldset>
  )
}
