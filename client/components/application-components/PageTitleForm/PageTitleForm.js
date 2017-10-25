import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import * as actions from '../../../actions';
import styles from './page-title-form.scss';

const renderInput = (field) => {
  return <input {...field.input} type={field.type} placeholder={field.placeholder} required autoFocus />
}

class PageTitleForm extends React.Component {

  handleFormSubmit(title) {
    this.props.savePage(title);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className={styles['page-title-form']}>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <h3>Give your page a name to save changes</h3>
          <fieldset>
            <label>
              <Field component={renderInput} name="title" type="text" placeholder="My Page" required="true" />
            </label>
          </fieldset>
          <button action="submit">Save Page</button>
          <Link to="/templates">Continue without Saving</Link>
        </form>
      </div>
    )
  }
}

const PageTitlePrompt = reduxForm({
  form: 'title', // form identifier
})(PageTitleForm);

// connect the component to redux
PageTitlePrompt = connect(
  null,
  actions // give component access to our action creators
)(PageTitlePrompt)

export default PageTitlePrompt;
