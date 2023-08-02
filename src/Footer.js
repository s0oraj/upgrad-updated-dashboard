// Footer.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Footer = () => {
  return (
    <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: 0, maxHeight: '8vh', overflowY: 'auto' }}>
      <Toolbar>
        <Typography variant="body1" color="inherit" align="center">
          © 2023 Student Dashboard by Suraj Singh. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
