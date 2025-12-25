const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, CommentController.addComment);

router.get('/:postId', CommentController.getCommentsByPost);

router.delete('/delete/:id', authMiddleware, CommentController.deleteComment);

module.exports = router;