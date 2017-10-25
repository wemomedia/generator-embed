import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import TemplateMenu from './containers/TemplateMenu/TemplateMenu';
import PageBuilder from './containers/PageBuilder/PageBuilder';
import Preview from './containers/Preview/Preview';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={TemplateMenu} />
    <Route path="/templates" component={TemplateMenu} />
    <Route path="/build" component={PageBuilder} />
    <Route path='/preview' component={Preview} />
  </Route>
);
