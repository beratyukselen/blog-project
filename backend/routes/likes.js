const express = require ('express');
const router = express.Router();
const LikeController = require('../controllers/LikeController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

router.post('/toggle', AuthMiddleware, LikeController.toggleLike);
router.get('/status/:postId', AuthMiddleware, LikeController.getLikeStatus);

module.exports = router;