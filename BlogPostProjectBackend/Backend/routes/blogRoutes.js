const express = require('express');
const router = express.Router();
const { createBlog, userCreate, loginUser, forgotPassward, fetchData,verifyToken,upload, fetchBlogs, fetchUSerBlogs, contactForm, getBlogById, createComment, getComment, toggleLike, getLikeCount, hasUserLiked } = require('../controllers/blogController');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');
const { verify } = require('jsonwebtoken');


// const upload = multer({ storage: storage });

router.post('/createBlog',protect, upload.single('image'), createBlog);

router.post('/createUser', userCreate);
router.post('/forgotPassword', forgotPassward);
router.get('/getData', fetchData);
router.get('/verifyToken',verifyToken);

router.get('/Allblogs', fetchBlogs);

router.get('/UserBlogs',protect, fetchUSerBlogs)

router.post('/login',loginUser);
router.post('/contactForm',contactForm);
router.get('/getOneBlog/:id', getBlogById)

router.post('/blogComment/:id',createComment)
router.get('/comments/:id', getComment);


router.post('/toggle',toggleLike);

router.get('/count/:blogId', getLikeCount);
router.get('/user/:blogId/:userId', hasUserLiked);

module.exports = router;
