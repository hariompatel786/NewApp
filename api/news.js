import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  const { category = 'general' } = req.query;
  const API_KEY = 'dd61bb994a1642b38a8d315a04b2fb37';

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    return res.status(500).json({ 
      error: 'Failed to fetch news',
      details: error.message 
    });
  }
} 