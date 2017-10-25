import React from 'react';
import PropTypes from 'prop-types';
import { generateShareIcon } from 'react-share';

import styles from './social-share.scss';
import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const RedditIcon = generateShareIcon('reddit');

export default function SocialShare(props) {
  const data = props.data;
  const socialStyle = { textAlign: props.data.alignment };

  let positionEditor;
  // if actively editing set active styles
  if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
    socialStyle.border = '2px rgba(0,229,255,.6) solid';
    positionEditor = <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex} />
  }

  // check editing state before rendering edit button
  const editSocialBtn = () => {
    if (props.isEditing && props.editingIndex !== props['data-index']) {
      return (
        <button data-index={props['data-index']} onClick={(e) => {props.handleClick(e)}}>
          Edit Social
        </button>
      )
    }
    return false
  }

  function top() { var wTop = window.screenTop ? window.screenTop : window.screenY; return wTop + (window.innerHeight / 2) - 250; }
  function left() { var wLeft = window.screenLeft ? window.screenLeft : window.screenX; return wLeft + (window.innerWidth / 2) - 450; }

  function fbShareBtn() {
    return `<div onclick="window.open('http://www.facebook.com/sharer.php?s=100&p[url]=${props.data.url}', '${props.data.title}', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=900, height=500, top=${top()}, left=${left()}')" style="width: 35px; height: 35px;"><svg viewBox="0 0 64 64" fill="${props.data.logoFillColor}" width="35" height="35" class="social-icon social-icon--facebook "><g><circle cx="32" cy="32" r="31" fill="${props.data.backgroundColor}" style="fill: ${props.data.backgroundColor};"></circle></g><g><path d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"></path></g></svg></div>`
  }

  function twitShareBtn() {
    return `<div onclick="window.open('https://twitter.com/share?url=${props.data.url}&text=${props.data.title}', '${props.data.title}', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=900, height=500, top=${top()}, left=${left()}')" style="width: 35px; height: 35px;"><svg viewBox="0 0 64 64" fill="${props.data.logoFillColor}" width="35" height="35" class="social-icon social-icon--twitter "><g><circle cx="32" cy="32" r="31" fill="${props.data.backgroundColor}" style="fill: ${props.data.backgroundColor};"></circle></g><g><path d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z"></path></g></svg></div>`
  }

  function redditShareBtn() {
    return `<div onclick="window.open('http://reddit.com/submit?url=${props.data.url}&title=${props.data.title}', '${props.data.title}', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=900, height=500, top=${top()}, left=${left()}')" style="width: 35px; height: 35px;"><svg viewBox="0 0 64 64" fill="${props.data.logoFillColor}" width="35" height="35" class="social-icon social-icon--reddit "><g><circle cx="32" cy="32" r="31" fill="${props.data.backgroundColor}" style="fill: ${props.data.backgroundColor};"></circle></g><g><path d="m 52.8165,31.942362 c 0,-2.4803 -2.0264,-4.4965 -4.5169,-4.4965 -1.2155,0 -2.3171,0.4862 -3.128,1.2682 -3.077,-2.0247 -7.2403,-3.3133 -11.8507,-3.4782 l 2.5211,-7.9373 6.8272,1.5997 -0.0102,0.0986 c 0,2.0281 1.6575,3.6771 3.6958,3.6771 2.0366,0 3.6924,-1.649 3.6924,-3.6771 0,-2.0281 -1.6575,-3.6788 -3.6924,-3.6788 -1.564,0 -2.8968,0.9758 -3.4357,2.3443 l -7.3593,-1.7255 c -0.3213,-0.0782 -0.6477,0.1071 -0.748,0.4233 L 32,25.212062 c -4.8246,0.0578 -9.1953,1.3566 -12.41,3.4425 -0.8058,-0.7446 -1.8751,-1.2104 -3.0583,-1.2104 -2.4905,0 -4.5152,2.0179 -4.5152,4.4982 0,1.649 0.9061,3.0787 2.2389,3.8607 -0.0884,0.4794 -0.1462,0.9639 -0.1462,1.4569 0,6.6487 8.1736,12.0581 18.2223,12.0581 10.0487,0 18.224,-5.4094 18.224,-12.0581 0,-0.4658 -0.0493,-0.9248 -0.1275,-1.377 1.4144,-0.7599 2.3885,-2.2304 2.3885,-3.9406 z m -29.2808,3.0872 c 0,-1.4756 1.207,-2.6775 2.6894,-2.6775 1.4824,0 2.6877,1.2019 2.6877,2.6775 0,1.4756 -1.2053,2.6758 -2.6877,2.6758 -1.4824,0 -2.6894,-1.2002 -2.6894,-2.6758 z m 15.4037,7.9373 c -1.3549,1.3481 -3.4816,2.0043 -6.5008,2.0043 l -0.0221,-0.0051 -0.0221,0.0051 c -3.0209,0 -5.1476,-0.6562 -6.5008,-2.0043 -0.2465,-0.2448 -0.2465,-0.6443 0,-0.8891 0.2465,-0.2465 0.6477,-0.2465 0.8942,0 1.105,1.0999 2.9393,1.6337 5.6066,1.6337 l 0.0221,0.0051 0.0221,-0.0051 c 2.6673,0 4.5016,-0.5355 5.6066,-1.6354 0.2465,-0.2465 0.6477,-0.2448 0.8942,0 0.2465,0.2465 0.2465,0.6443 0,0.8908 z m -0.3213,-5.2615 c -1.4824,0 -2.6877,-1.2002 -2.6877,-2.6758 0,-1.4756 1.2053,-2.6775 2.6877,-2.6775 1.4824,0 2.6877,1.2019 2.6877,2.6775 0,1.4756 -1.2053,2.6758 -2.6877,2.6758 z"></path></g></svg></div>`
  }

  return (
    <div data-index={props['data-index']}
      className={styles['social-share']}
      style={socialStyle}
      onClick={(e) => {props.handleClick(e)}}>

      { props.data.alignment === 'right' && editSocialBtn() }

      <div id="facebookShare" className={styles['social-share-btn']} dangerouslySetInnerHTML={{__html: fbShareBtn()}} />
      <div id="twitterShare" className={styles['social-share-btn']} dangerouslySetInnerHTML={{__html: twitShareBtn()}} />
      <div id="redditShare" className={styles['social-share-btn']} dangerouslySetInnerHTML={{__html: redditShareBtn()}} />

      { props.data.alignment !== 'right' && editSocialBtn() }
      { positionEditor }
    </div>
  )
}

SocialShare.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    logoFillColor: PropTypes.string.isRequired,
    alignment: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  'data-index': PropTypes.number,
  editingIndex: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
}
