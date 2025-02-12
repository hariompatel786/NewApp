import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1a237e',
      },
      background: {
        default: isDarkMode ? '#121212' : '#f5f7fa',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: "'Montserrat', sans-serif",
    },
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <Switch>
            <Route exact path="/">
              <Redirect to="/category/general" />
            </Route>
            <Route exact path="/category/:category" component={NewsList} />
            <Route path="/article/:id" component={NewsDetail} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
