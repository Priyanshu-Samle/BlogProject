import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard.jsx';
import './BlogPage.css';

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const blogsPerPage = 2;

  useEffect(() => {
    loadBlogs(currentPage);
  }, [currentPage]);

  const loadBlogs = async (page) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/blogs/Allblogs?page=${page}&limit=${blogsPerPage}`);
      setBlogs(response.data.data);
      setTotalPages(response.data.totalPages)
    } catch (error) {
      console.error('Error loading blogs:', error);
    }
  };

  const handlePrevious = (pageNumber) => {
    setCurrentPage(pageNumber > 1 ? pageNumber - 1 : 1)
  };

  const handleNext = (currentPage) => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log("Current page ", currentPage);
    }
  }

  return (
    <div className="container containerDiv">
      <div className="div ">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="returnBlogCard">
              <BlogCard blog={blog} />
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
      <div aria-label="Page navigation example">
        <div className="pagination">
          <button className={`page-item page-link ${currentPage === 1 ? 'disabled-button' : 'active-button'}`} onClick={() => handlePrevious(currentPage > 1 ? currentPage - 1 : 1)}>
            Previous
          </button>
          <div className="page-item page-link">{currentPage}</div>
          <button
            className={`page-item page-link ${currentPage >= totalPages ? 'disabled-button' : 'active-button'}`}
            onClick={() => handleNext(currentPage)}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
}

export default BlogPage;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import BlogCard from './BlogCard.jsx';
// import './BlogPage.css';

// function BlogPage() {
//   const [blogs, setBlogs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0); // To store total pages

//   const blogsPerPage = 2; // Number of blogs per page

//   useEffect(() => {
//     loadBlogs(currentPage);
//   }, [currentPage]);

//   const loadBlogs = async (page) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/blogs/Allblogs?page=${page}&limit=${blogsPerPage}`);
//       setBlogs(response.data.data);
//       setTotalPages(response.data.totalPages); // Assuming your API returns total pages
//     } catch (error) {
//       console.error('Error loading blogs:', error);
//     }
//   };

//   const handlePageChange = (pageNumber) => {
//     if (pageNumber !== currentPage) {
//       setCurrentPage(pageNumber); // Update current page
//     }
//   };

//   return (
//     <div className="container containerDiv">
//       <div className="div ">
//         {blogs.length > 0 ? (
//           blogs.map((blog) => (
//             <div key={blog._id} className="returnBlogCard">
//               <BlogCard blog={blog} />
//             </div>
//           ))
//         ) : (
//           <p>No blogs available.</p>
//         )}
//       </div>
//       <div aria-label="Page navigation example">
//         <ul className="pagination">
//           <li className="page-item">
//             <a
//               className="page-link"
//               href="#"
//               onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
//             >
//               Previous
//             </a>
//           </li>
//           {[...Array(totalPages)].map((_, index) => (
//             <li key={index + 1} className="page-item">
//               <a
//                 className="page-link"
//                 href="#"
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </a>
//             </li>
//           ))}
//           <li className="page-item">
//             <a
//               className="page-link"
//               href="#"
//               onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
//             >
//               Next
//             </a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default BlogPage;
