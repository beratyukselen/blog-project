const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/create', authMiddleware, upload.single('image'), postController.createPost);
router.get('/my-posts', authMiddleware, postController.getMyPosts);
router.delete('/delete/:id', authMiddleware, postController.deletePost);
router.put('/update/:id', authMiddleware, upload.single('image'), postController.updatePost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);

module.exports = router;