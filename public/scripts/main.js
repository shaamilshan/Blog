const apiUrl = 'http://localhost:3000/api';

async function fetchBlogs() {
  try {
    const response = await axios.get(`${apiUrl}/blogs`);
    const blogs = response.data;
    const blogsContainer = document.getElementById('blogs');
    blogsContainer.innerHTML = '';

    blogs.forEach(blog => {
      const blogElement = document.createElement('div');
      blogElement.innerHTML = `
        <h2>${blog.title}</h2>
        <p>${blog.content}</p>
        <small>Created at: ${new Date(blog.createdAt).toLocaleString()}</small>
        <button onclick="deleteBlog('${blog._id}')">Delete</button>
        <button onclick="editBlog('${blog._id}', '${blog.title}', '${blog.content}')">Edit</button>
        <hr>
      `;
      blogsContainer.appendChild(blogElement);
    });
  } catch (err) {
    console.error('Error fetching blogs:', err);
  }
}

async function addBlog() {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  try {
    await axios.post(`${apiUrl}/blogs`, { title, content });
    window.location.href = '/';
  } catch (err) {
    console.error('Error adding blog:', err);
  }
}

async function deleteBlog(id) {
  try {
    await axios.delete(`${apiUrl}/blogs/${id}`);
    fetchBlogs();
  } catch (err) {
    console.error('Error deleting blog:', err);
  }
}

async function editBlog(id, currentTitle, currentContent) {
  const newTitle = prompt('Enter new title:', currentTitle);
  const newContent = prompt('Enter new content:', currentContent);

  try {
    await axios.put(`${apiUrl}/blogs/${id}`, { title: newTitle, content: newContent });
    fetchBlogs();
  } catch (err) {
    console.error('Error editing blog:', err);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('addForm')) {
    document.getElementById('addForm').addEventListener('submit', function(event) {
      event.preventDefault();
      addBlog();
    });
  }

  if (document.getElementById('editForm')) {
    document.getElementById('editForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      const blogId = urlParams.get('id');
      editBlog(blogId);
    });
  }

  fetchBlogs();
});
