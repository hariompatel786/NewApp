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
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { category = 'general' } = useParams();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching news for category:', category);
        
        // Use direct API call in development, proxy in production
        const API_KEY = '226c33eac1f97f3f8d4d337df2601c07';
        const response = await axios.get(
          process.env.NODE_ENV === 'development'
            ? `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&apikey=${API_KEY}`
            : `https://new-app-4mzg.vercel.app/api/news?category=${category}`
        );
        
        console.log('Response received:', response.status);
        
        if (response.data && response.data.articles) {
          setNews(response.data.articles);
        } else {
          console.error('Invalid response format:', response.data);
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        setError(
          error.response?.data?.details || 
          error.response?.data?.error || 
          error.message || 
          'Failed to fetch news'
        );
      } finally {
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

  const getImageUrl = (article) => {
    return article.image || 'https://via.placeholder.com/400x200?text=News+Image';
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

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '80vh',
        color: 'error.main'
      }}>
        <Typography variant="h6">Error loading news: {error}</Typography>
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
                  image={getImageUrl(article)}
                  alt={article.title}
                  sx={{ 
                    objectFit: 'cover',
                    backgroundColor: 'rgba(0,0,0,0.08)'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=News+Image';
                  }}
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