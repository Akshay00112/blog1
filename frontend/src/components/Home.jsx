import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/get');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleUpdate = async (id) => {
    const updatedContent = prompt('Enter new content for the blog post:');
    if (updatedContent) {
      try {
        await axios.put(`http://localhost:3001/update/${id}`, { content: updatedContent });
        const response = await axios.get('http://localhost:3001/get');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error updating blog post:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await axios.delete(`http://localhost:3001/delete/${id}`);
        const response = await axios.get('http://localhost:3001/get');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error deleting blog post:', error);
      }
    }
  };

  const containerStyle = {
    backgroundColor: 'white',
    padding: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px'
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    padding: '15px',
    width: '300px',
    backgroundColor: 'white'
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px'
  };

  const buttonStyle = {
    backgroundColor: 'purple',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '5px'
  };

  return (
    <div style={containerStyle}>
      {blogs.map((blog) => (
        <div key={blog._id} style={cardStyle}>
          <h2>{blog.title}</h2>
          <img src={blog.img_url} alt={blog.title} style={imageStyle} />
          <p>{blog.content}</p>
          <button
            onClick={() => handleUpdate(blog._id)}
            style={buttonStyle}
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(blog._id)}
            style={buttonStyle}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
