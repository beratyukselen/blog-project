const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, commentController.addComment);

router.get('/:postId', commentController.getCommentsByPost);

router.delete('/delete/:id', authMiddleware, commentController.deleteComment);

module.exports = router;