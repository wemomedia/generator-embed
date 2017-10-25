import React from 'react';
// import style module
import styles from './article-header.scss';
//import components
import Button from '../Button/Button';

export default function ArticleHeader(props) {
  const data = props.data;
  // set dynamic header inline styles
  let headerStyle = {
    backgroundImage: `url(${data.image})`,
    color: data.textColor,
  };

  const buttonData = {
    buttonText: data.buttonText,
    buttonColor: data.buttonColor,
    buttonLink: data.buttonLink
  }

  const editButtonStyle = {
    zIndex: 100,
    position: 'absolute',
    right: '1em',
    bottom: '1em',
    cursor: 'pointer'
  }

  const responsiveBaseSize = factor => {
    if (props.data.fontSize < 1) return props.data.fontSize
    return props.data.fontSize / factor < 1.1 ? 1.1 : props.data.fontSize / factor
  }

  const responsiveCSS = `
    @media screen and (max-width: 970px) {
      #header-headline { font-size: ${responsiveBaseSize(1.75)}rem !important; }
    }

    @media screen and (max-width: 475px) {
      #header-headline { font-size: ${responsiveBaseSize(2)}rem !important; padding: 0 5% !important; }
      #header-subheadline { padding: 0 15% !important; }
    }
  `

  if (props.editingIndex == props['data-index'] && props.isEditing) {
    headerStyle.border = '2px #00e5ff solid'
  } else {
    headerStyle.border = 'none'
  }

  return (
    <div className={styles.header}
      data-index={props['data-index']}
      style={headerStyle}
      onClick={(e) => {props.handleClick(e)}}>
      <div className={styles['header-content']}
        onClick={(e) => {props.handleClick(e)}}>
        <h1
          id="header-headline"
          style={{
            color: data.textColor,
            letterSpacing: `${data.letterSpacing}em`,
            fontWeight: data.fontWeight,
            fontSize: `${data.fontSize}rem`,
            lineHeight: '1.25em',
            textIndent: `${data.letterSpacing}em`,
            marginTop: `${data.marginTop}em`,
          }}>
          {data.text}
        </h1>
        <h5 id="header-subheadline" style={{color: data.textColor, fontSize: `${data.subFontSize}rem`}}>{data.subheadText}</h5>
      </div>
      {
        (props.isEditing && props.editingIndex != props['data-index']) &&
          <button style={editButtonStyle}
            data-index={props['data-index']}
            onClick={(e) => {props.handleClick(e)}}>
            Edit Header
          </button>
      }
      <style>
        { responsiveCSS }
      </style>
    </div>
  )
}
