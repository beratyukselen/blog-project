const Post = require('../models/post');

exports.createPost = async (req, res) => {
    try {
        const { title, content, category_id } = req.body;
        const userId = req.userData.userId;

        let image_url = null;
        if (req.file) {
            image_url = req.file.location;
        }

        if (!title || !content) {
            return res.status(400).json({ message: 'Başlık ve içerik zorunludur.' });
        }

        await Post.create(title, content, image_url, userId, category_id);

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

exports.getMyPosts = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const posts = await Post.findByUserId(userId);
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Yazılarınız getirelemedi.'});
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.userData.userId;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(403).json({ message: 'Bu yazıyı silmeye yetkiniz yok!' });
        }

        await Post.delete(postId);
        res.status(200).json({ message: 'Yazı başarıyla silindi.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Yazı silinemedi.' });
    }
};

exports.updatePost = async (req,res) => {
    try {
        const postId = req.params.id;
        const userId = req.userData.userId;
        const { title, content, category_id } = req.body;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message : 'Yazı bulunamadı.' });
        }

        if (post.user_id !== userId) {
            return res.status(403).json({ message: 'Bu yazıyı düzenlemeye yetkiniz yok!' });
        }

        let image_url = post.image_url;

        if (req.file) {
            image_url = req.file.location;
        }

        await Post.update(postId, title, content, image_url, category_id);

        res.status(200).json({ message: 'Yazı başarıyla güncellendi!'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Yazı güncellenemedi.'});
    }
};