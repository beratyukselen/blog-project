const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { json } = require('express');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Lütfen tüm alanları doldurun.' });
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Bu email adresi zaten kayıtlı.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create(username, email, hashedPassword);

        res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu! 🎉' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası oluştu.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Veri kontrolü
        if (!email || !password) {
            return res.status(400).json({ message: 'Email ve şifre zorunludur.' });
        }

        // 2. Kullanıcıyı bul
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Geçersiz email veya şifre.' });
        }

        // 3. Şifreyi kontrol et (Bcrypt ile karşılaştırma)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Geçersiz email veya şifre.' });
        }

        // 4. Token oluştur (Kimlik Kartı Bas)
        const token = jwt.sign(
            { id: user.id, username: user.username }, // Token içine gizlenecek bilgi
            process.env.JWT_SECRET, // Bizim gizli mühür
            { expiresIn: '1h' } // Kartın süresi (1 saat sonra geçersiz olsun)
        );

        // 5. Cevap dön
        res.status(200).json({
            message: 'Giriş başarılı! Hoş geldin.',
            token: token, // 👈 İşte iOS/Frontend tarafının saklayacağı anahtar bu!
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası.' });
    }
};