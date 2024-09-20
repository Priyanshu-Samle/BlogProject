
// import './App.css'

// import Navbar from './components/Home'
// import CardComponent from './components/Cards'
// import AuthForm from './components/Login.jsx'
// import BlogForm from './components/newpost/NewPost.jsx';
// import UserHomePage from './components/User/UserHome.jsx';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// function App() {
 

//   return (
//     <Router>

//     <>
//     <Routes>
//       <Route path='/' element = {<Navbar />} />
//       <Route path="/login" element={<AuthForm />} />
//       <Route path="/newpost" element={<BlogForm />} />
//       <Route path='/userDashboard' element={<UserHomePage />}/>
//     </Routes>
//     </>
//     </Router>
//   )
// }

// export default App


// import React from 'react';
// import Navbar from './components/Home';
// import CardComponent from './components/Cards';
// import AuthForm from './components/Login.jsx';
// import BlogForm from './components/newpost/NewPost.jsx';
// import UserHomePage from './components/User/UserHome.jsx';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import  ForgotPassword  from './components/ForgotPassword/ForgotPass.jsx';
// import { useSelector } from 'react-redux';

// function App() {
//   const auth = useSelector((state) => state.auth);  // Get authentication state from Redux

//   // Protected route component
//   const ProtectedRoute = ({ element }) => {
//     return auth.isAuthenticated ? element : <Navigate to="/login" />;
//   };

//   return (
//     <Router>
//       <>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Navbar />} />

//           <Route path="/login" element={<AuthForm />} />

//           {/* Protected Routes */}
//           <Route path="/newpost" element={<ProtectedRoute element={<BlogForm />} />} />
//           <Route path="/userDashboard" element={<ProtectedRoute element={<UserHomePage />} />} />
//           <Route path="/forgotPass" element={<ForgotPassword />} />
         

//         </Routes>
//       </>
//     </Router>
    
//   );
// }

// export default App;
// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, BrowserRouter as Router, Routes } from 'react-router-dom';
import PublicRoutes from './components/routes/PublicRoutes.jsx';
import ProtectedRoutes from './components/routes/ProtectedRoutes.jsx';
import authReducer from './redux/reducers/authReducer.jsx';
import { useSelector, useDispatch } from 'react-redux';
import AuthForm from './components/Login.jsx';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log("author",isAuthenticated );
// console.log()
  return (
    <BrowserRouter basename="/" >
    <PublicRoutes/>
    </ BrowserRouter>
  );
}

export default App;
