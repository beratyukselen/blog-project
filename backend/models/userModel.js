const db = require('../config/db');

class User {
    static async create(username, email, password) {
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const [result] = await db.execute(sql, [username, email, password]);
        return result;
    }

    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(sql, [email]);
        return rows[0];
    }

    static async findById(id) {
        const sql = 'SELECT id, username, email, bio, profile_image, created_at FROM users WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    }

    static async update(id, username, bio, profile_image) {
        const sql = 'UPDATE users SET username = ?, bio = ?, profile_image = ? WHERE id = ?';
        await db.execute(sql, [username, bio, profile_image, id]);
    }
}

module.exports = User;