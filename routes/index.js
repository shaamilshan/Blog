const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// API Routes
router.get('/api/blogs', blogController.getAllBlogs);
router.post('/api/blogs', blogController.createBlog);
router.put('/api/blogs/:id', blogController.updateBlog);
router.delete('/api/blogs/:id', blogController.deleteBlog);

// View Routes
router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'views' });
});

router.get('/add', (req, res) => {
  res.sendFile('add.html', { root: 'views' });
});

router.get('/edit', (req, res) => {
  res.sendFile('edit.html', { root: 'views' });
});

module.exports = router;
