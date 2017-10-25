import React from 'react';
import PropTypes from 'prop-types';
import BlankIcon from 'react-icons/lib/md/add-circle-outline';

import * as PageTemplates from '../../component-data-templates/page-templates';
import styles from './template-menu.scss';

export default function TemplateMenuItem(props) {

  const thumb = () => {
    if (!props.img) return <div className={styles['template-menu-item-thumb']} style={{ boxShadow: 'none', textAlign: 'center' }}><BlankIcon /></div>;

    const thumbStyle = { backgroundImage: `url(${props.img})` }
    return <div className={styles['template-menu-item-thumb']} style={thumbStyle}></div>
  }

  return (
    <div
      className={styles['template-menu-item']}
      onClick={() => props.startNew(PageTemplates[props.template])}>
      <h3>{ props.title }</h3>
      { thumb() }
    </div>
  )
}

TemplateMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  template: PropTypes.string.isRequired,
  startNew: PropTypes.func.isRequired,
};
