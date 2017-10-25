import React from 'react';

import styles from './fullscreen-video.scss';

export default function FullscreenVideo(props) {
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
      videoSource = `//player.vimeo.com/video/${videoId}?autoplay=1&background=1`
    }

    // youtube
    if (pattern2.test(embedURL)) {
      videoId = embedURL.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
      videoId = videoId[1];
      videoSource = `https://www.youtube.com/embed/${videoId}?controls=0&showinfo=0&rel=0&autoplay=1&loop=1`
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

  return (
    <div className={styles['fullscreen-video']}>
        <iframe
          style={mobilePreview}
          id="fullscreen-video"
          data-index={props['data-index']}
          src={videoSource}
          onClick={(e) => {props.handleClick(e)}}
          allowFullScreen>
        </iframe>
      { editButton }
    </div>
  )
}
