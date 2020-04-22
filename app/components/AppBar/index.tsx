import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Container, Toolbar, InputBase, AppBar } from '@material-ui/core';

import { useAppBarStyle } from './styles';
import { AppBarProps } from './types';

const ZshAppBar = ({ onChange }: AppBarProps) => {
  const classes = useAppBarStyle();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                onChange={onChange}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default ZshAppBar;
