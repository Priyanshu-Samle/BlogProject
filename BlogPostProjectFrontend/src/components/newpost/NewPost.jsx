// import React, { useState } from 'react';
// import './NewPostStyle.css'; // Import the CSS for styling
// import axios from 'axios';

// const BlogForm = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     category: '',
//     tags: '',
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);

//       try {
//         const response = await axios.post('http://localhost:5000/api/blogs/createBloges', formData);
//         // setFormData(response.data);
//          console.log("response is ", response);

//          if(response.status===201){
//           handleCancel();
//          }
//       } catch (error) {
//          console.log("Error is ", error) 
//       }
//     // Handle form submission logic
//   };


//   const handleCancel = () => {
//     setFormData({
//       title: '',
//       content: '',
//       category: '',
//       tags: '',
//       image: null,
//     });
//   };

//   return (
//     <div className="form-container">
//       <form className="blog-form" onSubmit={handleSubmit}>
//         <h2>Create New Blog Post</h2>

//         <div className="form-group">
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             name="title"
//             id="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter blog title"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="content">Content</label>
//           <textarea
//             name="content"
//             id="content"
//             rows="6"
//             value={formData.content}
//             onChange={handleChange}
//             placeholder="Write your blog content here"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="category">Category</label>
//           <select
//             name="category"
//             id="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="Technology">Technology</option>
//             <option value="Lifestyle">Lifestyle</option>
//             <option value="Education">Education</option>
//             <option value="Travel">Travel</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="tags">Tags</label>
//           <input
//             type="text"
//             name="tags"
//             id="tags"
//             value={formData.tags}
//             onChange={handleChange}
//             placeholder="Enter tags, separated by commas"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="image">Upload Image</label>
//           <input
//             type="file"
//             name="image"
//             id="image"
//             accept="image/*"
//             onChange={handleImageUpload}
//           />
//         </div>

//         <div className="form-buttons">
//           <button onClick={handleSubmit} type="submit" className="btn-submit">
//             Submit
//           </button>
//           <button type="button" className="btn-cancel" onClick={handleCancel}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BlogForm;


import React, { useState } from 'react';
import axios from 'axios';
import './NewPostStyle.css';

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    image: null,
  });
  const [popup, setPopup] = useState({ visible: false, message: '', color: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object for uploading file
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('category', formData.category);
    data.append('tags', formData.tags);
    data.append('image', formData.image); // Append image file

    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.post('http://localhost:5000/api/blogs/createBlog', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        console.log('Blog created successfully:', response.data);
        setPopup({ visible: true, message: 'Blog Create successful!..', color: 'green' });

        setTimeout(() => {
          setPopup({ visible: false, message: '', color: '' });
          // setIsLogin(true); // Redirect to login form
        }, 3000);

        setFormData({
          title: '',
          content: '',
          category: '',
          tags: '',
          image: null,
        })
      }
    } catch (error) {
      console.error('Error uploading blog:', error);
    }
  };

  return (
    <div>

      {popup.visible && (
        <div
          style={{
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: popup.color,
          }}
        >
          {popup.message}
        </div>
      )}
      <div className="form-container">

        <form className="blog-form" onSubmit={handleSubmit}>
          <h2>Create New Blog Post</h2>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              rows="6"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content here"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
              <option value="Travel">Travel</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter tags, separated by commas"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
          </div>

          <button type="submit" className="btn-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
