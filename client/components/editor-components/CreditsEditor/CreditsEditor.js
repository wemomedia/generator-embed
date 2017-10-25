import React from 'react';

import styles from './credits-editor.scss';

import PlayerInputs from './PlayerInputs';
import ColorPicker from '../ColorPicker/ColorPicker';

export default function CreditsEditor(props) {
  const playerInputList = props.componentData.credits.map((data, i) => {
    return <PlayerInputs key={i} data={data} creditIndex={i} editingIndex={props.editingIndex} handleEditorChange={props.handleEditorChange}/>
  })

  return (
    <fieldset data-index={props.editingIndex} className={styles['credits-editor']}>
      <h3>Edit Credits</h3>
      <label>
        Paragraph Color
        <ColorPicker
          targetProperty="textColor"
          color={props.componentData.textColor}
          editingIndex={props.editingIndex}
          handleEditorChange={props.handleEditorChange} />
      </label>
      { playerInputList }
      <p onClick={(e) => {props.handleEditorChange(e, props.editingIndex, 'credits', 'addItem')}}>
        Add a Credit
      </p>
      <p onClick={(e) => {props.handleEditorChange(e, props.editingIndex, 'credits', 'deleteItem')}}>
        Delete a Credit
      </p>
      <button
        style={{ marginTop: '.5em' }}
        onClick={(e) => {props.deleteComponent(e, props.editingIndex)}}>
        Delete Credits
      </button>
    </fieldset>
  )
}
