const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/profile', authMiddleware, userController.getProfile);
router.put('/update', authMiddleware, upload.single('profile_image'), userController.updateProfile);

module.exports = router;