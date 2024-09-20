// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const blogRoutes = require('./routes/blogRoutes');
// const { errorHandler } = require('./middlewares/errorMiddleware');
// const bodyParser  = require('body-parser');
// const cors = require('cors')

// dotenv.config();
// connectDB();
// const cloudinary = require('./config/cloudinaryConfig.js');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/api/blogs', blogRoutes);


// // Error Handling Middleware
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io'); 
const cloudinary = require('./config/cloudinaryConfig.js');
const Comment = require('./models/BlogCommentModel.js');
const { workerData } = require('worker_threads');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/api/blogs', blogRoutes);


app.use(errorHandler);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for new comments
  socket.on('addComment', (commentData) => {
    console.log("addComment",commentData)
    const { user, comments } = commentData;

    // Emit the 'commentAdded' event to all connected clients
    io.emit('commentAdded', {
      user,
      comments,
    });

    // Optionally save the comment to the database here if needed
    const data = {
      user,
      comments
    }
      console.log("data",workerData)
     const com = new Comment(data);
      com.save();
    console.log(`New comment on blog ${user}: ${comments}`);
  });
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});



const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

