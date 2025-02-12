import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  CardActionArea,
  Container,
  Chip,
  Box,
  CircularProgress
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { category = 'general' } = useParams();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const API_KEY = 'dd61bb994a1642b38a8d315a04b2fb37';
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
        );
        setNews(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  const handleArticleClick = (article) => {
    localStorage.setItem('currentArticle', JSON.stringify(article));
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '80vh'
      }}>
        <CircularProgress size={60} thickness={4} sx={{ color: '#1a237e' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: isMobile ? 2 : 4 }}>
      <Grid container spacing={isMobile ? 2 : 3}>
        {news.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: isMobile ? 'none' : 'translateY(-4px)',
                boxShadow: isMobile ? '0 2px 8px rgba(0,0,0,0.1)' : '0 8px 20px rgba(0,0,0,0.12)'
              }
            }}>
              <CardActionArea 
                component={Link} 
                to={`/article/${index}`}
                onClick={() => handleArticleClick(article)}
                sx={{ flexGrow: 1 }}
              >
                <CardMedia
                  component="img"
                  height={isMobile ? "180" : "200"}
                  image={article.urlToImage || 'https://via.placeholder.com/300x200'}
                  alt={article.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ p: isMobile ? 2 : 2.5 }}>
                  <Box sx={{ mb: 1.5 }}>
                    <Chip 
                      label={article.source.name}
                      size="small"
                      sx={{ 
                        backgroundColor: '#1a237e',
                        color: 'white',
                        fontSize: isMobile ? '0.7rem' : '0.75rem'
                      }}
                    />
                  </Box>
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      lineHeight: 1.4,
                      mb: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {article.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      fontSize: isMobile ? '0.8rem' : '0.875rem'
                    }}
                  >
                    {article.description}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: 'text.secondary'
                  }}>
                    <AccessTimeIcon sx={{ fontSize: isMobile ? 14 : 16, mr: 0.5 }} />
                    <Typography variant="caption" sx={{ fontSize: isMobile ? '0.7rem' : '0.75rem' }}>
                      {formatDate(article.publishedAt)}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default NewsList; 