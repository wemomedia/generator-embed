import React from 'react';
import { Link, browserHistory } from 'react-router';

export default class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewAvailable: false
    }
  }

  componentDidMount() {
    const pageId = this.props.location.query.page;
    const that = this;

    if (pageId) {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4 && JSON.parse(this.responseText)[0]) {
          that.setState({ previewAvailable: true },
            () => document.getElementById('app').innerHTML = JSON.parse(this.responseText)[0].htmlString
          )
        }
      });
      xhr.open('GET', `/api/pages/${pageId}`);
      xhr.send();
    }
  }

  render() {
    return (
      <div>
        {!this.state.previewAvailable &&
          <div style={{ margin: '25vh 10vw'}}>
            <h1>Preview not available</h1>
            <Link to={'/'}>Return home</Link>
          </div>
        }
      </div>
    )
  }
}
