import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function UserBlogCard({ blog }) {

  const [showMore, setShowMore] = useState(false);

  const handleReadMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="blog_card">
      <img src={blog.image || 'https://via.placeholder.com/300'} className="blog-card-img" alt={blog.title} />
      <div className="blog-card-body">
        <h5 className="blog-card-title">{blog.title}</h5>
        <p className="blog-card-text">
          {blog.content.length > 100
            ? `${blog.content.substring(0, 100)}... `
            : blog.content}
          {blog.content.length > 100 && (
            <button className="read-more-btn" onClick={handleReadMore}>
              {showMore ? 'Read Less' : 'Read More'}
            </button>
          )}
        </p>
        {showMore && (
          <div className="full-content">
            <p>{blog.content}</p>
            <Link to={`/blogs/${blog._id}`} className="read-full-btn">
              Read Full Blog
            </Link>
          </div>
        )}
      </div>
      <ul className="blog-card-details">
        <li>Category: {blog.category}</li>
        <li>Tags: {blog.tags.join(', ')}</li>
      </ul>
    </div>
  );
}

export default UserBlogCard;
