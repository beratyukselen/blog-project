const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

router.post('/add', AuthMiddleware, CommentController.addComment);

router.get('/:postId', CommentController.getCommentsByPost);

router.delete('/delete/:id', AuthMiddleware, CommentController.deleteComment);

module.exports = router;