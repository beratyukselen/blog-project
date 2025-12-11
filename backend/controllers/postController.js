const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
    try {
        const { title, content, image_url, category_id } = req.body;
        const userId = req.userData.userId;

        if (!title || !content) {
            return res.status(400).json({ message: 'Başlık ve içerik zorunludur.' });
        }

        await Post.create(title, content, image_url || null, userId, category_id);

        res.status(201).json({ message: 'Yazı başarıyla paylaşıldı!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.getAll();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Veriler çekilemedi.' });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Yazı bulunamadı.' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Veri çekilemedi.' });
    }
};