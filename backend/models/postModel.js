const db = require('../config/db');

class Post {
    static async create(title, content, image_url, user_id, category_id) {
        const sql = 'INSERT INTO posts (title, content, image_url, user_id, category_id) VALUES (?,?,?,?,?)';
        const [result] = await db.execute(sql, [title, content, image_url, user_id, category_id]);
        return result;
    }

    static async getAll() {
        const sql = `
            SELECT posts.*, users.username 
            FROM posts 
            JOIN users ON posts.user_id = users.id 
            ORDER BY created_at DESC
        `;
        const [rows] = await db.execute(sql);
        return rows;
    } 
}

module.exports = Post;