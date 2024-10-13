const express = require('express');
const router = express.Router();
const DataController = require('../controllers/DataController');
const PhotoController = require('../controllers/PhotoController');

router.get('/posts', DataController.getPosts);     
router.get('/posts/:id', DataController.getPostById); 

router.get('/photos', PhotoController.getPhotos); 

module.exports = router;