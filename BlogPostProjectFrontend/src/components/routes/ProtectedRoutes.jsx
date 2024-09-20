// src/routes/ProtectedRoutes.js
import React from 'react';
import { Route, Navigate, useRoutes } from 'react-router-dom';
import BlogForm from '../newpost/NewPost.jsx';
import UserHomePage from '../User/UserHome.jsx';
import { useSelector } from 'react-redux';
// import { Route,useRoutes } from 'react-router-dom';
import { MainLayout } from '../../layout/MainLayout.jsx';
const ProtectedRoutes = () => {
  const auth = useSelector((state) => state.auth);  // Get authentication state from Redux

  const ProtectedRoute = ({ element }) => {
    return auth.isAuthenticated ? element : <Navigate to="/login" />;
  };
  const list = {
    path: "/",
    element:<MainLayout />,
    children: [
     { path: '/userDashboard', element: <UserHomePage /> },
      { path: '/yourBlogs', element: <BlogForm /> },
    //   {path:'/userDashboard', element: <UserHomePage /> }
    ],
   };
   return useRoutes([list]);

//   return (
//     <>
//        path="/userDashboard"  element={<UserHomePage />} 
//     </>
//   );
};

export default ProtectedRoutes;
