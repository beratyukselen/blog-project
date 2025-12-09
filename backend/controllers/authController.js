const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        // 1. Frontend'den gelen verileri al
        const { username, email, password } = req.body;

        // 2. Basit Validasyon: Veriler eksik mi?
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Lütfen tüm alanları doldurun.' });
        }

        // 3. Kullanıcı zaten var mı?
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Bu email adresi zaten kayıtlı.' });
        }

        // 4. Şifreyi kriptola (Hashle)
        const salt = await bcrypt.genSalt(10); // Güvenlik seviyesi
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Kullanıcıyı veritabanına kaydet
        await User.create(username, email, hashedPassword);

        // 6. Başarılı cevap dön
        res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu! 🎉' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası oluştu.' });
    }
};