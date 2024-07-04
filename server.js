const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Protected route example
const auth = require('./middleware/auth');
app.get('/protected', auth(['user', 'admin']), (req, res) => {
    res.send({ message: `Hello ${req.user.role}` });
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
    .catch(err => console.error(err));
