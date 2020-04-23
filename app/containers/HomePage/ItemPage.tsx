import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeSelectResultItem, selectWikiLoading } from './selectors';
import { usePageStyle } from './styles';
import { setSelected } from './actions';
import { createStructuredSelector } from 'reselect';
import { ItemProps } from './types';

const makeSelectors = (id: string) =>
  createStructuredSelector({
    item: makeSelectResultItem(id),
    loading: selectWikiLoading,
  });

const ItemPage = ({ id }: ItemProps) => {
  const { item, loading } = useSelector(makeSelectors(id));
  const dispatch = useDispatch();
  const classes = usePageStyle();

  if (!item) {
    return null;
  }

  return (
    <Grid item xs={12} sm={4} className={classes.modal}>
      <Card className={classes.root}>
        <CardActionArea onClick={() => dispatch(setSelected(item))}>
          <CardMedia
            className={classes.media}
            image={item.image}
            title={item.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.title}
            >
              {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              {loading && <CircularProgress />}
              {!loading && item.description && (
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
              )}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            href={`https://www.imdb.com/title/${item.id}`}
            target="_blank"
          >
            Imdb
          </Button>
          {item.wiki && (
            <Button
              size="small"
              color="primary"
              href={`https://en.wikipedia.org/?curid=${item.wiki}`}
              target="_blank"
            >
              Wiki
            </Button>
          )}
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(setSelected(null))}
          >
            Close
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ItemPage;
