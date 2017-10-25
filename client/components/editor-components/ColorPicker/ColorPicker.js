import React from 'react';
import { ChromePicker } from 'react-color';

import styles from './color-picker.scss';

export default function ColorPicker(props) {
  return (
    <div className={styles['color-picker']}>
      <ChromePicker
        data-index={props.editingIndex}
        id="color-picker"
        color={props.color}
        onChangeComplete={(e) => {
          props.handleEditorChange(e, props.editingIndex, props.targetProperty)
        }} />
    </div>
  )
}
