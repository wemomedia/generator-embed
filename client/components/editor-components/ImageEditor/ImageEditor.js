import React from 'react';
import ImageUploader from '../ImageUploader/ImageUploader';

export default function ImageEditor(props) {
  return (
    <fieldset>
      <h3>Edit Image</h3>
      <label>
        <ImageUploader editingIndex={props.editingIndex} updateImageSource={props.updateImageSource} />
      </label>
      <label>
        Image Width
        <select
          id="image-size-editor"
          data-index={props.editingIndex}
          value={props.componentData.width}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'width')}} >
          <option value="inset">Container</option>
          <option value="window">Large</option>
          Column
          <option value="33.333%">One-Third</option>
          <option value="50%">Half</option>
          <option value="66.667%">Two-thirds</option>
          Column
        </select>
      </label>
      <label>
        Image Height
        <input data-index={props.editingIndex}
          id="article-height-editor"
          value={props.componentData.height}
          min="5" max="250" step="1" type="range"
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'height')}} />
      </label>
      <label style={{ fontSize: '1rem', color: 'rgba(255,255,255,.7)' }}>
        <input data-index={props.editingIndex}
          style={{ width: '1em', display: 'inline-block', height: '1em', marginRight: '.5rem' }}
          type="checkbox"
          checked={props.componentData.stretchToFill}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'stretchToFill')}} />
          Stretch to fill column
      </label>
      <button onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Image
      </button>
    </fieldset>
  )
}
