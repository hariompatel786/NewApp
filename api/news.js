const axios = require('axios');

module.exports = async (req, res) => {
  console.log('API Route hit:', req.url); // Debug log
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { category = 'general' } = req.query;
  console.log('Category:', category); // Debug log
  
  const API_KEY = '226c33eac1f97f3f8d4d337df2601c07';
  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&apikey=${API_KEY}`;
  
  console.log('Fetching from:', url); // Debug log

  try {
    const response = await axios.get(url);
    console.log('Response received:', response.status); // Debug log
    
    if (!response.data || !response.data.articles) {
      throw new Error('Invalid response format');
    }
    
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    return res.status(500).json({ 
      error: 'Failed to fetch news',
      details: error.message,
      status: error.response?.status
    });
  }
}; 