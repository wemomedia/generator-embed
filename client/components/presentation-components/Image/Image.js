import React from 'react';
import PropTypes from 'prop-types';

import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';
import styles from './image.scss';

export default function Image(props) {
  const { width, height, image, stretchToFill } = props.data
  const imageContainerStyle = {};
  const imageStyle = {
    backgroundImage: `url(${image})`,
    width: '100%',
    paddingTop: `${height}%`,
    height: stretchToFill ?  'auto' : '0px'
  };

  let positionEditor;

  if (props.data.width === 'inset') {
    imageContainerStyle.flex = '1 100%';
    imageStyle.paddingTop = `${height}%`
  } else if (props.data.width === 'window'){
    imageContainerStyle.paddingTop = `${height}%`;
    // expand image to window
    imageContainerStyle.flex = '1 100%';
    imageStyle.position = 'absolute';
    imageStyle.left = '50%';
    imageStyle.transform = 'translateX(-50%)';
    imageStyle.top = 0;
    imageStyle.width = '100vw';
  } else {
    // columns
    imageContainerStyle.display = 'inline-flex'
    imageContainerStyle.width = `calc(${width} - 1rem)`
    imageStyle.verticalAlign = 'top'
  }

  if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
    imageStyle.border = '2px rgba(0,229,255,.6) solid';
    positionEditor = <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex}/>
  } else {
    imageStyle.border = 'none';
  }


  return (
    <div
      id={`image-${props.editingIndex}`}
      className={styles.imageContainer}
      style={imageContainerStyle}>

      { positionEditor }

      <div
        data-index={props['data-index']}
        onClick={(e) => {props.handleClick(e)}}
        className={styles.image}
        style={imageStyle} />

    </div>
  )
}

Image.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  }).isRequired,
  'data-index': PropTypes.number,
  editingIndex: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
}
