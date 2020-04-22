import { makeStyles, Theme } from '@material-ui/core/styles';

export const useCardStyle = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    padding: theme.spacing(1.5),
    backgroundSize: 'auto 100%',
    height: '300px',
  },
  title: {
    margin: theme.spacing(2, 0),
    height: '1.3em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));
