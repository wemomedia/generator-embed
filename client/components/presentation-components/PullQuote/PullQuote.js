import React from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import styles from './pull-quote.scss';

import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';

export default class PullQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentHeight: null
    }
  }

  componentDidMount() {
    // get element height, set in state
    const paragraphHeight = document.getElementById(`inline-paragraph${this.props['data-index']}`).clientHeight;
    return this.setState({componentHeight: paragraphHeight})
  }

  componentDidUpdate() {
    // check if element height has changed => reset height in state
    const newHeight = document.getElementById(`inline-paragraph${this.props['data-index']}`).clientHeight;
    if (newHeight !== this.state.componentHeight) {
      return this.setState({componentHeight: newHeight})
    }
  }

  render() {
    const props = this.props;
    const containerStyle = {};
    const componentStyle = { flex: '1 100%' };
    let quoteWidth = props.data.width;
    let paragraphMargin = '1.5em';
    let positionEditor;

    const paragraphStyle = {
      width: `${100 - quoteWidth}%`,
      margin: props.data.alignment === 'left' ? '0 0 0 1.5rem' : '0 1.5rem 0 0',
      color: props.data.textColor,
      fontWeight: props.data.fontWeight,
    }

    const quoteStyle = {
      width: `${quoteWidth}%`,
      textAlign: 'left',
      color: props.data.quoteTextColor,
      fontSize: '2rem',
      fontStyle: 'italic',
      lineHeight: '1.2em'
    };

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
    if (props.viewMode === 'mobile') {
      paragraphMargin = '0';
      quoteWidth = '0';
      containerStyle.flexDirection = 'column';
      quoteStyle.maxWidth = '100%';
      quoteStyle.width = '100%';
      quoteStyle.marginBottom ='1.5em';
    }

    const responsiveCSS = `
      @media screen and (max-width: 970px) {
        #quote${props['data-index']} { font-size: 1.5rem !important; }
      }
    `

    const inlineQuoteElem = () => {
      if (props.data.alignment === 'left') {
        return (
          <div className={styles['inline-quote']} style={containerStyle}>
            <div id={`quote${props['data-index']}`} className={styles['quote']} style={quoteStyle}>
              <ContentEditable
                data-index={props['data-index']}
                html={props.data.quoteText}
                disabled={!props.isEditing}
                onFocus={e => props.handleClick(e)}
                onChange={e => props.handleEditorChange(e, props.editingIndex, 'quoteText')}
              />
            </div>
            <div id={`inline-paragraph${props['data-index']}`}
              className={styles['inline-quote-text']}
              style={paragraphStyle}>
              <ContentEditable
                data-index={props['data-index']}
                html={props.data.text}
                disabled={!props.isEditing}
                onFocus={e => props.handleClick(e)}
                onChange={e => props.handleEditorChange(e, props.editingIndex, 'text')}
              />
            </div>
          </div>
        )
      } else {
        return (
          <div className={styles['inline-quote']} style={containerStyle}>
            <div id={`inline-paragraph${props['data-index']}`}
              className={styles['inline-quote-text']}
              style={paragraphStyle}>
              <ContentEditable
                data-index={props['data-index']}
                html={props.data.text}
                disabled={!props.isEditing}
                onFocus={e => props.handleClick(e)}
                onChange={e => props.handleEditorChange(e, props.editingIndex, 'text')}
              />
            </div>
            <div id={`quote${props['data-index']}`} className={styles['quote']} style={quoteStyle}>
              <ContentEditable
                data-index={props['data-index']}
                html={props.data.quoteText}
                disabled={!props.isEditing}
                onFocus={e => props.handleClick(e)}
                onChange={e => props.handleEditorChange(e, props.editingIndex, 'quoteText')}
              />
            </div>
          </div>
        )
      }
    };

    return (
      <div id="inline-quote-container" style={componentStyle}>
        { positionEditor }
        { inlineQuoteElem() }
        <style>
          { responsiveCSS }
        </style>
      </div>
    )
  }
}

PullQuote.propTypes = {
  data: PropTypes.shape({
    fontSize: PropTypes.string.isRequired,
    fontWeight: PropTypes.string.isRequired,
    quoteText: PropTypes.string.isRequired,
    quoteTextColor: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    alignment: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
  }).isRequired,
  'data-index': PropTypes.number,
  editingIndex: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  reorderComponent: PropTypes.func.isRequired,
  handleEditorChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  viewMode: PropTypes.string.isRequired,
}
