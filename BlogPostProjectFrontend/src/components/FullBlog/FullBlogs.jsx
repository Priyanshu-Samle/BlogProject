import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './FullBlogs.css'; // Add necessary styling

function FullBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/getOneBlog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching the blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="full-blog-container">
      <h1>{blog.title}</h1>
      <img src={blog.image || 'https://via.placeholder.com/600'} alt={blog.title} className="full-blog-image" />
      <p className="full-blog-content">{blog.content}</p>
      <div className="blog-meta">
        <span>Category: {blog.category}</span>
        <span>Tags: {blog.tags.join(', ')}</span>
      </div>
    </div>
  );
}

export default FullBlogPage;
