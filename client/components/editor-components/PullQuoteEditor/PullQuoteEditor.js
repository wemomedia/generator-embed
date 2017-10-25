import React from 'react';

import ParagraphEditor from '../ParagraphEditor/ParagraphEditor';
import ColorPicker from '../ColorPicker/ColorPicker';

export default function PullQuoteEditor(props) {
  return (
    <fieldset>
      <h3>Edit Pull Quote</h3>
      <label>
        Quote Color
        <ColorPicker
          targetProperty="quoteTextColor"
          color={props.componentData.quoteTextColor}
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
        Quote Alignment
        <select data-index={props.editingIndex}
          id="paragraph-alignment-editor"
          value={props.componentData.alignment}
          onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'alignment')}}>
          <option value="left">Quote Left</option>
          <option value="right">Quote Right</option>
        </select>
      </label>
      <label>
        Quote width
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
        Delete Pull Quote
      </button>
    </fieldset>
  )
}

PullQuoteEditor.propTypes = {
  componentData: React.PropTypes.shape({
    fontSize: React.PropTypes.string.isRequired,
    fontWeight: React.PropTypes.string.isRequired,
    quoteText: React.PropTypes.string.isRequired,
    quoteTextColor: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    textColor: React.PropTypes.string.isRequired,
    alignment: React.PropTypes.string.isRequired,
    width: React.PropTypes.string.isRequired,
  }).isRequired,
  editingIndex: React.PropTypes.number,
  deleteComponent: React.PropTypes.func.isRequired,
  handleEditorChange: React.PropTypes.func.isRequired,
}
