import React, { useState } from 'react';
import { AppBar, Toolbar, SwipeableDrawer } from '@mui/material';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HomeIcon from '@mui/icons-material/Home';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Appbar() {
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(!open);
  };
  let [open, setOpen] = useState(false);
  const isLarge = useMediaQuery('(max-width:600px)', { noSsr: true });
  return (
    <>
      <AppBar position="static" >
        <Toolbar className={`toolbar`} variant="dense" >
          {isLarge ?
            <MenuIcon onClick={() => setOpen(!open)} style={{ marginRight: "30px", marginLeft: "-10px" }} /> :
            <>
              <Link to="/"> <HomeIcon className={`icon`} /> Home</Link>
              <Link to="/login"> <LoginIcon className={`icon`} /> Login</Link>
              <Link to="/signup"> <HowToRegIcon className={`icon`} />Sign Up</Link>
              {/* <Link to="/user/verification" className={'Admin'}> <AdminPanelSettingsIcon className={`icon`} /> Admin Portal</Link> */}
            </>}
        </Toolbar>
      </AppBar>
      {
        open ? <> <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
          classes={{ paper: `Drawer` }}
        >
          <MenuOpenIcon onClick={() => setOpen(!open)} className={`MenuCollapse`} />
          <Link to="/" onClick={() => setOpen(false)}> <HomeIcon className={`icon`} /> Home</Link>
          <Link to="/login" onClick={() => setOpen(false)}> <LoginIcon className={`icon`} /> login</Link>
          <Link to="/signup" onClick={() => setOpen(false)}> <HowToRegIcon className={`icon`} />signup</Link>
          {/* <Link to="/adminPortal" onClick={() => setOpen(false)} > <AdminPanelSettingsIcon className={`icon`} />Admin Portal</Link> */}
        </SwipeableDrawer></> : ""
      }
    </>
  )
}