const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, postController.createPost);
router.get('/my-posts', authMiddleware, postController.getMyPosts);
router.delete('/delete/:id', authMiddleware, postController.deletePost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);


module.exports = router;