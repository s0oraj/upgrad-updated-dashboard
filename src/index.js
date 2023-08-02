// index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import NavBar from './NavBar';
import Table from './Table';

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={isDrawerOpen ? 'shift-right' : ''}>
      <NavBar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Table />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
