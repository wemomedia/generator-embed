import React from 'react';
// import style module
import styles from './transport-header.scss';
//import components
import Button from '../Button/Button';

export default function TransportHomeHeader(props) {
  const data = props.data;

  // set dynamic header inline styles
  let headerStyle = {
    backgroundImage: `url(${data.image})`,
    color: data.textColor
  };

  const editButtonStyle = {
    zIndex: 100,
    position: 'absolute',
    right: '1em',
    bottom: '1em',
    cursor: 'pointer'
  }

  const mockCta = (() => {
    if (window.location.host !== 'www.transportvr.com') return `.generator-app #sign-cta { display: block; }`
    return ''
  })()

  const customStyles = `
    #sign-cta { display: none; }
    #upgrade-cta { display: none; }
    .loggedout #sign-cta { display: block !important; }
    .role-user #upgrade-cta { display: block !important; }

    @media screen and (max-width: 970px) {
      #header-headline { font-size: ${data.fontSize / 1.75}rem !important; }
    }

    @media screen and (max-width: 675px) {
      #header-headline { font-size: ${data.fontSize / 2.25}rem !important; }
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
        <h2
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
        </h2>

        <h3 style={{color: data.textColor}}>{data.subheadText}</h3>

        <div>
          <div id="sign-cta" className={styles['transport-cta']}>
            <a href="https://www.transportvr.com/users/sign_up?plan=standard"
              data-track="/event/button/detailheader-get-premium"
              style={{ backgroundColor: data.buttonColor, borderColor: data.buttonColor }}>
              Get Premium
            </a>
            <a className={styles['secondary-btn']}
              href="https://www.transportvr.com/users/sign_up"
              data-track="/event/button/detailheader-get-free"
              style={{ borderColor: data.buttonColor }}>
              Get Free
            </a>
          </div>
        </div>

      </div>
      {
        (props.isEditing && props.editingIndex != props['data-index']) &&
          <button style={editButtonStyle}
            data-index={props['data-index']}
            onClick={(e) => {props.handleClick(e)}}>
            Edit Header
          </button>
      }
      <style>{ customStyles }</style>
      <style>{ mockCta }</style>
    </div>
  )
}

TransportHomeHeader.propTypes = {
  data: React.PropTypes.shape({
    fontSize: React.PropTypes.string.isRequired,
    fontWeight: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    letterSpacing: React.PropTypes.string.isRequired,
    subheadText: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    textColor: React.PropTypes.string.isRequired,
    contentType: React.PropTypes.string.isRequired,
    buttonColor: React.PropTypes.string.isRequired,
    buttonTextColor: React.PropTypes.string.isRequired,
  }).isRequired,
  'data-index': React.PropTypes.number,
  editingIndex: React.PropTypes.number,
  handleClick: React.PropTypes.func.isRequired,
  isEditing: React.PropTypes.bool,
}
