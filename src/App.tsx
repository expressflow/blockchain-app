import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useStyles } from './styles';
import { AppBar } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import OrbitDB from 'orbit-db';
import { Link, Route } from "react-router-dom";
import useIPFS from './hooks/useIPFS';
import ChatGroups, { TContact } from './components/chatgroups';
import Chat from './components/chat';

let orbitdb: any;

function App() {
  const classes = useStyles();
  const [groups, setGroups] = useState<TContact[]>([]);
  const [ipfsError, setIpfsError] = useState(false);
  const ipfsObj = useIPFS((err: any) => {
    console.log('IPFS error: ' + err);
    setIpfsError(true);
  });
  const [dbReady, setDbReady] = useState(false);
  const dbRef = useRef({});

  useEffect(() => {
    const startOrbitDb = async (ipfs: any) => {
      const orbitDb = await OrbitDB.createInstance(ipfs);

      const db = await orbitDb.docstore("securebeam", {
        // If database doesn't exist, create it
        create: true,
        overwrite: true,
        // Load only the local version of the database, 
        // don't load the latest from the network yet
        localOnly: false,
        type: "docstore",
        // If "Public" flag is set, allow anyone to write to the database,
        // otherwise only the creator of the database can write
        // accessController: {
        //   write: publicAccess ? ['*'] : [orbitdb.identity.id],
        // }
      });
      dbRef.current = db;
      setGroups([{ id: 1, name: "securebeam" }]);
    }

    if (ipfsObj.isIpfsReady) {
      startOrbitDb(ipfsObj.ipfs);
    }
  }, [ipfsObj]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="primary"
            aria-label="open drawer"
            className={classes.menuButton}
          >
          </IconButton>
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
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, classes.drawerOpen)}
        classes={{
          paper: clsx(classes.drawerOpen),
        }}
      >
        <div className={classes.toolbarIcon}>
          <IconButton>
          </IconButton>
        </div>
        <Divider />
        <ChatGroups contacts={groups} />
      </Drawer>
      <main className={classes.content}>
        <Route exact path="/" component={Chat} />
      </main>
    </div>
  );
}

export default App;
