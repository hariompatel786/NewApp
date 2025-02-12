import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Button,
  Box,
  Chip,
  Divider,
  CircularProgress
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function NewsDetail() {
  const [article, setArticle] = useState(null);
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const savedArticle = localStorage.getItem('currentArticle');
    if (savedArticle) {
      setArticle(JSON.parse(savedArticle));
    } else {
      history.push('/');
    }
  }, [history]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!article) {
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
    <Container maxWidth="md" sx={{ py: isMobile ? 2 : 4 }}>
      <Card sx={{ 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: 2
      }}>
        <CardMedia
          component="img"
          height={isMobile ? "300" : "500"}
          image={article.urlToImage || 'https://via.placeholder.com/600x400'}
          alt={article.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ p: isMobile ? 2.5 : 4 }}>
          <Box sx={{ mb: isMobile ? 2 : 3 }}>
            <Chip 
              label={article.source.name}
              sx={{ 
                backgroundColor: '#1a237e',
                color: 'white',
                mb: isMobile ? 1.5 : 2,
                fontSize: isMobile ? '0.75rem' : '0.875rem'
              }}
            />
            <Typography 
              variant={isMobile ? "h5" : "h4"}
              sx={{ 
                fontWeight: 700,
                lineHeight: 1.3,
                mb: isMobile ? 1.5 : 2
              }}
            >
              {article.title}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'text.secondary',
              mb: isMobile ? 2 : 3
            }}>
              <AccessTimeIcon sx={{ fontSize: isMobile ? 16 : 20, mr: 1 }} />
              <Typography variant="body2" sx={{ fontSize: isMobile ? '0.8rem' : '0.875rem' }}>
                {formatDate(article.publishedAt)}
              </Typography>
            </Box>
            <Divider sx={{ mb: isMobile ? 2 : 3 }} />
          </Box>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              lineHeight: 1.8,
              fontSize: isMobile ? '0.95rem' : '1.1rem',
              mb: isMobile ? 3 : 4
            }}
          >
            {article.content}
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<LaunchIcon />}
            fullWidth={isMobile}
            sx={{ 
              backgroundColor: '#1a237e',
              '&:hover': {
                backgroundColor: '#000051'
              },
              py: isMobile ? 1 : 1.5,
              px: isMobile ? 3 : 4,
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}
          >
            Read Full Article
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default NewsDetail; 