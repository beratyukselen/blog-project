const db = require('../config/db');

class Comment {
    static async create(content, user_id, post_id) {
        const sql = 'INSERT INTO comments (content, user_id, post_id) VALUES (?, ?, ?)';
        const [result] = await db.execute(sql, [content, user_id, post_id]);
        return result;
    }
    static async getByPostId(postId) {
        const sql = `
            SELECT comments.*, users.username 
            FROM comments 
            JOIN users ON comments.user_id = users.id 
            WHERE comments.post_id = ? 
            ORDER BY comments.created_at ASC
        `;
        const [rows] = await db.execute(sql, [postId]);
        return rows;
    }

    static async findById(id) {
        const sql = 'SELECT * FROM comments WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    }

    static async delete(id) {
        const sql = 'DELETE FROM comments WHERE id = ?';
        await db.execute(sql, [id]);
    }
}

module.exports = Comment;