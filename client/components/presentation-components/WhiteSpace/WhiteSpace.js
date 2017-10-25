import React from 'react';

import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';

export default function WhiteSpace(props) {
  let positionEditor;
  const divStyle = {
    height: `${props.data.height}rem`,
    flex: '1 100%'
  }

  if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
    divStyle.border = '2px rgba(0,229,255,.6) solid';
    divStyle.backgroundColor = 'rgba(0,229,255,.1)';
    divStyle.position = 'relative';
    positionEditor = <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex}/>
  } else {
    divStyle.border = 'none';
    delete divStyle.backgroundColor;
  }

  return (
    <div style={divStyle}
      data-index={props['data-index']}
      onClick={(e) => {props.handleClick(e)}}>
      {positionEditor}
    </div>
  )
}
