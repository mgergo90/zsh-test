import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchTerm, selectError } from 'containers/App/selectors';
import { initSearch } from './actions';
import useInjectEpic from 'utils/injectEpic';
import { key } from './constants';
import epic from './epic';
import reducer from './reducer';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { selectLoading, selectResultsId } from './selectors';
import { CircularProgress, Grid } from '@material-ui/core';
import ListItem from './ListItem';
import ItemModal from './ItemModal';

const selectors = createStructuredSelector({
  term: selectSearchTerm,
  loading: selectLoading,
  ids: selectResultsId,
  error: selectError,
});

const HomePage = () => {
  useInjectEpic({ key, epic });
  useInjectReducer({ key, reducer });
  const { term, loading, ids, error } = useSelector(selectors);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initSearch(term));
  }, [term]);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <>
      <ItemModal />
      <Grid container spacing={3}>
        {ids.map(id => (
          <ListItem key={id} id={id} />
        ))}
      </Grid>
    </>
  );
};

export default HomePage;
