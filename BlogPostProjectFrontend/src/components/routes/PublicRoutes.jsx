// src/routes/PublicRoutes.js
import React from 'react';
import { Route,useRoutes } from 'react-router-dom';
import Navbar from '../Home.jsx';
import AuthForm from '../Login.jsx';
import ForgotPassword from '../ForgotPassword/ForgotPass.jsx';
import { MainLayout } from '../../layout/MainLayout.jsx';
import UserHomePage from '../User/UserHome.jsx';
import BlogForm from '../newpost/NewPost.jsx';
import BlogPage from '../Blogs/BlogPage.jsx';
import UserBlogPage from '../UserBlogs/UserBlogs.jsx';
import Footer from '../Footer/Footer.jsx';
import AboutPage from '../About/AboutPage.jsx';
import ContactPage from '../Contact/Contact.jsx';
import HomePage from '../User/UserHome.jsx';
import FullBlogPage from '../FullBlog/FullBlogs.jsx';

const PublicRoutes = () => {

    const list = {
        path: "/",
        element:<MainLayout />,
        children: [
         { path: '/login', element: <AuthForm /> },
          { path: '/forgotpass', element: <ForgotPassword /> },
          { path: '/userDashboard', element: <UserHomePage /> },
          { path: '/yourBlogs', element: <BlogForm /> },
          {path:'/AllBlogs', element: <BlogPage /> },
         {path:'/UserBlogs', element: <UserBlogPage />},
         {path:'/About', element: <AboutPage />},
         {path:'/Contact', element: <ContactPage />},
         { path: '/blogs/:id', element: <FullBlogPage /> },
         {path:'/',element:<HomePage />}
        ],
       }
      
       return useRoutes([list]);
};

export default PublicRoutes;



// import React, { Suspense, lazy } from 'react';
// import { useRoutes } from 'react-router-dom';
// import { MainLayout } from '../../layout/MainLayout.jsx';
// import Footer from '../Footer/Footer.jsx';


// const Navbar = lazy(() => import('../Home.jsx'));
// const AuthForm = lazy(() => import('../Login.jsx'));
// const ForgotPassword = lazy(() => import('../ForgotPassword/ForgotPass.jsx'));
// const UserHomePage = lazy(() => import('../User/UserHome.jsx'));
// const BlogForm = lazy(() => import('../newpost/NewPost.jsx'));
// const BlogPage = lazy(() => import('../Blogs/BlogPage.jsx'));
// // import BlogPage from '../Blogs/BlogPage.jsx';
// const UserBlogPage = lazy(() => import('../UserBlogs/UserBlogs.jsx'));
// const AboutPage = lazy(() => import('../About/AboutPage.jsx'));
// const ContactPage = lazy(() => import('../Contact/Contact.jsx'));
// const HomePage = lazy(() => import('../User/UserHome.jsx'));
// const FullBlogPage = lazy(() => import('../FullBlog/FullBlogs.jsx'));

// const PublicRoutes = () => {

//     const list = {
//         path: "/",
//         element: <MainLayout />,
//         children: [
//           { path: '/login', element: <AuthForm /> },
//           { path: '/forgotpass', element: <ForgotPassword /> },
//           { path: '/userDashboard', element: <UserHomePage /> },
//           { path: '/yourBlogs', element: <BlogForm /> },
//           { path: '/AllBlogs', element: <BlogPage /> },
//           { path: '/UserBlogs', element: <UserBlogPage /> },
//           { path: '/About', element: <AboutPage /> },
//           { path: '/Contact', element: <ContactPage /> },
//           { path: '/blogs/:id', element: <FullBlogPage /> },
//           { path: '/', element: <HomePage /> },
//         ],
//     };

//     // Wrapping with Suspense for fallback UI
//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             {useRoutes([list])}
//         </Suspense>
//     );
// };

// export default PublicRoutes;
