import React from 'react';
import PropTypes from 'prop-types';

import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';
import styles from './video.scss';

export default function Video(props) {
  const embedURL = props.data.embedURL;
  const isColumn = props.data.column !== '100%';
  const videoContainerStyle = {};
  const videoStyle = {};

  let videoSource;
  let videoId;
  let positionEditor;

  // set column styles
  if (isColumn) {
    videoContainerStyle.display = 'inline-flex'
    videoContainerStyle.width = `calc(${props.data.column} - 1rem)`
  }

  // if component is actively editing, give active style
  if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
    videoStyle.border = '2px #00e5ff solid'
    videoStyle.position = 'relative';
    positionEditor = <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex} style={{right: 0, top: '-1rem'}}/>
  } else {
    videoStyle.border = `none`
  }

  // position edit source button above iframe
  const editButtonStyle = {
    zIndex: 100,
    position: 'absolute',
    right: '1em',
    bottom: '1em'
  }

  if (embedURL) {
    // check if url is youtube or vimeo
    const pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
    const pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;

    // vimeo
    if (pattern1.test(embedURL)) {
      // extract id and add to embed string
      videoId = embedURL.match(/(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/);
      videoId = videoId[4];
      videoSource = `//player.vimeo.com/video/${videoId}`
    }

    // youtube
    if (pattern2.test(embedURL)) {
      videoId = embedURL.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
      videoId = videoId[1];
      videoSource = `https://www.youtube.com/embed/${videoId}`
    }
  }

  // render the edit source button if not actively editing
  return (
    <div
      className={styles['video-container']}
      style={videoContainerStyle}>
      { positionEditor }
      <div className={styles.video}
        data-index={props['data-index']}
        style={videoStyle}>
        {
          (props.isEditing && props.editingIndex != props['data-index']) &&
            <button style={editButtonStyle}
              data-index={props['data-index']}
              onClick={(e) => {props.handleClick(e)}}>
              Edit Video Source
            </button>
        }

        <iframe data-index={props['data-index']}
          src={videoSource}
          controls>
        </iframe>
      </div>
    </div>
  )
}

Video.propTypes = {
  data: PropTypes.shape({
    embedURL: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
  }).isRequired,
  'data-index': PropTypes.number,
  editingIndex: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
}
