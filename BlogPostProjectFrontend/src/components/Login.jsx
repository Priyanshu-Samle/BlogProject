// import React, { useState } from 'react';
// // import './style.css';  // Make sure your styles are included
// import './Logins.css'

// function AuthForm() {
//   const [isChecked, setIsChecked] = useState(false);

//   const handleToggle = () => {
//     setIsChecked(!isChecked);
//   };

//   return (
//     <div className="container">
//       {/* Toggle between login and signup */}
//       <input 
//         type="checkbox" 
//         id="check" 
//         checked={isChecked} 
//         onChange={handleToggle} 
//       />

//       {/* Login Form */}
//       <div className={`login form ${isChecked ? '' : 'active'}`}>
//         <header>Login</header>
//         <form action="#">
//           <input type="text" placeholder="Enter your email" />
//           <input type="password" placeholder="Enter your password" />
//           <a href="#">Forgot password?</a>
//           <input type="button" className="button" value="Login" />
//         </form>
//         <div className="signup">
//           <span>Don't have an account? 
//             <label htmlFor="check" onClick={handleToggle}>Signup</label>
//           </span>
//         </div>
//       </div>

//       {/* Registration Form */}
//       <div className={`registration form ${isChecked ? 'active' : ''}`}>
//         <header>Signup</header>
//         <form action="#">
//           <input type="text" placeholder="Enter your email" />
//           <input type="password" placeholder="Create a password" />
//           <input type="password" placeholder="Confirm your password" />
//           <input type="button" className="button" value="Signup" />
//         </form>
//         <div className="signup">
//           <span>Already have an account? 
//             <label htmlFor="check" onClick={handleToggle}>Login</label>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuthForm;

// import React, { useState } from 'react';
// import './Logins.css';  // Link the updated CSS
// import axios from 'axios';
// function AuthForm() {
//   const [isLogin, setIsLogin] = useState(true); // State to manage login/signup
//   const [user, setUser] = useState({
//     userName: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });


//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'name') {
//       setUser({ ...user, userName: value });
//     }
//     else if (name === 'email') {
//       setUser({ ...user, email: value });
//     }
//     else if (name === 'password') {
//       setUser({ ...user, password: value });
//     }
//     else if (name === 'confirmPassword') {
//       setUser({ ...user, confirmPassword: value });
//     }
//     // console.log(e.target.value);
//     // console.log("username is ",name)
//     // setUser({ ...user, userName: value });
//   };


//   const toggleForm = async () => {
//     setIsLogin(!isLogin); // Toggle between login and signup form

//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // console.log('Form Data:', user);
//     if(user.password === user.confirmPassword) {
//       try {
//         const response = await axios.post("http://localhost:5000/api/blogs/createUser", user);
//         setUser(response.data);
//         console.log("Response is ", response);
//         if (response.status === 201) {
//           setUser({
//             userName: "",
//             email: "",
//             password: "",
//             confirmPassword: ""
//           })
//         }
//         const AuthToken = response?.data?.token;
//         console.log(AuthToken);

//         if (AuthToken) {
//           // Store token in localStorage or sessionStorage
//           localStorage.setItem('userToken', AuthToken);
//           console.log('Login successful. Token stored.');
//         } else {
//           console.error('Login failed');
//         }

//       } catch (error) {
//         console.log("Error is ", error);
//       }
//     }
//     else {
//       console.log("password is not match")
//       // throw new Error("Password is not match");

//     }

//     // Handle form submission logic
//   };

//   // console.log(user);  

//   return (
//     <div className='body'>

//       <div className="container ">
//         {/* Login Form */}
//         <div className={`login form ${isLogin ? 'active' : ''}`}>
//           <header>Login</header>
//           <form action="#">
//             <input type="text" placeholder="Enter your email" />
//             <input type="password" placeholder="Enter your password" />
//             <a href="#">Forgot password?</a>
//             <input type="button" className="button" value="Login" />
//           </form>
//           <div className="signup">
//             <span>Don't have an account?
//               <label onClick={toggleForm} style={{ cursor: 'pointer' }}>Signup</label>
//             </span>
//           </div>
//         </div>

