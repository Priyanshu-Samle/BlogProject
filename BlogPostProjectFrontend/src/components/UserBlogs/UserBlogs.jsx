// import React, { useEffect, useState } from 'react';
// import BlogCard from './BlogCard.jsx';
// import axios from 'axios';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserBlogCard from './UserBlogCard.jsx';  // Assuming BlogCard is in the same directory
// import './BlogPage.css'
function UserBlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:5000/api/blogs/UserBlogs', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }});
        // console.log("Response data", response.data.data);

        // If the data is an object, we need to extract its values
        // const blogArray = Object.values(response.data.data); // Convert object to an array
        setBlogs(response.data.data);
      } catch (error) {
        console.error('Error loading blogs:', error);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="container containerDiv">
      <div className="div">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="returnBlogCard">
              <UserBlogCard blog={blog} />
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
}

export default UserBlogPage;

