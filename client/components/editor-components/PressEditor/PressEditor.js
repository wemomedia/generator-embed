import React from 'react';

import ColorPicker from '../ColorPicker/ColorPicker';
import ArticleInputs from './ArticleInputs';


export default function PressEditor(props) {
  const articleInputList = props.componentData.articles.map((data, i) => {
    return <ArticleInputs key={i} data={data} articleIndex={i} editingIndex={props.editingIndex} handleEditorChange={props.handleEditorChange}/>
  })

  return (
    <fieldset data-index={props.editingIndex}>
      <h3>Edit Press</h3>
      <label>
        Text Color
        <ColorPicker
          targetProperty="textColor"
          color={props.componentData.textColor}
          editingIndex={props.editingIndex}
          handleEditorChange={props.handleEditorChange} />
      </label>
      { articleInputList }
      <p onClick={(e) => {props.handleEditorChange(e, props.editingIndex, 'press', 'addItem')}}>
        Add an Article
      </p>
      <p onClick={(e) => {props.handleEditorChange(e, props.editingIndex, 'press', 'deleteItem')}}>
        Delete an Article
      </p>
      <button
        style={{ marginTop: '.5em' }}
        onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Press
      </button>
    </fieldset>
  )
}