//         {/* Registration Form */}
//         <div className={`registration form ${!isLogin ? 'active' : ''}`}>
//           <header>Signup</header>
//           <form action="#">
//             <input onChange={handleChange} type="text" name='name' value={user.userName} placeholder="Enter your name" />
//             <input onChange={handleChange} type="text" name="email" value={user.email} placeholder="Enter your email" />
//             <input onChange={handleChange} type="password" name='password' value={user.password} placeholder="Create a password" />
//             <input onChange={handleChange} type="password" name='confirmPassword' value={user.confirmPassword} placeholder="Confirm your password" />
//             <input type="button" onClick={handleSubmit} className="button" value="Signup" />
//           </form>
//           <div className="signup">
//             <span>Already have an account?
//               <label onClick={toggleForm} style={{ cursor: 'pointer' }}>Login</label>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuthForm;



// import React, { useState } from 'react';
// import './Logins.css';  // Link the updated CSS
// import axios from 'axios';

// function AuthForm() {
//   const [isLogin, setIsLogin] = useState(true); // State to manage login/signup
//   const [user, setUser] = useState({
//     userName: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });

//   // login data maintance
//   const [popup, setPopup] = useState({ visible: false, message: '', color: '' }); // State to manage popup

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'name') {
//       setUser({ ...user, userName: value });
//     }
//     else if (name === 'email') {
//       setUser({ ...user, email: value });
//     }
//     else if (name === 'password') {
//       setUser({ ...user, password: value });
//     }
//     else if (name === 'confirmPassword') {
//       setUser({ ...user, confirmPassword: value });
//     }
//   };

//   const toggleForm = () => {
//     setIsLogin(!isLogin); // Toggle between login and signup form
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (user.password === user.confirmPassword) {
//       try {
//         const response = await axios.post("http://localhost:5000/api/blogs/createUser", user);
//         setUser(response.data);
//         console.log("Response is ", response);

//         if (response.status === 201) {
//           setUser({
//             userName: "",
//             email: "",
//             password: "",
//             confirmPassword: ""
//           });

//           // Show success popup and set green color
//           setPopup({ visible: true, message: 'Signup successful! Redirecting to login...', color: 'green' });

//           setTimeout(() => {
//             setPopup({ visible: false, message: '', color: '' });
//             setIsLogin(true); // Redirect to login form
//           }, 3000); // Popup disappears after 3 seconds
//         }

//         const AuthToken = response?.data?.token;
//         console.log(AuthToken);

//         if (AuthToken) {
//           localStorage.setItem('userToken', AuthToken);
//           console.log('Login successful. Token stored.');
//         } else {
//           console.error('Login failed');
//         }

//       } catch (error) {
//         console.log("Error is ", error);
//         // Display error popup
//         setPopup({ visible: true, message: 'Signup failed! Please try again.', color: 'red' });
//         setTimeout(() => setPopup({ visible: false, message: '', color: '' }), 3000);
//       }
//     } else {
//       console.log("password is not match");
//       // Display error popup for password mismatch
//       setPopup({ visible: true, message: 'Passwords do not match!', color: 'red' });
//       setTimeout(() => setPopup({ visible: false, message: '', color: '' }), 3000);
//     }
//   };

//   return (
//     <div className='body'>
//       <div className="container ">
//         {/* Popup for success or error */}
//         {popup.visible && (
//           <div className="popup" style={{ backgroundColor: popup.color }}>
//             {popup.message}
//           </div>
//         )}

//         {/* Login Form */}
//         <div className={`login form ${isLogin ? 'active' : ''}`}>
//           <header>Login</header>
//           <form action="#">
//             <input type="text" placeholder="Enter your email" />
//             <input type="password" placeholder="Enter your password" />
//             <a href="#">Forgot password?</a>
//             <input type="button" className="button" value="Login" />
//           </form>
//           <div className="signup">
//             <span>Don't have an account?
//               <label onClick={toggleForm} style={{ cursor: 'pointer' }}>Signup</label>
//             </span>
//           </div>
//         </div>

//         {/* Registration Form */}
//         <div className={`registration form ${!isLogin ? 'active' : ''}`}>
//           <header>Signup</header>
//           <form action="#">
//             <input onChange={handleChange} type="text" name='name' value={user.userName} placeholder="Enter your name" />
//             <input onChange={handleChange} type="text" name="email" value={user.email} placeholder="Enter your email" />
//             <input onChange={handleChange} type="password" name='password' value={user.password} placeholder="Create a password" />
//             <input onChange={handleChange} type="password" name='confirmPassword' value={user.confirmPassword} placeholder="Confirm your password" />
//             <input type="button" onClick={handleSubmit} className="button" value="Signup" />
//           </form>
//           <div className="signup">
//             <span>Already have an account?
//               <label onClick={toggleForm} style={{ cursor: 'pointer' }}>Login</label>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuthForm;


// import React, { useState } from 'react';
// import './Logins.css';  // Link the updated CSS
// import axios from 'axios';

// function AuthForm() {
//   const [isLogin, setIsLogin] = useState(true); // State to toggle between login/signup
//   const [user, setUser] = useState({
//     userName: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: ""
//   });

//   const [popup, setPopup] = useState({ visible: false, message: '', color: '' }); // Popup state

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Toggle between login and signup form inputs
//     if (isLogin) {
//       setLoginData({ ...loginData, [name]: value });
//     } else {
//       setUser({ ...user, [name]: value });
//     }
//   };

//   const toggleForm = () => {
//     setIsLogin(!isLogin); // Toggle between login and signup form
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/blogs/login", loginData);

//       if (response.status === 200) {
//         const { token, user } = response.data;

//         // Store the token in localStorage
//         localStorage.setItem('userToken', token);

//         // Show success popup and set green color
//         setPopup({ visible: true, message: `Welcome back, ${user.userName}`, color: 'green' });

//         // Redirect to a protected route or dashboard after login
//         setTimeout(() => {
//           setPopup({ visible: false, message: '', color: '' });
//           window.location.href = "/userDashboard"; // Example redirect
//         }, 3000);
//       }
//     } catch (error) {
//       console.log("Error during login:", error);
//       // Show error popup if login fails
//       setPopup({ visible: true, message: 'Login failed! Please check your credentials.', color: 'red' });
//       setTimeout(() => setPopup({ visible: false, message: '', color: '' }), 3000);
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (user.password === user.confirmPassword) {
//       try {
//         const response = await axios.post("http://localhost:5000/api/blogs/createUser", user);

//         if (response.status === 201) {
//           setUser({
//             userName: "",
//             email: "",
//             password: "",
//             confirmPassword: ""
//           });

//           // Show success popup and set green color
//           setPopup({ visible: true, message: 'Signup successful! Redirecting to login...', color: 'green' });

//           setTimeout(() => {
//             setPopup({ visible: false, message: '', color: '' });
//             setIsLogin(true); // Redirect to login form
//           }, 3000);
//         }

//         const AuthToken = response?.data?.token;
//         if (AuthToken) {
//           localStorage.setItem('userToken', AuthToken);
//         } else {
//           console.error('Signup failed');
//         }

//       } catch (error) {
//         console.log("Error during signup:", error);
//         // Show error popup
//         setPopup({ visible: true, message: 'Signup failed! Please try again.', color: 'red' });
//         setTimeout(() => setPopup({ visible: false, message: '', color: '' }), 3000);
//       }
//     } else {
//       // Show error popup for password mismatch
//       setPopup({ visible: true, message: 'Passwords do not match!', color: 'red' });
//       setTimeout(() => setPopup({ visible: false, message: '', color: '' }), 3000);
//     }
//   };

//   return (
//     <div className='body'>
//       <div className="container ">
//         {/* Popup for success or error */}
//         {popup.visible && (
//           <div className="popup" style={{ backgroundColor: popup.color }}>
//             {popup.message}
//           </div>
//         )}

//         {/* Login Form */}
//         <div className={`login form ${isLogin ? 'active' : ''}`}>
//           <header>Login</header>
//           <form onSubmit={handleLogin}>
//             <input 
//               type="text" 
//               name="email" 
//               value={loginData.email} 
//               onChange={handleChange} 
//               placeholder="Enter your email" 
//               required 
//             />
//             <input 
//               type="password" 
//               name="password" 
//               value={loginData.password} 
//               onChange={handleChange} 
//               placeholder="Enter your password" 
//               required 
//             />
//             <a href="#">Forgot password?</a>
//             <input type="submit" className="button" value="Login" />
//           </form>

//           <div className="signup">
//             <span>Don't have an account?
//               <label onClick={toggleForm} style={{ cursor: 'pointer' }}>Signup</label>
//             </span>
//           </div>
//         </div>

//         {/* Registration Form */}
//         <div className={`registration form ${!isLogin ? 'active' : ''}`}>
//           <header>Signup</header>
//           <form onSubmit={handleSignup}>
//             <input 
//               onChange={handleChange} 
//               type="text" 
//               name="userName" 
//               value={user.userName} 
//               placeholder="Enter your name" 
//               required 
//             />
//             <input 
//               onChange={handleChange} 
//               type="email" 
//               name="email" 
//               value={user.email} 
//               placeholder="Enter your email" 
//               required 
//             />
//             <input 
//               onChange={handleChange} 
//               type="password" 
//               name="password" 
//               value={user.password} 
//               placeholder="Create a password" 
//               required 
//             />
//             <input 
//               onChange={handleChange} 
//               type="password" 
//               name="confirmPassword" 
//               value={user.confirmPassword} 
//               placeholder="Confirm your password" 
//               required 
//             />
//             <input type="submit" className="button" value="Signup" />
//           </form>

//           <div className="signup">
//             <span>Already have an account?
//               <label onClick={toggleForm} style={{ cursor: 'pointer' }}>Login</label>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuthForm;


import React, { useState } from 'react';
import axios from 'axios';
import './Logins.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/actions/authActions.jsx';
// import { useHistory}  from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import  ForgotPassword  from './ForgotPassword/ForgotPass.jsx';
import { Button } from 'react-bootstrap';
function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [popup, setPopup] = useState({ visible: false, message: '', color: '' });

  const dispatch = useDispatch();
  // const history = useHistory();
  const auth = useSelector((state) => state.auth);  // Get auth state
  const navigate = useNavigate();
  // navigate('/some-route');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData({ ...loginData, [name]: value });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();  // Prevent the page reload
    navigate('/forgotPass');  // Correctly navigate to forgot password page
  };
  

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
    setPopup({ visible: true, message: `Welcome back, ${loginData.email}`, color: 'green' });

    setTimeout(() => {
      setPopup({ visible: false, message: '', color: '' });
      // history.push("/userDashboard");  // Redirect after login
      // window.location.href = "/userDashboard"; 
      navigate('/userDashboard');
    }, 3000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (user.password === user.confirmPassword) {
      try {
        // console.log("I am in ",user);

        const response = await axios.post("http://localhost:5000/api/blogs/createUser", user);
          // console.log(response);
        if (response.status === 201) {
          setUser({
            userName: "",
            email: "",
            password: "",
            confirmPassword: ""
          });

          setPopup({ visible: true, message: 'Signup successful! Redirecting to login...', color: 'green' });

          setTimeout(() => {
            setPopup({ visible: false, message: '', color: '' });
            setIsLogin(true); // Redirect to login form
          }, 3000);
        }
      } catch (error) {
        setPopup({ visible: true, message: 'Signup failed! Please try again.', color: 'red' });
        setTimeout(() => setPopup({ visible: false, message: '', color: '' }), 3000);
      }
    } else {
      setPopup({ visible: true, message: 'Passwords do not match!', color: 'red' });
      setTimeout(() => setPopup({ visible: false, message: '', color: '' }), 3000);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    // history.push('/login'); // Redirect to login page after logout
    navigate('/login');
  };


  return (
    <div className='body'>
      <div className="container">
        {/* Popup for success or error */}
        {popup.visible && (
          <div className="popup" style={{ backgroundColor: popup.color }}>
            {popup.message}
          </div>
        )}

        {/* Login Form */}
        {auth.isAuthenticated ? (
          <div>
            <h2>Welcome, {auth.user.userName}</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <div className={`login form ${isLogin ? 'active' : ''}`}>
              <header>Login</header>
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
               <Link to="/forgotPassword" onClick={handleForgotPassword}>Forgot password?</Link>
                <input type="submit" className="button" value="Login" />
              </form>
           
              <div className="signup">
                <span>Don't have an account?
                  <label onClick={toggleForm} style={{ cursor: 'pointer' }}>Signup</label>
                </span>
              </div>
            </div>

            {/* Registration Form */}
            <div className={`registration form ${!isLogin ? 'active' : ''}`}>
              <header>Signup</header>
              <form onSubmit={handleSignup}>
                <input
                  onChange={handleChange}
                  type="text"
                  name="userName"
                  value={user.userName}
                  placeholder="Enter your name"
                  required
                />
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  value={user.email}
                  placeholder="Enter your email"
                  required
                />
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  value={user.password}
                  placeholder="Create a password"
                  required
                />
                <input
                  onChange={handleChange}
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  placeholder="Confirm your password"
                  required
                />
                <input type="submit" className="button" value="Signup" />
              </form>

              <div className="signup">
                <span>Already have an account?
                  <label onClick={toggleForm} style={{ cursor: 'pointer' }}>Login</label>
                </span>
              </div>
            </div>
          </>
        )}
      </div>
     
    </div>
  );
}

export default AuthForm;
