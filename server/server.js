const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Auth routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));
app.use('/api/employer', require('./routes/employerRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
