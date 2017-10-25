import React from 'react';

import styles from './press.scss';
import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';

export default function Press(props) {

  let articleList = props.data.articles.map((article, i) => {
    return (
      <div key={i} className={styles['press-item']}>
        <a href={`${article.url}`} target="_blank" style={{ color: `${props.data.textColor}` }}>
          <div><span>{article.date}</span></div>
          <div className={styles['publication']}>{article.publication}</div>
          <h2 style={{ color: `${props.data.textColor}` }}>{article.snippet}</h2>
          </a>
      </div>
    )
  })

  let pressStyle = {
    color: `${props.data.textColor}`
  };

  let positionEditor;

  if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
    pressStyle.border = '2px rgba(0,229,255,.6) solid';
    pressStyle.backgroundColor = 'rgba(0,229,255,.1)';
    pressStyle.position = 'relative';
    positionEditor = <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex}/>
  } else {
    pressStyle.border = 'none';
    delete pressStyle.backgroundColor;
  }

  return (
    <div
      className={styles['press']}
      data-index={props['data-index']}
      onClick={(e) => {props.handleClick(e)}}
      style={pressStyle}>
      <h2 style={{ color: `${props.data.textColor}` }}>Press</h2>
      { articleList }
      { positionEditor }
    </div>
  )
}
