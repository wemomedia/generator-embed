import React from 'react';
import styles from '../ComponentMenu/component-menu.scss'

// import MobileIcon from 'react-icons/lib/md/stay-current-portrait';
import SaveIcon from 'react-icons/lib/md/save';
import BackIcon from 'react-icons/lib/md/backspace';

// import FullscreenIcon from 'react-icons/lib/md/tv';

export default function AppMenu(props) {
  return (
    <div className={styles['component-menu']}>
      <button onClick={(e) => {props.savePage(e)}}>
        <SaveIcon />
        <span>Save Page</span>
      </button>
      <button onClick={(e) => {props.savePage(e)}}>
        <BackIcon />
        <span>Return to Templates</span>
      </button>
    </div>
  )
}
