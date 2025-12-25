const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const upload = require('../middleware/UploadMiddleware');

router.get('/profile', AuthMiddleware, UserController.getProfile);
router.put('/update', AuthMiddleware, upload.single('profile_image'), UserController.updateProfile);

module.exports = router;