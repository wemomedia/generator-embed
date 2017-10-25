import React from 'react';
import PropTypes from 'prop-types';

import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';
import styles from './section.scss';

export default function Section(props) {
  const sectionStyle = { backgroundImage: `url(${props.data.image})` };
  const sectionContainerStyle = { backgroundColor: props.data.backgroundColor };

  const headlineStyle = {
    fontSize: `${props.data.fontSize}em`,
    fontWeight: props.data.fontWeight,
    letterSpacing: `${props.data.letterSpacing}em`,
    color: props.data.textColor
  }

  let positionEditor;
  if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
    sectionStyle.border = '2px rgba(0,229,255,.6) solid';
    positionEditor = <div style={{position: 'relative'}}>
      <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex}/>
    </div>
  } else {
    sectionStyle.border = 'none';
  }

  const responsiveCSS = `
    @media screen and (max-width: 970px) {
      .section-headline { font-size: 1.5rem !important; }
    }
  `

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.section} style={sectionContainerStyle}>
        { positionEditor }
        <h2 className="section-headline" style={headlineStyle}>{props.data.headline}</h2>
        <a href={props.data.link} data-track={props.data.dataTrack}>
          <div
            data-index={props['data-index']}
            onClick={(e) => {props.handleClick(e)}}
            className={styles.image}
            style={sectionStyle}>
          </div>
        </a>
      </div>
      <style>{ responsiveCSS }</style>
    </div>
  )
}

Section.propTypes = {
  data: PropTypes.shape({
    backgroundColor: PropTypes.string.isRequired,
    fontSize: PropTypes.string.isRequired,
    fontWeight: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    letterSpacing: PropTypes.string.isRequired,
      dataTrack: PropTypes.string
  }).isRequired,
  'data-index': PropTypes.number,
  editingIndex: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  reorderComponent: PropTypes.func.isRequired,
}
