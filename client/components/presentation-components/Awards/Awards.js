import React from 'react';

import styles from './awards.scss';

import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';

export default function Awards(props) {
  let awardList = props.data.items.map((award, i) => {
    return <img key={i} className={styles['awards-item']} src={award.image} />
  })

  let awardStyle = {
    color: `${props.data.textColor}`
  };
  let positionEditor;

  if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
    awardStyle.border = '2px rgba(0,229,255,.6) solid';
    awardStyle.backgroundColor = 'rgba(0,229,255,.1)';
    awardStyle.position = 'relative';
    positionEditor = <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex}/>
  } else {
    awardStyle.border = 'none';
    delete awardStyle.backgroundColor;
  }



  return (
    <div
      className={styles.awards}
      data-index={props['data-index']}
      onClick={(e) => {props.handleClick(e)}}
      style={awardStyle}>
        <h2
          style={{
            color: `${props.data.textColor}`,
            lineHeight: '1em'
          }}>
          Awards
        </h2>
        { awardList }
      { positionEditor }
    </div>
  )
}
