/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import ZshAppBar from 'components/AppBar';
import { triggerSearch } from './actions';
import useInjectEpic from 'utils/injectEpic';
import epic from './epic';
import { key } from './constants';
import reducer from './reducer';
import { useInjectReducer } from 'utils/injectReducer';

const App = () => {
  const dispatch = useDispatch();
  useInjectEpic({ key, epic });
  useInjectReducer({ key, reducer });

  return (
    <div>
      <CssBaseline />
      <ZshAppBar
        onChange={event => {
          dispatch(triggerSearch(event.target.value));
        }}
      />
      <Container maxWidth="lg">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </div>
  );
};
export default App;
