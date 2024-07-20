const Blog = require('../models/Blog');

module.exports = {
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createBlog: async (req, res) => {
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
    });

    try {
      const newBlog = await blog.save();
      res.status(201).json(newBlog);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  updateBlog: async (req, res) => {
    const { id } = req.params;

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedBlog);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteBlog: async (req, res) => {
    const { id } = req.params;

    try {
      await Blog.findByIdAndDelete(id);
      res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
