const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { category = 'general' } = req.query;
  const API_KEY = '226c33eac1f97f3f8d4d337df2601c07';

  try {
    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&apikey=${API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}; 