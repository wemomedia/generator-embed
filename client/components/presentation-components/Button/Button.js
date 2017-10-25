import React from 'react';
import PropTypes from 'prop-types';

import styles from './button.scss';
import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';

export default function Button(props) {
  const data = props.data;

  const buttonStyle = {
      color: data.buttonTextColor,
      backgroundColor: data.buttonColor,
      border: `2px ${data.buttonColor} solid`
  }

  let positionEditor;
  if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
    buttonStyle.border = '2px #00e5ff solid'
    buttonStyle.position = 'relative';
    positionEditor = <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex} style={{ right: '15px' }}/>
  } else {
    buttonStyle.border = `2px ${data.buttonColor} solid`
  }

  return (
    <a className={styles.button}
      style={buttonStyle}
      data-index={props['data-index']}
      href={data.buttonLink}
      target="_blank"
      data-track={data.dataTrack}
      onClick={(e) => {props.handleClick(e)}}>
      {data.buttonText}
      { positionEditor }
    </a>
  )
}

Button.propTypes = {
  data: PropTypes.shape({
    buttonText: PropTypes.string.isRequired,
    buttonLink: PropTypes.string.isRequired,
    buttonColor: PropTypes.string.isRequired,
    dataTrack: PropTypes.string
  }).isRequired,
  'data-index': PropTypes.number,
  editingIndex: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
}
