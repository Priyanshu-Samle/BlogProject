const Blog = require('../models/blogModel');
const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js')
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinaryConfig.js');
const multer = require('multer');
const ContactForm = require('../models/contactFormModel.js');
const Comment = require('../models/BlogCommentModel.js')
const Likes = require('../models/likesBlogsModel.js')
const storage = multer.memoryStorage(); // Store file in memory buffer
const upload = multer({ storage: storage });



const createBlog = async (req, res) => {
   try {

      // Extract blog details from request body
      const { title, content, category, tags } = req.body;

      if (!req.file) {
         return res.status(400).json({ error: 'No file uploaded.' });
      }

      console.log("File info: ", req.file);

      // Create a promise for Cloudinary upload
      const uploadPromise = new Promise((resolve, reject) => {
         const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'blogImages', use_filename: true },
            (error, result) => {
               if (error) {
                  return reject(error);
               }
               resolve(result);
            }
         );
         uploadStream.end(req.file.buffer);
      });

      // Await the result of the upload
      const result = await uploadPromise;

      // Prepare blog data
      const blogData = {
         title,
         content,
         category,
         tags,
         image: result.secure_url, // Cloudinary image URL
         user: req.user._id,
      };

      // Save blog data to database
      const blog = new Blog(blogData);
      const data = await blog.save();

      // Send success response
      res.status(201).json({ message: 'Blog created successfully', data });
   } catch (error) {
      console.error("Error creating blog: ", error);
      res.status(500).json({ error: 'Failed to create blog' });
   }
};


const userCreate = async (req, res) => {
   // console.log("Hello ", req.body);
   const { userName, email, password } = req.body;
   try {

      const token = generateToken(email);
      const user = new User({ userName, email, password, token });
      const data = await user.save();
      console.log("Tokens is ", token);
      console.log("Data is ", data);
      res.status(201).json(data);

   } catch (error) {
      console.log("Error is ", error);
      res.status(500).json(error);
   }
}



const verifyToken = async (req, res, next) => {
   let token;
   // console.log("I am in verify t")
   //   console.log("I am here now token ");
   //   console.log("token",req.headers)
   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
         token = req.headers.authorization.split(' ')[1];
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         const user = await User.findOne({ email: decoded.id }).select('-password');
         res.status(200).json({ user })
      } catch (error) {

         res.status(401).json({ message: 'Not authorized, token failed' });
      }
   }

   if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
   }
};

const loginUser = async (req, res) => {
   const { email, password } = req.body;

   try {
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(400).json({ message: "User does not exist" });
      }

      // Verify password
      const isPasswordMatch = await user.comparePassword(password); // Assuming you have a password hashing mechanism

      if (!isPasswordMatch) {
         return res.status(400).json({ message: "Invalid password" });
      }

      // Generate token if user is valid
      const token = generateToken(user.email);

      // Save token to the user model
      user.token = token;
      await user.save();

      // Respond with user data and token
      res.status(200).json({
         message: "Login successful",
         token: token,
         user: {
            userName: user.userName,
            email: user.email,
         }
      });
   } catch (error) {
      console.log("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
   }
};


const forgotPassward = async (req, res) => {
   const { email, password } = req.body;

   try {
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(400).json({ message: "User does not exist" });
      }

      // Verify password
      // const isPasswordMatch = await user.comparePassword(password); // Assuming you have a password hashing mechanism

      // if (!isPasswordMatch) {
      //    return res.status(400).json({ message: "Invalid password" });
      // }

      // Generate token if user is valid
      const token = generateToken(user.email);

      // Save token to the user model
      user.token = token;
      user.password = password;
      await user.save();

      // Respond with user data and token
      res.status(200).json({
         message: "Password Change successful",
         token: token,
         user: {
            userName: user.userName,
            email: user.email,
         }
      });
   } catch (error) {
      // console.log("Error during forgotpassword:", error);
      res.status(500).json({ message: "Internal server error" });
   }
};


const fetchData = async (req, res) => {
   const { email, password, token } = req.body;
   // console.log("email is ", email);
   try {
      // Find the user by email
      const user = await User.findOne({ token });

      if (!user) {
         return res.status(400).json({ message: "User does not exist" });
      }

      // Verify password
      // const isPasswordMatch = await user.comparePassword(password); // Assuming you have a password hashing mechanism

      // if (!isPasswordMatch) {
      //    return res.status(400).json({ message: "Invalid password" });
      // }

      // Generate token if user is valid
      // const token = generateToken(user.email);

      // Save token to the user model
      // user.token = token;
      // await user.save();

      // Respond with user data and token
      res.status(200).json({
         message: "Login successful",
         token: token,
         user: {
            userName: user.userName,
            email: user.email,
         }
      });
   } catch (error) {
      console.log("Error during fetch data:", error);
      res.status(500).json({ message: "Internal server error" });
   }
};

