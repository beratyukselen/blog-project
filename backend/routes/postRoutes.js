const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, postController.createPost);

router.get('/', postController.getAllPosts);

module.exports = router;