// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'react-bootstrap';
// import styles from './Index.module.css'
// import './Index.css'

// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid row">
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarTogglerDemo01"
//           aria-controls="navbarTogglerDemo01"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <a className="navbar-brand col-6" href="#">

//             <img src='https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572-768x591.png' className= {styles.imgLogo}/>
//           </a>
//         <div className="collapse navbar-collapse col-6  " id="navbarTogglerDemo01">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <a className="nav-link active" aria-current="page" href="#">
//                 Home
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link active" href="#">
//                 Create a New Post
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link active" href="#">
//                 About
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link active" href="#">
//                 Contact
//               </a>
//             </li>

//             <li className="nav-item">
//               <a className="nav-link active" href="#">
//               <Button >Login</Button>
//               </a>
//             </li>
//           </ul>



//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Dropdown } from 'react-bootstrap';
import styles from './Index.module.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Dropdown, Button } from 'react-bootstrap';
import './Index.css';
import { useNavigate, Outlet,  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, getData } from '../redux/actions/authActions.jsx';

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  console.log("login user is ", user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    // Navigate to another page
    navigate('/login');
  };
  // console.log("USer is ", user);

  const createNewPost = () => {
    navigate('/newpost');
  }

  const handleLogout = () => {
    // Add your logout logic here
    // console.log("Logged out");
    dispatch(logout());
    navigate('/login');


  };


  useEffect(() => {
    const token = localStorage.getItem('userToken'); // 'token' is the key you used when saving the t
    if (token) {
      dispatch(getData(token));
      // console.log("user is present");
      // console.log("Token is ", token);
     
    } else {
      console.log("Token is not present in localStorage.");
      dispatch(logout());
      // navigate('/login');
      // console.log("Token is not present");

    }
  },[]);

  const handleBlog = () =>{
    navigate('/yourBlogs');
  }

  const handleAllBlogs = ()=>{
    navigate('/AllBlogs')
  }

  const handleYourBlogs = ()=>{
    navigate('/UserBlogs');
  }

  const handleAboutPage = ()=>{
    navigate('/About')
  }

  const handleContactPage = ()=>{
    navigate('/Contact')
  }
  
  const handleHome = ()=>{
    navigate('/');
  }

  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between align-items-center mainDiv">
        {/* Logo Section */}
        <a className="navbar-brand logoClass" href="#">
          <img
            src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572-768x591.png"
            className={styles.imgLogo}
            alt="Logo"
          />
        </a>

        {/* Navbar Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Nav */}
        <div className="collapse navbar-collapse justify-content-end ul" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="" onClick={handleHome}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="" onClick={handleAllBlogs} >
                Blogs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#" onClick={handleAboutPage}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#" onClick={handleContactPage}>
                Contact
              </a>
            </li>
            {user ? <li className="nav-item dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Your Profile
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Name: {user?.userName || 'Guest'}</Dropdown.Item>
                  <Dropdown.Item href="#">Email: {user?.email || 'guest@example.com'}</Dropdown.Item>
                  <Dropdown.Item onClick={handleBlog} href='#'>

                    Create New Blogs
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleYourBlogs}  href='#'>

                    Your Blogs

                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li> : <li className="nav-item">
              <a className="nav-link active" href="">
                <Button onClick={handleButtonClick}>Login</Button>
              </a>
            </li>}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

