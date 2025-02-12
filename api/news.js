const axios = require('axios');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { category = 'general' } = req.query;
  const API_KEY = '226c33eac1f97f3f8d4d337df2601c07'; // Replace with your GNews API key

  try {
    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&apikey=${API_KEY}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    return res.status(500).json({ 
      error: 'Failed to fetch news',
      details: error.message
    });
  }
}; 