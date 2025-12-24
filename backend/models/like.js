const db = require('../config/db');

class Like {
    static async add(user_id, post_id) {
        const sql = 'INSERT INTO likes (user_id, post_id) VALUES (?, ?)';
        await db.execute(sql, [user_id, post_id]);
    }

    static async remove(user_id,post_id) {
        const sql = 'DELETE FROM likes WHERE user_id = ? AND post_id = ?';
        await db.execute(sql, [user_id, post_id]);
    }

    static async check(user_id, post_id) {
        const sql = 'SELECT * FROM likes WHERE user_id = ? AND post_id = ?';
        const [rows] = await db.execute(sql, [user_id, post_id]);
        return rows[0];
    }

    static async count(post_id) {
        const sql = 'SELECT COUNT(*) as count FROM likes WHERE post_id = ?';
        const [rows] = await db.execute(sql, [post_id]);
        return rows[0].count;
    }
}

module.exports = Like;