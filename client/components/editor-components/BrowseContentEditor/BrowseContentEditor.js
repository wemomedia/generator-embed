import React from 'react';

import ImageUploader from '../ImageUploader/ImageUploader';
import ColorPicker from '../ColorPicker/ColorPicker';

export default function BrowseContentEditor(props) {
  const awardUploaders = props.componentData.items.map((data, i) => {
    return (
      <div key={i}>
        <label>
          Slot { i + 1 }
          <ImageUploader imageIndex={i} editingIndex={props.editingIndex} updateImageSource={props.updateImageSource} />
        </label>
        <label>
          Url slug
          <input
            id="content-url"
            value={data.urlSlug}
            type="text"
            data-contentInput="urlSlug"
            data-contentIndex={i}
            onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'content', 'updateUrl')}} />
        </label>
        <br/><br/>
      </div>
    )
  })

  return (
    <fieldset data-index={props.editingIndex}>
      <h3>Edit Content</h3>
      { awardUploaders }
      <button
        style={{ marginTop: '.5em' }}
        onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Browse Section
      </button>
    </fieldset>
  )
}


BrowseContentEditor.propTypes = {
  componentData: React.PropTypes.shape({
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        image: React.PropTypes.string.isRequired,
        urlSlug: React.PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  'data-index': React.PropTypes.number,
  editingIndex: React.PropTypes.number,
  handleEditorChange: React.PropTypes.func.isRequired,
  isEditing: React.PropTypes.bool,
}
