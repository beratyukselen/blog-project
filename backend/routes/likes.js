const express = require ('express');
const router = express.Router();
const LikeController = require('../controllers/LikeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/toggle', authMiddleware, LikeController.toggleLike);
router.get('/status/:postId', authMiddleware, LikeController.getLikeStatus);

module.exports = router;