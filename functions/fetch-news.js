const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    const { category = 'general' } = JSON.parse(event.body || '{}');
    const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
    
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching news' })
    };
  }
}; 