const fetchBlogs = async (req, res) => {
   try {

      const { page, limit } = req.query;
      const skip = (page - 1) * limit;
      const totalBlogs = await Blog.countDocuments();

      const blogs = await Blog.find().skip(skip).limit(limit);
      const totalPages = Math.ceil(totalBlogs / limit);
      res.status(201).json({ data: blogs, totalPages: totalPages, });
   } catch (error) {
      res.status(500).json({ message: "Someting went wrong" })
   }
}

const fetchUSerBlogs = async (req, res) => {

   try {
      const data = await Blog.aggregate([
         {
            $match: {
               user: req.user._id
            }
         }
      ]);

      console.log("User blog data is ", data);
      res.status(201).json({ data: data });
   } catch (error) {
      console.log("Iam in error ", error);
      res.status(500).json({ message: "Some thing went wrong" });
   }
}

const contactForm = async (req, res) => {
   try {

      const data = new ContactForm(req.body);
      const save = await data.save();
      console.log("Save is ", save);
      res.status(200).json({ data: save });
   } catch (error) {
      res.status(500).json({ error: error });
   }
}


const getBlogById = async (req, res) => {
   try {
      const id = req.params.id;
      // console.log("Blog id is", id);
      const data = await Blog.findOne({ _id: id });

      //   console.log("By id blog is ", data);
      res.status(200).json(data);
   } catch (error) {
      console.log("error is come", error);
      res.status(500).json({ message: error });
   }
}

const createComment = async (req, res) => {
   try {
      const id = req.params.id;
      const { comments } = req.body;
      const data = {
         comments,
         user: id
      }

      const comm = new Comment(data);
      const save = await comm.save();
      res.status(200).json(save);

   } catch (error) {
      res.status(500).json(error);
   }
}

const getComment = async (req, res) => {
   try {

      console.log("I am in get comment");
      const comments = await Comment.find({ user: req.params.id });
      console.log("Comments is ", comments);
      res.json(comments);
   } catch (error) {
      res.status(500).send('Error fetching comments');
   }
}

const toggleLike = async (req, res) => {
   try {
      const { userId, blogId } = req.body;

      const existingLike = await Likes.findOne({ blogId, userId });
      console.log("ExistinLike", existingLike);
      if (existingLike) {
         await Likes.deleteOne({ _id: existingLike._id });
         const likeCount = await Likes.countDocuments({ blogId });
         req.io.emit('likeUpdated', { blogId, likeCount });
         return res.status(200).json({ message: 'Like removed', likeCount });
      } else {
         // If the user hasn't liked the blog, add a new like
         const newLike = new Likes({ blogId, userId });
         await newLike.save();
         const likeCount = await Likes.countDocuments({ blogId });
         req.io.emit('likeUpdated', { blogId, likeCount });
         return res.status(200).json({ message: 'Like added', likeCount });
      }
   } catch (error) {
      console.error('Error toggling like:', error);
      return res.status(500).json({ message: 'Internal server error' });
   }
};

const getLikeCount = async (req, res) => {
   try {
      const { blogId } = req.params;
      const likeCount = await Likes.countDocuments({ blogId });
      return res.status(200).json({ likeCount });
   } catch (error) {
      console.error('Error fetching like count:', error);
      return res.status(500).json({ message: 'Internal server error' });
   }
};


const hasUserLiked = async (req, res) => {
   try {
      const { blogId, userId } = req.params;
      console.log("BlogId ", blogId);
      console.log("userId ", userId);
      const liked = await Likes.findOne({ blogId: blogId, userId: userId });
      return res.status(200).json({ liked: !!liked });
   } catch (error) {
      console.error('Error checking if user liked blog:', error);
      return res.status(500).json({ message: 'Internal server error' });
   }
};



module.exports = { createBlog, userCreate, loginUser, forgotPassward, fetchData, verifyToken, upload, fetchBlogs, fetchUSerBlogs, contactForm, getBlogById, createComment, getComment, toggleLike, getLikeCount, hasUserLiked };
