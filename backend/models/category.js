const db = require('../config/db');

class Category {
    static async getAll() {
        const sql = 'SELECT * FROM categories ORDER BY name ASC';
        const [rows] = await db.execute(sql);
        return rows;
    }
}

module.exports = Category;