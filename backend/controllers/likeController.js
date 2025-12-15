const Like = require('../models/likeModel');

exports.toggleLike = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.userData.userId;
        const existingLike = await Like.check(userId, postId);

        if (existingLike) {
            await Like.remove(userId, postId);
            res.status(200).json({ message: 'Beğeni geri alındı.', liked: false});
        } else {
            await Like.add(userId, postId);
            res.status(201).json({ message: 'Yazı beğenildi!', liked: true});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'İşlem başarısız.' });
    }
};

exports.getLikeStatus = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.userData.userId;
        const existingLike = await Like.check(userId, postId);
        const totalLikes = await Like.count(postId);

        res.status(200).json({
            liked: !!existingLike,
            count: totalLikes
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Bilgi alınamadı.' });
    }
};