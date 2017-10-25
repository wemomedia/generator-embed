import React from 'react';
import Editor from 'react-medium-editor';
import PropTypes from 'prop-types';

import styles from './paragraph.scss';
import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';

export default class Paragraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: this.props.data.text }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.text !== nextProps.data.text) return this.setState({ text: nextProps.data.text });
  }

  handleChange(text, medium) {
    this.setState(
      { text },
      () => this.props.handleEditorChange(text, this.props.editingIndex, 'text', 'updateInline')
    );
  }

  render() {
    const props = this.props;
    const {
      alignment,
      fontSize,
      textColor,
      column,
      linkColor,
      linkHoverColor,
      text
    } = props.data;

    const isColumn = column !== '100%';

    const paragraphStyle = {
      textAlign: alignment,
      fontSize: `${fontSize}rem`,
      fontWeight: 300,
      color: textColor,
      width: isColumn ? `calc(${column} - 1rem)` : column,
      verticalAlign: 'top'
    };

    const linkStyles = `
      #paragraph${props['data-index']} a { color: ${linkColor} !important; }
      #paragraph${props['data-index']} a:hover { color: ${linkHoverColor} !important; }
    `

    let positionEditor;
    if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
      paragraphStyle.border = '2px rgba(0,229,255,.6) solid';
      paragraphStyle.backgroundColor = 'rgba(0,229,255,.0)';
      paragraphStyle.position = 'relative';
      paragraphStyle.width = isColumn ? `calc(${column} - 2rem)` : column
      positionEditor = <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex}/>
    } else {
      paragraphStyle.border = 'none';
      delete paragraphStyle.backgroundColor;
    }

    return (
      <div
        id={`paragraph${props['data-index']}`}
        data-index={props['data-index']}
        className={styles.paragraph}
        style={paragraphStyle}
      >

        {
          (props.isEditing && props.editingIndex == props['data-index']) &&
          <Editor
            text={this.state.text}
            onChange={this.handleChange}
            onClick={e => props.handleClick(e, 'paragraph', props['data-index'])}
            options={{disableEditing: false, toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'quote']}, targetBlank: true }}
          />
        }
        {
          (props.isEditing && props.editingIndex !== props['data-index']) &&
          <Editor
            text={this.state.text}
            onChange={this.handleChange}
            onClick={e => props.handleClick(e, 'paragraph', props['data-index'])}
            options={{disableEditing: true, toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'quote']}, targetBlank: true }}
          />
        }
        {
          !this.props.isEditing &&
          <Editor
            text={this.state.text}
            options={{disableEditing: true, toolbar: false, targetBlank: true }}
          />
        }
        { positionEditor }
        <style>{linkStyles}</style>
      </div>
    )
  }
}

Paragraph.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    alignment: PropTypes.string.isRequired,
    fontSize: PropTypes.string,
    column: PropTypes.string,
    linkColor: PropTypes.string,
    linkHoverColor: PropTypes.string,
  }).isRequired,
  'data-index': PropTypes.number,
  editingIndex: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
}
