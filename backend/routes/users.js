const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/profile', authMiddleware, UserController.getProfile);
router.put('/update', authMiddleware, upload.single('profile_image'), UserController.updateProfile);

module.exports = router;