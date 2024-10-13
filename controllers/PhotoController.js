const axios = require('axios');
const controller = {};

controller.getPhotos = async (req, res) => {
  try {
    if( photosTempSoThatNoSpammingTheEndpoint ) {
      return res.json(photosTempSoThatNoSpammingTheEndpoint);
    }
    console.log('POSTS: https://jsonplaceholder.typicode.com/photos');
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    photosTempSoThatNoSpammingTheEndpoint = response.data;
    res.json(response.data);
  } catch (error) {
    console.log('Error getPhotos:', error);
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
};

module.exports = controller;