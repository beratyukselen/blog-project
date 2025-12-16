const User = require('../models/userModel');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userData.userId);
        if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.'});
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Profil bilgileri alınamadı.'});
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { username, bio, profile_image } = req.body;

        await User.update(userId, username, bio, profile_image);

        res.status(200).json({ message: 'Profil başarıyla güncellendi!'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Güncelleme başarısız.'});
    }
};