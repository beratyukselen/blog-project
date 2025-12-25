const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const upload = require('../middleware/UploadMiddleware');

router.post('/create', AuthMiddleware, upload.single('image'), PostController.createPost);
router.get('/my-posts', AuthMiddleware, PostController.getMyPosts);
router.delete('/delete/:id', AuthMiddleware, PostController.deletePost);
router.put('/update/:id', AuthMiddleware, upload.single('image'), PostController.updatePost);
router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);

module.exports = router;