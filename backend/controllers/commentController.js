const Comment = require('../models/commentModel');

exports.addComment = async (req, res) => {
    try {
        const { content, post_id } = req.body;
        const user_id = req.userData.userId;

        if (!content) {
            return res.status(400).json({ message: 'Yorum içeriği boş olamaz!' });
        }

        await Comment.create(content, user_id, post_id);

        res.status(201).json({ message: 'Yorum başarıyla eklendi!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Yorum eklenirken hata oluştu.' });
    }
};

exports.getCommentsByPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.getByPostId(postId);
        
        res.status(200).json(comments);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Yorumlar yüklenemedi.' });
    }
};