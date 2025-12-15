const express = require ('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/toggle', authMiddleware, likeController.toggleLike);
router.get('/status/:postId', authMiddleware, likeController.getLikeStatus);

module.exports = router;