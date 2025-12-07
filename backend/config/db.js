const mysql = require('mysql2');
const dotenv = require('dotenv');

// .env dosyasındaki şifreleri okumayı sağlar
dotenv.config();

// Veritabanı bağlantı ayarları (Havuz sistemi)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Bağlantıyı test eden küçük bir kod parçası
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Veritabanı bağlantı hatası:', err.code);
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('⚠️ Şifre yanlış olabilir mi? .env dosyasını kontrol et.');
        } else if (err.code === 'ER_BAD_DB_ERROR') {
            console.error('⚠️ "blog_db" adında veritabanı yok. Workbench ile oluşturmalısın.');
        }
    } else {
        console.log('✅ Veritabanına başarıyla bağlandı!');
        connection.release(); // Bağlantıyı bırak
    }
});

// Bu bağlantıyı dışarı aktar ki server.js kullanabilsin
module.exports = pool.promise();