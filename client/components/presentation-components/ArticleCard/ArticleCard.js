import React from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';

import styles from './article-card.scss';
import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';

export default class ArticleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const props = this.props;
    const componentStyle = { flex: '1 100%' };
    const containerStyle = { margin: '.75rem auto' };
    let positionEditor;
    let imageStyle = { backgroundImage: `url(${props.data.image})` };

    if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
      componentStyle.border = '2px rgba(0,229,255,.6) solid';
      componentStyle.backgroundColor = 'rgba(0,229,255,0)';
      componentStyle.position = 'relative';
      positionEditor = <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex}/>
    } else {
      componentStyle.border = 'none';
      delete componentStyle.backgroundColor;
    }

    if (props.viewMode === 'mobile') {
      paragraphMargin = '0';
      imageWidth = '0';
      containerStyle.flexDirection = 'column';
      imageStyle.maxWidth = '100%';
      imageStyle.width = '100%';
      imageStyle.paddingTop = '60%';
      imageStyle.marginBottom ='1.5em';
    }

    return (
      <div style={componentStyle}>
        { positionEditor }
        <div
          className={styles['article-card']}
          style={containerStyle}
          data-index={props['data-index']}
          onClick={(e) => {props.handleClick(e)}}>
          <a href={props.data.url}>
            <div
              className={styles['image']}
              style={imageStyle}
              data-index={props['data-index']}
              onClick={(e) => {props.handleClick(e)}}>
            </div>
          </a>
          <div id="inline-paragraph"
            className={styles['inline-image-text']}
            data-index={props['data-index']}>
            <p>{props.data.date}</p>
            <a href={props.data.url}>
              <h3>{props.data.headline}</h3>
            </a>
            <a
              className={styles['article-link']}
              href={props.data.url}>
              {props.data.link}
            </a>
          </div>
        </div>
      </div>
    )
  }
}


ArticleCard.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  'data-index': PropTypes.number,
  editingIndex: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
}
