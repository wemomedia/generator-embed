import React from 'react';

import styles from './page-controller.scss';

import PlusIcon from 'react-icons/lib/md/add';
import MenuIcon from 'react-icons/lib/md/menu';

// import components
import ComponentMenu from '../ComponentMenu/ComponentMenu';
import ViewModeMenu from '../ViewModeMenu/ViewModeMenu';
import AppMenu from '../AppMenu/AppMenu';

export default function PageController(props) {
  function activeStyle(menu) {
    if (menu === props.controllerMenu) {
      return {color: '#fd7c07'}
    }
  }

  return (
    <div className={styles['page-controller']}>
      <button style={activeStyle('component')} onClick={(e) => {props.toggleControllerMenu(e, 'component')}}>
        Add a Feature
      </button>
      <button style={activeStyle('view')} onClick={(e) => {props.toggleControllerMenu(e, 'view')}}>
        Change View
      </button>

      {props.controllerMenu === 'component' &&
        <ComponentMenu addComponent={props.addComponent} />
      }
      {props.controllerMenu === 'view' &&
        <ViewModeMenu changeViewMode={props.changeViewMode} />
      }
      {props.controllerMenu === 'app' &&
        <AppMenu savePage={props.savePage} />
      }
    </div>
  )
}
