// import '../Logins.css';
// import React from 'react';
//   function ForgotPassword() {


//     return (
//         <div >
//             <header>Forgot Password</header>
//             <form >
//                 <input
//                     // onChange={handleChange}
//                     type="text"
//                     name="userName"
//                     // value={user.userName}
//                     placeholder="Enter your email "
//                     required
//                 />
//                 <input
//                     // onChange={handleChange}
//                     type="password"
//                     name="password"
//                     // value={user.password}
//                     placeholder="Create a password"
//                     required
//                 />
//                 <input
//                     // onChange={handleChange}
//                     type="password"
//                     name="confirmPassword"
//                     // value={user.confirmPassword}
//                     placeholder="Confirm your password"
//                     required
//                 />
//                 <input type="submit" className="button" value="Submit" />
//             </form>

//         </div>
//     )
// }
// export default  ForgotPassword;
import React, {useState} from 'react';
import '../Logins.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ForgotPassword = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const [popup, setPopup] = useState({ visible: false, message: '', color: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
      setUser({ ...user, [name]: value });
  };


  const handleForgot = async (e) => {
    e.preventDefault();
    if (user.password === user.confirmPassword) {
      try {
        // console.log("I am in ",user);

        const response = await axios.post("http://localhost:5000/api/blogs/forgotPassword", user);
          // console.log( "response is ", response);
        if (response.status === 200) {
          setUser({
            email: "",
            password: "",
            confirmPassword: ""
          });

          // console.log("Pop is ", popup)
          setPopup({ visible: true, message: 'password change successful! Redirecting to login...', color: 'green' });
          setTimeout(() => {
            setPopup({ visible: false, message: '', color: '' });
            // setIsLogin(true); // Redirect to login form
            navigate('/login');
            
          }, 3000);
         }
      } catch (error) {
        setPopup({ visible: true, message: 'password change ! Please try again.', color: 'red' });
        setTimeout(() => setPopup({ visible: false, message: '', color: '' }), 3000);
      }
    } else {
      setPopup({ visible: true, message: 'Passwords do not match!', color: 'red' });
      setTimeout(() => setPopup({ visible: false, message: '', color: '' }), 3000);
    }


  };
  // console.log("Pop is ", popup)
  return (
    <div className='body'>

      <div className='container'>

      {popup.visible && (
          <div className="popup" style={{ backgroundColor: popup.color }}>
            {popup.message}
          </div>
        )}
        <form onSubmit={handleForgot} >

          <h2>Forgot Password</h2>
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
            placeholder="New Password"
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
          <input type="submit" className="button" value="Reset Password" />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
