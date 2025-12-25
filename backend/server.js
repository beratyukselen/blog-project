const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const path = require('path');

const auth = require('./routes/auth');
const post = require('./routes/posts');
const comment = require('./routes/comments');
const like = require('./routes/likes');
const category = require('./routes/categories');
const user = require('./routes/users');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth' , auth);
app.use('/api/posts', post);
app.use('/api/comments', comment);
app.use('/api/categories', category);
app.use('/api/users', user);
app.use('/api/likes', like);

app.get('/', (req, res) => {
    res.json({ message: "Backend ve Git Yapısı Hazır! 🚀" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});