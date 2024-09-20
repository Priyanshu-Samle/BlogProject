
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import './BlogPage.css';

// function BlogCard({ blog }) {
//   const [comments, setComments] = useState([]);
//   const [commentData, setCommentData] = useState({ comments: '' });
//   const [socket, setSocket] = useState(null);

//   const token = localStorage.getItem('userToken');

//   // Initialize Socket.IO connection only once
//   useEffect(() => {
//     const newSocket = io('http://localhost:5000', { transports: ['websocket', 'polling'] });
//     setSocket(newSocket);

//     // Clean up the socket connection when the component unmounts
//     return () => {
//       if (newSocket) {
//         newSocket.disconnect();
//       }
//     };
//   }, []); // Empty dependency array ensures this only runs once on mount

//   // Fetch comments when the component mounts or when the blog ID changes
//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         // const token = localStorage.getItem('userToken');
//         const response = await axios.get(`http://localhost:5000/api/blogs/comments/${blog._id}`);
//         setComments(response.data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };

//     fetchComments();
//   }, [blog._id]);

//   // Listen for new comments from the socket
//   useEffect(() => {
//     if (socket) {
//       socket.on('commentAdded', (data) => {
//           if ((data.user).toString() === (blog._id).toString()) {
//           // Properly update the state without duplicates
//           setComments((prevComments) => [...prevComments, { comments: data.comments }]);
//         }
//       });
//     }

//     // Clean up the event listener when the component unmounts
//     return () => {
//       if (socket) {
//         socket.off('commentAdded'); // Remove the listener to prevent memory leaks
//       }
//     };
//   }, [socket, blog._id]); // Add socket and blog._id as dependencies

//   // Handle input change for adding comments
//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setCommentData({ ...commentData, [name]: value });
//   };

//   // Handle adding new comment via Socket.IO
//   const handleAddComment = () => {
//     if (socket) {
//       const newComment = { user: blog._id, comments: commentData.comments };
//       socket.emit('addComment', newComment);
//       setCommentData({ comments: '' });
//     }
//   };

//   return (
//     <div className="blog_card">
//       <img src={blog.image || 'https://via.placeholder.com/300'} className="blog-card-img" alt={blog.title} />
//       <div className="blog-card-body">
//         <h5 className="blog-card-title">{blog.title}</h5>
//         <p className="blog-card-text">{blog.content}</p>
//       </div>
//       <ul className="blog-card-details">
//         <li>Category: {blog.category}</li>
//         <li>Tags: {blog.tags.join(', ')}</li>
//       </ul>

//       <div className='likeOrcomment'>
//         <div className='like'>
//           Likes: {/* Placeholder for likes */}
//         </div>

//         <div className='comment'>
//           <h3>Comments:</h3>
//           <ul>
//             {comments.length > 0 ? (
//               comments.map((comment, index) => (
//                 <li key={index}>{comment.comments}</li> // Display the comment inside the <li> tag
//               ))
//             ) : (
//               <p>No comments yet</p>
//             )}
//           </ul>

//           {token ?<div> <input
//             onChange={handleOnChange}
//             name='comments'
//             value={commentData.comments}
//             type="text"
//             placeholder='Enter your comment'
//           />
//           <button onClick={handleAddComment}>Add Comment</button> </div> :<div></div>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlogCard;



import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './BlogPage.css';
import { useSelector } from 'react-redux';

function BlogCard({ blog }) {
  const [comments, setComments] = useState([]);
  const [commentData, setCommentData] = useState({ comments: '' });
  const [socket, setSocket] = useState(null);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const userId = useSelector((state) => state.auth.user);

  const token = localStorage.getItem('userToken');
  // Initialize Socket.IO connection only once
  useEffect(() => {
    const newSocket = io('http://localhost:5000', { transports: ['websocket', 'polling'] });
    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  // Fetch comments when the component mounts or when the blog ID changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/comments/${blog?._id}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [blog?._id]);

  // Fetch likes and check if the user has already liked the blog
  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/count/${blog?._id}`);
        setLikes(response.data.likeCount);

        if (token) {
          const likedResponse = await axios.get(`http://localhost:5000/api/blogs/user/${blog?._id}/${userId?._id}`);
          setLiked(likedResponse.data.liked);
        }
      } catch (error) {
        console.error('Error fetching like data:', error);
      }
    };

    fetchLikeData();
  }, [blog?._id, userId?._id]);

  // Listen for new comments from the socket
  useEffect(() => {
    if (socket) {
      socket.on('commentAdded', (data) => {
        if ((data.user).toString() === (blog._id).toString()) {
          // Properly update the state without duplicates
          setComments((prevComments) => [...prevComments, { comments: data.comments }]);
        }
      });

      socket.on('likeUpdated', (data) => {
        if (data.blogId === blog._id) {
          setLikes(data.likeCount);
        }
      });
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (socket) {
        socket.off('commentAdded');
        socket.off('likeUpdated');
      }
    };
  }, [socket, blog._id]);

  // Handle input change for adding comments
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCommentData({ ...commentData, [name]: value });
  };

  // Handle adding new comment via Socket.IO
  const handleAddComment = () => {
    if (socket) {
      const newComment = { user: blog._id, comments: commentData.comments };
      socket.emit('addComment', newComment);
      setCommentData({ comments: '' });
    }
  };

  // Handle Like Toggle
  const handleLike = async () => {
    if (socket && token) {
      try {
        await axios.post('http://localhost:5000/api/blogs/toggle', {
          userId:userId._id,
          blogId: blog._id,
        });
        setLiked(!liked); // Toggle the like status optimistically
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    }
  };

  return (
    <div className="blog_card">
      <img src={blog.image || 'https://via.placeholder.com/300'} className="blog-card-img" alt={blog.title} />
      <div className="blog-card-body">
        <h5 className="blog-card-title">{blog.title}</h5>
        <p className="blog-card-text">{blog.content}</p>
      </div>
      <ul className="blog-card-details">
        <li>Category: {blog.category}</li>
        <li>Tags: {blog.tags.join(', ')}</li>
      </ul>

      <div className='likeOrcomment'>
        <div className='like'>
          {token ? <div>
            <button onClick={handleLike} className={`like-btn ${liked ? 'liked' : ''}`}>
              {liked ? 'Unlike' : 'Like'}
            </button>
          </div> : <div></div>}
          <p>{likes} Likes</p>
        </div>

        <div className='comment'>
          <h3>Comments:</h3>
          <ul>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <li key={index}>{comment.comments}</li> // Display the comment inside the <li> tag
              ))
            ) : (
              <p>No comments yet</p>
            )}
          </ul>

          {token ? <div>
            <input
              onChange={handleOnChange}
              name='comments'
              value={commentData.comments}
              type="text"
              placeholder='Enter your comment'
            />
            <button className='like-btn' onClick={handleAddComment}>Add Comment</button>
          </div> : <div>
            Please login to see likes or comment
          </div>}
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
