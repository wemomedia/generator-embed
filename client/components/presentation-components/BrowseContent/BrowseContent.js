import React from 'react';

import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';

import styles from './browse-content.scss';

export default function BrowseContent(props) {

  let componentStyle = {};

  let positionEditor;
  if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
    componentStyle.border = '2px rgba(0,229,255,.6) solid';
    positionEditor = <div style={{position: 'relative'}}>
      <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex}/>
    </div>
  } else {
    componentStyle.border = 'none';
  }

  const contentCards = props.data.items.map((item, i) => {
    return <a key={i} href={`https://www.transportvr.com/${item.urlSlug}`}><img src={item.image} /></a>
  })

  return (
    <div data-index={props['data-index']} style={componentStyle} onClick={(e) => {props.handleClick(e)}}>
      { positionEditor }
      <div
        data-index={props['data-index']}
        onClick={(e) => {props.handleClick(e)}}
        className={styles['browse-content']}>
        { contentCards }
      </div>
      <div className={styles['browse-content']}>
        <div className={styles['browse-column']}>
          <h3>Brave VR</h3>
          <p>
            From acclaimed undersea series TheBlu to a vibrant reimagining of the music video with Old Friend, to world renowned director Jon Favreau's immersive world in Gnomes &amp; Goblins and much more.
          </p>
        </div>

        <div className={styles['browse-column']}>
          <h3>Brave Artists</h3>
          <p>
            We work with amazing talents to realize the unknown possibilities of VR. Join us and experience what is possible.
          </p>
        </div>
      </div>
    </div>
  )
}

BrowseContent.propTypes = {
  data: React.PropTypes.shape({
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        image: React.PropTypes.string.isRequired,
        urlSlug: React.PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  'data-index': React.PropTypes.number,
  editingIndex: React.PropTypes.number,
  handleClick: React.PropTypes.func.isRequired,
  isEditing: React.PropTypes.bool,
  reorderComponent: React.PropTypes.func.isRequired
}
