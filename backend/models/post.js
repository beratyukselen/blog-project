const db = require('../config/db');

class Post {
    static async create(title, content, image_url, user_id, category_id) {
        const sql = 'INSERT INTO posts (title, content, image_url, user_id, category_id) VALUES (?,?,?,?,?)';
        const [result] = await db.execute(sql, [title, content, image_url, user_id, category_id]);
        return result;
    }

    static async getAll() {
        const sql = `
            SELECT posts.*, users.username, categories.name as category_name
            FROM posts 
            JOIN users ON posts.user_id = users.id 
            LEFT JOIN categories ON posts.category_id = categories.id
            ORDER BY created_at DESC
        `;
        const [rows] = await db.execute(sql);
        return rows;
    } 

static async findById(postId) {
        const sql = `
            SELECT posts.*, users.username, categories.name as category_name
            FROM posts 
            JOIN users ON posts.user_id = users.id
            LEFT JOIN categories ON posts.category_id = categories.id
            WHERE posts.id = ?
        `;
        const [rows] = await db.execute(sql, [postId]);
        return rows[0];
    }

    static async findByUserId(userId) {
        const sql = `
        SELECT posts.*, categories.name as category_name
        FROM posts
        LEFT JOIN categories ON posts.category_id = categories.id
        WHERE user_id = ?
        ORDER BY created_at DESC
        `;
        const [rows] = await db.execute(sql, [userId]);
        return rows;
    }

    static async delete(id) {
        const sql = 'DELETE FROM posts WHERE id = ?';
        await db.execute(sql, [id]);
    }

    static async update(id, title, content, image_url, category_id) {
        const sql = 'UPDATE posts SET title = ?, content = ?, image_url = ?, category_id = ? WHERE id = ?';
        await db.execute(sql, [title, content, image_url, category_id, id]);
    }
}

module.exports = Post;