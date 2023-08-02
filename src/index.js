import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'; // Add this import
import NavBar from './NavBar';
import Table from './Table';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: '#fff',
    color: '#000',
    padding: '1rem 0',
    width: '100%',
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIcon: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  menuIconBar: {
    width: '30px',
    height: '4px',
    backgroundColor: '#000',
    margin: '4px 0',
    transition: '0.4s',
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
    flex: 1,
    textAlign: 'center',
  },
}));

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const classes = useStyles(); // Use the makeStyles function

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={isDrawerOpen ? 'shift-right' : ''}>
      <div className={classes.header}> {/* Use the MUI classes here */}
        <div className={classes.menuIcon}>
          <div className={classes.menuIconBar} />
          <div className={classes.menuIconBar} />
          <div className={classes.menuIconBar} />
        </div>
        <h1 className={classes.headerTitle}>Your Header Title</h1>
        {/* ... Other header content ... */}
      </div>
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
