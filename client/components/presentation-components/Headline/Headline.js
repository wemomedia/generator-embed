import React from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';

import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';

export default function Headline(props) {
  const {
    text,
    textColor,
    fontSize,
    fontWeight,
    alignment,
    letterSpacing,
    column
  } = props.data;

  const isColumn = column !== '100%';

  // set text style
  const headlineStyle = {
    margin: '0 auto',
    color: textColor,
    fontSize: `${fontSize}em`,
    fontWeight: `${fontWeight}`,
    textAlign: `${alignment}`,
    letterSpacing: `${letterSpacing}em`,
    lineHeight: '1.25em',
    wordWrap: 'break-word',
    width: '100%'
  };

  // set container div style
  const containerStyle = {
    display: isColumn ? 'inline-flex' : 'block',
    width: isColumn !== '100%' ? `calc(${column} - 1rem)` : column,
    marginTop: '0.75rem',
    marginBottom: '0.75rem',
  }

  let positionEditor;
  if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
    headlineStyle.border = '2px rgba(0,229,255,.6) solid';
    headlineStyle.backgroundColor = 'rgba(0,229,255,0)';
    headlineStyle.position = 'relative';
    positionEditor = <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex}/>
  } else {
    headlineStyle.border = 'none';
    delete headlineStyle.backgroundColor;
  }

  // set baseline font-size
  const responsiveBaseSize = factor => {
    if (props.data.fontSize < 1) return props.data.fontSize
    return props.data.fontSize / factor < 1.1 ? 1.1 : props.data.fontSize / factor
  }

  // set media queries for responsive text
  const responsiveCSS = `
    @media screen and (max-width: 970px) {
      #headline${props['data-index']} { font-size: ${responsiveBaseSize(1.5)}rem !important; }
    }

    @media screen and (max-width: 475px) {
      #headline${props['data-index']} { font-size: ${responsiveBaseSize(2)}rem !important; }
    }

    @media screen and (max-width: 50em) {
      #headline-container${props['data-index']} {
        margin: .75rem 0 !important;
        width: 100% !important;
      }
    }
  `

  return (
    <div id={`headline-container${props['data-index']}`} style={containerStyle}>
      <h2
        id={`headline${props['data-index']}`}
        style={headlineStyle}
        data-index={props['data-index']}
        onClick={(e) => {props.handleClick(e)}}>
        <ContentEditable
          data-index={props['data-index']}
          html={text}
          disabled={!props.isEditing}
          onFocus={e => props.handleClick(e)}
          onChange={e => props.handleEditorChange(e, props.editingIndex, 'text')}
        />
        { positionEditor }
      </h2>
      <style>
        { responsiveCSS }
      </style>
    </div>
  )
}

Headline.propTypes = {
  data: PropTypes.shape({
    fontSize: PropTypes.string.isRequired,
    fontWeight: PropTypes.string.isRequired,
    letterSpacing: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    alignment: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
  }).isRequired,
  'data-index': PropTypes.number,
  editingIndex: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
}
