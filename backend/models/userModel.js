const db = require('../config/db');

class User {
    // Yeni kullanıcı oluşturma (Kayıt Ol)
    static async create(username, email, password) {
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        // execute fonksiyonu SQL Injection saldırılarını engeller
        const [result] = await db.execute(sql, [username, email, password]);
        return result;
    }

    // Email adresine göre kullanıcı bulma (Giriş yaparken lazım olacak)
    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(sql, [email]);
        // Eğer kullanıcı varsa ilkini döndür, yoksa null
        return rows[0];
    }
}

module.exports = User;