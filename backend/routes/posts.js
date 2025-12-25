const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/create', authMiddleware, upload.single('image'), PostController.createPost);
router.get('/my-posts', authMiddleware, PostController.getMyPosts);
router.delete('/delete/:id', authMiddleware, PostController.deletePost);
router.put('/update/:id', authMiddleware, upload.single('image'), PostController.updatePost);
router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);

module.exports = router;