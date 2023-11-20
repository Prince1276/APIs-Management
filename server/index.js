const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());
const PEXELS_API_KEY = 'INDW5eG8mvNl8RKvA44NgLCfF63XBpC0KSz30Xm2LRSRpXcJ1HqJh6Wg';

app.get('/api/images', async (req, res) => {
    try {
      const response = await axios.get('https://api.pexels.com/v1/curated', {
        headers: {
          Authorization: `Bearer ${PEXELS_API_KEY}`
        }
      });
      const images = response.data.photos.map(photo => ({
        id: photo.id,
        src: photo.src.large,
        photographer: photo.photographer
      }));
      res.json(images);
    } catch (error) {
      console.error('Error fetching images from Pexels:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
