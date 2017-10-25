import React from 'react';
import PropTypes from 'prop-types';

import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';
import styles from './overlay-image.scss';

export default function OverlayImage(props) {
  const imageContainerStyle = {};
  const imageStyle = {
    background: `linear-gradient(${props.data.overlayColor}, ${props.data.overlayColor}), url(${props.data.image}) no-repeat center center / cover`
  };

  const textStyle = {
    color: `${props.data.textColor}`,
    fontSize: `${props.data.fontSize}em`,
    fontWeight: `${props.data.fontWeight}`,
    alignment: `${props.data.alignment}`,
    letterSpacing: `${props.data.letterSpacing}em`
  }

  let positionEditor;
  if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
    imageStyle.border = '2px rgba(0,229,255,.6) solid';
    positionEditor = <div style={{position: 'relative'}}>
      <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex}/>
    </div>
  } else {
    imageStyle.border = 'none';
  }

  if (props.data.width === 'inset') {
    imageStyle.width = '100%';
    imageStyle.paddingTop = '50%';
  } else if (props.data.width === 'container') {
    imageStyle.width = '110%';
    imageStyle.paddingTop = '55%';
    imageStyle.marginLeft = '-5%';
  } else {
    // fill window width
    imageStyle.position = 'absolute';
    imageStyle.top = 0;
    imageStyle.left = '50%';
    imageStyle.width = '100vw';
    imageStyle.maxHeight = '35em';
    imageStyle.height = '50vw';
    imageStyle.transform = 'translateX(-50%)';
    imageStyle.marginLeft = '0';
    imageContainerStyle.height = '34rem';
    imageContainerStyle.maxHeight = '50vw';
    imageContainerStyle.flex = '1 100%';
  }

  const responsiveBaseSize = factor => {
    if (props.data.fontSize < 1) return props.data.fontSize
    return props.data.fontSize / factor < 1.1 ? 1.1 : props.data.fontSize / factor
  }

  const responsiveCSS = `
    @media screen and (max-width: 970px) {
      #overlay-headline${props['data-index']} { font-size: ${responsiveBaseSize(1.5)}rem !important; }
    }

    @media screen and (max-width: 475px) {
      #overlay-headline${props['data-index']} { font-size: ${responsiveBaseSize(2)}rem !important; }
    }
  `

  return (
    <div className={styles.imageContainer} style={imageContainerStyle}>
      { positionEditor }
      <div
        data-index={props['data-index']}
        onClick={(e) => {props.handleClick(e)}}
        className={styles.image}
        style={imageStyle}>
        <h3 id={`overlay-headline${props['data-index']}`} style={textStyle}>{props.data.text}</h3>
      </div>
      <style>{responsiveCSS}</style>
    </div>
  )
}

OverlayImage.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    alignment: PropTypes.string.isRequired,
    fontSize: PropTypes.string,
    image: PropTypes.string,
    width: PropTypes.string,
    fontWeight: PropTypes.string,
  }).isRequired,
  'data-index': PropTypes.number,
  editingIndex: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
}
