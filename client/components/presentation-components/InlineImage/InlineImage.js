import React from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';

import styles from './inline-image.scss';

import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';

export default class InlineImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentHeight: null
    }
  }

  componentDidMount() {
    // get element height, set in state
    const paragraphHeight = document.getElementById('inline-paragraph').clientHeight;
    return this.setState({componentHeight: paragraphHeight})
  }

  componentDidUpdate() {
    // check if element height has changed => reset height in state
    const newHeight = document.getElementById('inline-paragraph').clientHeight;
    if (newHeight !== this.state.componentHeight) {
      return this.setState({componentHeight: newHeight})
    }
  }

  render() {
    const props = this.props;
    const {
      image,
      width,
      alignment,
      imagePositionX,
      imagePositionY,
      text,
      textColor,
      lineHeight,
      fontSize,
      fontWeight
    } = props.data

    let paragraphMargin = '1.5em';
    // constrain image width for weird paragraphs
    let imageWidth = width;
    const imageStyle = {
      backgroundImage: `url(${image})`,
      width: `${imageWidth}%`,
      backgroundPosition: `${imagePositionX} ${imagePositionY}`,
    };
    if (imageWidth === '66') imageStyle.minHeight = '24em';

    const paragraphStyle = {
      width: `${100 - imageWidth}%`,
      margin: alignment === 'left' ? '0 0 0 1.5rem' : '0 1.5rem 0 0',
      color: textColor,
    }

    const componentStyle = { flex: '1 100%' };
    let positionEditor;
    if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
      componentStyle.border = '2px rgba(0,229,255,.6) solid';
      componentStyle.backgroundColor = 'rgba(0,229,255,0)';
      componentStyle.position = 'relative';
      positionEditor = <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex}/>
    } else {
      componentStyle.border = 'none';
      delete componentStyle.backgroundColor;
    }

    // mobile view styling
    const containerStyle = { margin: '0.75rem auto'};

    if (props.viewMode === 'mobile') {
      paragraphMargin = '0';
      imageWidth = '0';
      containerStyle.flexDirection = 'column';
      imageStyle.maxWidth = '100%';
      imageStyle.width = '100%';
      imageStyle.paddingTop = '60%';
      imageStyle.marginBottom ='1.5em';
    }

    // check alignment from props => return correct layout
    const inlineImageElem = (() => {
      if (props.data.alignment === 'left') {
        return (
          <div className={styles['inline-image']} style={containerStyle}>
            <div
              className={styles['image']}
              data-index={props['data-index']}
              onClick={(e) => {props.handleClick(e)}}
              style={imageStyle}>
            </div>
            <div id="inline-paragraph"
              className={styles['inline-image-text']}
              data-index={props['data-index']}
              style={paragraphStyle}>
              <ContentEditable
                data-index={props['data-index']}
                html={text}
                disabled={!props.isEditing}
                onFocus={e => props.handleClick(e)}
                onChange={e => props.handleEditorChange(e, props.editingIndex, 'text')}
              />
            </div>
          </div>
        )
      } else {
        return (
          <div className={styles['inline-image']} style={containerStyle}>
            <div id="inline-paragraph"
              className={styles['inline-image-text']}
              data-index={props['data-index']}
              style={paragraphStyle}>
              <ContentEditable
                data-index={props['data-index']}
                html={text}
                disabled={!props.isEditing}
                onFocus={e => props.handleClick(e)}
                onChange={e => props.handleEditorChange(e, props.editingIndex, 'text')}
              />
            </div>
            <div
              className={styles['image']}
              data-index={props['data-index']}
              onClick={(e) => {props.handleClick(e)}}
              style={imageStyle}>
            </div>
          </div>
        )
      }
    })();

    return (
      <div id="inline-image-container" style={componentStyle}>
        { positionEditor }
        { inlineImageElem }
      </div>
    )
  }
}

InlineImage.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    imagePositionX: PropTypes.string.isRequired,
    imagePositionY: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    alignment: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    lineHeight: PropTypes.string.isRequired,
    fontSize: PropTypes.string.isRequired,
    fontWeight: PropTypes.string.isRequired
  }).isRequired,
  'data-index': PropTypes.number,
  editingIndex: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
}
