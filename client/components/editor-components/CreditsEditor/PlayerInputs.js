import React from 'react';

export default function PlayerInputs(props) {
  const inputStyle = {
    display: 'block',
    marginTop: '.75em',
    width: '90%',
    height: '2em',
    padding: '0.25em 0.5em',
    backgroundColor: 'rgba(60,60,60,1)',
    border: '1px solid rgba(70,70,70,1)',
    color: 'rgba(255,255,255,.75)',
    fontWeight: 300,
    letterSpacing: '.075rem',
    fontSize: '.9em'
  }

  return (
    <label>
      Credit {props.creditIndex + 1}
      <input
        id="credits-role-input"
        style={inputStyle}
        value={props.data.role}
        type="text"
        data-creditInput="role"
        data-creditIndex={props.creditIndex}
        onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'credits', 'updateItem')}} />
      <input
        id="credits-name-input"
        style={inputStyle}
        value={props.data.name}
        type="text"
        data-creditInput="name"
        data-creditIndex={props.creditIndex}
        onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'credits', 'updateItem')}} />
    </label>
  )
}
