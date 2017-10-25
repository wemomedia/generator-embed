import React from 'react';

import styles from './credits.scss';

import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';

export default function Credits(props) {
  let creditList = props.data.credits.map((credit, i) => {
    return <li key={i}>
            <span>{credit.role}</span>
            <span>{credit.name}</span>
          </li>
  })

  let creditStyle = {};
  let positionEditor;

  if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
    creditStyle.border = '2px rgba(0,229,255,.6) solid';
    creditStyle.backgroundColor = 'rgba(0,229,255,.1)';
    creditStyle.position = 'relative';
    positionEditor = <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex}/>
  } else {
    creditStyle.border = 'none';
    delete creditStyle.backgroundColor;
  }

  function rgb2hex(rgb){
   rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
   return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
  }

  return (
    <div
      className={styles.credits}
      data-index={props['data-index']}
      onClick={(e) => {props.handleClick(e)}}
      style={creditStyle}>
      <h2
        style={{
          color: rgb2hex(props.data.textColor),
          lineHeight: '1em'
        }}>
        Credits
      </h2>
      <ul style={{ color: props.data.textColor }}>
        { creditList }
      </ul>
      { positionEditor }
    </div>
  )
}
