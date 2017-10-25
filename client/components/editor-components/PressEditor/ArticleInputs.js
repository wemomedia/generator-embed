import React from 'react';

export default function PlayerInputs(props) {
  const inputStyle = {
    // display: 'block',
    // marginTop: '.75em',
    // width: '90%',
    // height: '2em',
    // padding: '0.25em 0.5em',
    // backgroundColor: 'rgba(60,60,60,1)',
    // border: '1px solid rgba(70,70,70,1)',
    // color: 'rgba(255,255,255,.75)',
    // fontWeight: 300,
    // letterSpacing: '.075rem',
    // fontSize: '.9em'
  }

  return (
    <label>
      Article {props.articleIndex + 1}
      <input
        id="press-date-input"
        style={inputStyle}
        value={props.data.date}
        type="text"
        data-pressInput="date"
        data-pressIndex={props.articleIndex}
        onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'press', 'updateItem')}} />
      <input
        id="press-publication-input"
        style={inputStyle}
        value={props.data.publication}
        type="text"
        data-pressInput="publication"
        data-pressIndex={props.articleIndex}
        onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'press', 'updateItem')}} />
      <input
        id="press-url-input"
        style={inputStyle}
        value={props.data.url}
        type="text"
        data-pressInput="url"
        data-pressIndex={props.articleIndex}
        onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'press', 'updateItem')}} />
      <textarea
        id="press-snippet-input"
        style={{ minHeight: '5em' }}
        value={props.data.snippet}
        type="text"
        rows="4"
        data-pressInput="snippet"
        data-pressIndex={props.articleIndex}
        onChange={(e) => {props.handleEditorChange(e, props.editingIndex, 'press', 'updateItem')}} />
    </label>
  )
}
