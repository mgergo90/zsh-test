import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeSelectResultItem } from './selectors';
import { useCardStyle } from './styles';
import { setSelected } from './actions';
import { ItemProps } from './types';

const ListItem = ({ id }: ItemProps) => {
  const item = useSelector(makeSelectResultItem(id));
  const dispatch = useDispatch();
  const classes = useCardStyle();

  if (!item) {
    return null;
  }

  return (
    <Grid item xs={6} sm={3}>
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
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            href={`https://www.imdb.com/title/${item.id}`}
            target="_blank"
          >
            IMDB
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ListItem;
