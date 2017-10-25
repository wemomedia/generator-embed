import React from 'react';
// import style module
import styles from './header.scss';
//import components
import Button from '../Button/Button';

export default function Header(props) {
  const data = props.data;
  // set dynamic header inline styles
  let headerStyle = {
    backgroundImage: `url(${data.image})`,
    color: data.textColor
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

  const responsiveCSS = `
    @media screen and (max-width: 970px) {
      #header-headline { font-size: ${data.fontSize / 1.75}rem !important; }
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
            lineHeight: '1em',
            textIndent: `${data.letterSpacing}em`
          }}>
          {data.text}
        </h1>
        <h5 style={{color: data.textColor}}>{data.subheadText}</h5>
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
