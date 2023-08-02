// NavBar.js
import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const NavBar = ({ isDrawerOpen, toggleDrawer }) => {
  const navItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'About', icon: <PersonIcon /> },
    { text: 'Portfolio', icon: <WorkIcon /> },
    { text: 'Contact', icon: <ContactMailIcon /> },
  ];

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer} // Toggle the drawer state
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Student Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.text} onClick={toggleDrawer}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavBar;
