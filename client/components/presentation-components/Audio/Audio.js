import React from 'react';
import PropTypes from 'prop-types';

import PositionEditor from '../../editor-components/PositionEditor/PositionEditor';

export default class Audio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sourceUrl: null,
      embedURL: null
    }
    this.loadPlayer = this.loadPlayer.bind(this);
  }

  componentDidUpdate() {
    if (this.props.data.src != this.state.sourceUrl) {
      return this.setState({sourceUrl: this.props.data.src}, () => {this.loadPlayer()});
    }
  }

  componentDidMount() {
    return this.setState({sourceUrl: this.props.data.src}, () => {this.loadPlayer()});
  }

  loadPlayer() {
    const that = this;
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4 && this.status === 200) {
        const str = `${JSON.parse(this.responseText).html}`;
        const regex = /<iframe.*?src="(.*?)"/;
        const src = regex.exec(str)[1];
        return that.setState({embedURL: src})
      }
    });
    xhr.open("GET", "https://soundcloud.com/oembed?format=json&url=" + this.state.sourceUrl);
    xhr.send();
  }

  render() {
    const props = this.props;
    const audioStyle = {
      position: 'relative',
      margin: '1.5em auto',
      flex: '1 100%',
      width: '100%'
    };

    let positionEditor;

    const editButtonStyle = {
      zIndex: 100,
      position: 'absolute',
      right: '1em',
      bottom: '1em'
    }

    if (props.editingIndex == props['data-index'] && props.editingIndex && props.isEditing) {
      audioStyle.border = '2px rgba(0,229,255,.6) solid';
      audioStyle.backgroundColor = 'rgba(0,229,255,.1)';
      positionEditor = <PositionEditor reorderComponent={props.reorderComponent} editingIndex={props.editingIndex}/>
    } else {
      audioStyle.border = 'none';
      delete audioStyle.backgroundColor;
    }

    return (
      <div
        style={audioStyle}
        data-index={props['data-index']}
        onClick={(e) => {props.handleClick(e)}}
      >
        <iframe
          width="100%"
          height="100%"
          scrolling="no"
          frameBorder="no"
          src={this.state.embedURL}
          data-index={props['data-index']}
          onClick={(e) => {props.handleClick(e)}}>
        </iframe>
        {
          (props.isEditing && props.editingIndex != props['data-index']) &&
            <button style={editButtonStyle}
              data-index={props['data-index']}
              onClick={(e) => {props.handleClick(e)}}>
              Edit Audio Source
            </button>
        }
        { positionEditor }
      </div>
    )
  }
}

Audio.propTypes = {
  data: PropTypes.shape({
    src: PropTypes.string.isRequired
  }).isRequired,
  'data-index': PropTypes.number,
  editingIndex: PropTypes.number,
  handleClick: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
}
