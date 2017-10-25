import React from 'react';
import styles from '../ComponentMenu/component-menu.scss'

import MobileIcon from 'react-icons/lib/md/stay-current-portrait';
import PreviewIcon from 'react-icons/lib/md/chrome-reader-mode';
import FullscreenIcon from 'react-icons/lib/md/tv';

export default function ComponentMenu(props) {
  return (
    <div className={styles['component-menu']}>
      <button onClick={(e) => {props.changeViewMode(e, 'editor')}}>
        <PreviewIcon />
        <span>Editor</span>
      </button>
      <button onClick={(e) => {props.changeViewMode(e, 'fullscreen')}}>
        <FullscreenIcon />
        <span>Fullscreen</span>
      </button>
    </div>
  )
}
