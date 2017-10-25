import React from 'react';
// import style module
import styles from './transport-header.scss';
//import components
import Button from '../Button/Button';

export default function Header(props) {
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

        {
          data.contentType === 'free' &&
          <div id="sign-cta" className={styles['transport-cta']}>
            <div>Get Transport to experience this VR project</div>
            <div>Free PC/Mobile</div>
            <a href="/users/sign_up" data-track="/event/button/detailheader-get-free">Sign Up</a>
          </div>
        }

        {
          data.contentType === 'premium' &&
          <div>
            <div id="sign-cta" className={styles['transport-cta']}>
              <div>Get Premium to experience this VR project</div>
              <div>Premium PC only</div>
              <a href="/users/sign_up?plan=standard" data-track="/event/button/detailheader-get-premium">
                Get Premium
              </a>
            </div>
            <div id="upgrade-cta" className={styles['transport-cta']}>
              <div>Get Premium to experience this VR project</div>
              <div>Premium PC only</div>
              <a href="/account/upgrade" data-track="/event/button/detailheader-upgrade">
                Upgrade Your Account
              </a>
            </div>
          </div>
        }

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
