import React from 'react';

import ArrowUp from 'react-icons/lib/md/arrow-drop-up';
import ArrowDown from 'react-icons/lib/md/arrow-drop-down';

import styles from './position-editor.scss';

export default function PositionEditor(props) {
  return (
    <div className={styles['position-editor']} style={props.style}>
      <button onClick={(e) => {props.reorderComponent(e, props.editingIndex, 'up')}}>
        <ArrowUp />
      </button>
      <button onClick={(e) => {props.reorderComponent(e, props.editingIndex, 'down')}}>
        <ArrowDown />
      </button>
    </div>
  )
}
