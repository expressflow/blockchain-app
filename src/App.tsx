import React from 'react';
import { useStyles } from './styles';
import { AppBar } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
                position="fixed"
                className={classes.appBar}
            >
                <Toolbar className={classes.toolbar}>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="primary"
                        noWrap
                    >
                        SecureBeam
                    </Typography>
                </Toolbar>
            </AppBar>
    </div>
  );
}

export default App;
