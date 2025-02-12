import React from 'react';
import { AppBar, Toolbar, Typography, Container, useTheme, useMediaQuery, Tabs, Tab, IconButton } from '@mui/material';
import { Link, useHistory, useLocation } from 'react-router-dom';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const categories = [
  { label: 'General', value: 'general' },
  { label: 'Business', value: 'business' },
  { label: 'Technology', value: 'technology' },
  { label: 'Sports', value: 'sports' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Science', value: 'science' },
  { label: 'Health', value: 'health' }
];

function Navbar({ isDarkMode, toggleDarkMode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();
  const location = useLocation();

  const currentCategory = location.pathname.split('/')[2] || 'general';

  const handleCategoryChange = (event, newValue) => {
    history.push(`/category/${newValue}`);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Container>
        <Toolbar sx={{ 
          padding: isMobile ? '8px 0' : '10px 0', 
          justifyContent: 'space-between' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <NewspaperIcon sx={{ fontSize: isMobile ? 24 : 30, marginRight: 1.5 }} />
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ 
              fontWeight: 600,
              letterSpacing: 1,
              fontFamily: "'Montserrat', sans-serif",
            }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                NewsHub
              </Link>
            </Typography>
          </div>
          <IconButton 
            sx={{ ml: 1, color: 'white' }} 
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
        <Tabs 
          value={currentCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTab-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              textTransform: 'none',
              minWidth: 'auto',
              padding: isMobile ? '6px 12px' : '6px 16px',
              '&.Mui-selected': {
                color: '#ffffff',
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#ffffff',
            }
          }}
        >
          {categories.map((category) => (
            <Tab 
              key={category.value}
              label={category.label}
              value={category.value}
            />
          ))}
        </Tabs>
      </Container>
    </AppBar>
  );
}

export default Navbar; 