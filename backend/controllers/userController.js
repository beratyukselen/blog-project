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
        const { username, bio } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı.'});

        let image_url = user.profile_image;

        if (req.file) {
            image_url = `http://localhost:3000/uploads/${req.file.filename}`;
        }

        await User.update(userId, username, bio, image_url);

        res.status(200).json({ message: 'Profil başarıyla güncellendi!'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Güncelleme başarısız.'});
    }
};