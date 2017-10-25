import React from 'react';

import MoveDownIcon from 'react-icons/lib/md/arrow-drop-down-circle';

import styles from './video-header.scss';

export default function VideoHeader(props) {
  const data = props.data;
  const embedURL = props.data.embedURL;
  let videoSource;
  let videoId;

  const editButton = (() => {
    if (props.isEditing) {
      return <button className={styles['fullscreen-video-edit-button']}
              data-index={props['data-index']}
              onClick={(e) => {props.handleClick(e)}}>
              Edit Background Video
             </button>
    }
  })();

  if (embedURL) {
    // check if url is youtube or vimeo
    const pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
    const pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;

    // vimeo
    if (pattern1.test(embedURL)) {
      // extract id and add to embed string
      videoId = embedURL.match(/(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/);
      videoId = videoId[4];
      videoSource = `//player.vimeo.com/video/${videoId}?autoplay=${props.data.autoplay}&background=${props.data.muted}&loop=${props.data.looping}`
    }

    // youtube
    if (pattern2.test(embedURL)) {
      videoId = embedURL.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
      videoId = videoId[1];
      const loopParam = props.data.looping ? `&playlist=${videoId}` : ''
      videoSource = `https://www.youtube.com/embed/${videoId}?loop=${props.data.looping}&controls=0&showinfo=0&rel=0&autoplay=${props.data.autoplay}&mute=${props.data.muted}${loopParam}`
    }
  }

  const mobilePreview = (() => {
    if (props.viewMode === 'mobile') {
      return {
        minHeight: '0',
        minWidth: '0',
        height: '750px',
        width: '1500px'
      }
    }
  })()

  const headerStyle = (() => {
    const style = {
      color: data.textColor,
      letterSpacing: `${data.letterSpacing}em`,
      fontWeight: data.fontWeight,
      fontSize: `${data.fontSize}rem`,
      paddingLeft: `${data.letterSpacing}em`,
    }

    if (props.isEditing) style.transform = 'translate(calc(-50% - 9rem), -50%)';
    return style;
  })()

  const buttonStyle = (() => {
    const style = {}
    if (props.isEditing) style.transform = 'translateX(calc(-50% - 9rem))';
    return style;
  })()

  function scrollBtn() {
    const displayBtn = `function() {
      window.onscroll = function() {
        var windowPos = document.body.scrollTop
        var scrollBtn = document.getElementById('scroll-btn')
        if (windowPos > 50) {
          scrollBtn.style.display = 'none';
        } else {
          scrollBtn.style.display = 'block'
        }
      }
    }`

    const scroller = `
      var scrollContainer = document.getElementById('target');
      var target = document.getElementById('target');
      do { //find scroll container
          scrollContainer = scrollContainer.parentNode;
          if (!scrollContainer) return;
          scrollContainer.scrollTop += 1;
      } while (scrollContainer.scrollTop == 0);
      var targetY = 0;
      do { //find the top of target relatively to the container
          if (target == scrollContainer) break;
          targetY += target.offsetTop;
      } while (target = target.offsetParent);
      scroll = function(c, a, b, i) {
          i++; if (i > 30) return;
          c.scrollTop = a + (b - a) / 30 * i;
          setTimeout(function(){ scroll(c, a, b, i); }, 20);
      }
      scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
    `

    return `
    <div id="scroll-btn" onclick="${scroller}"
      style="cursor: pointer;">
      <style onload="(${displayBtn})()"></style>
      <svg
        fill="${data.buttonColor}"
        preserveAspectRatio="xMidYMid meet"
        height="2.5em"
        width="2.5em"
        viewBox="0 0 40 40"
        style="vertical-align: middle;">
        <g><path d="m20 23.4l6.6-6.8h-13.2z m0-20q6.9 0 11.8 4.8t4.8 11.8-4.8 11.8-11.8 4.8-11.8-4.8-4.8-11.8 4.8-11.8 11.8-4.8z"></path></g>
      </svg>
    </div>`
  }

  const responsiveCSS = `
    @media screen and (max-width: 970px) {
      #header-headline { font-size: ${data.fontSize / 1.75}rem !important; }
    }
  `

  return (
    <div id="video" className={styles['video-header']}>
        <iframe
          style={mobilePreview}
          id="fullscreen-video"
          data-index={props['data-index']}
          src={videoSource}
          onClick={(e) => {props.handleClick(e)}}
          allowFullScreen
          controls={!props.data.autoplay}>
        </iframe>
        <div className={styles['vid-header-overlay']} style={{ backgroundColor: data.overlayColor }} />
        <h1
          id="header-headline"
          className={styles['vid-header-headline']}
          style={headerStyle}>
          {data.text}
        </h1>
        <div className={styles['scroll-btn']}
          style={buttonStyle}
          dangerouslySetInnerHTML={{__html: scrollBtn()}} />
        <div id="target" style={{ height: '2.5rem' }}></div>
        { editButton }
        <style>
          { responsiveCSS }
        </style>
    </div>
  )
}
