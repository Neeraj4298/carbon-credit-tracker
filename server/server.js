const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs');

dotenv.config();
const app = express();

// Updated CORS configuration
app.use(cors({
  origin: '*',  // Allow all origins in development/testing
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Enable pre-flight requests for all routes
app.options('*', cors());

app.use(express.json());

// DB connection
connectDB();

// API health check route
app.get('/api/health', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/trips', require('./routes/tripRoutes'));

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'client/build');
  console.log('Serving static files from:', clientBuildPath);
  
  app.use(express.static(clientBuildPath));
  
  app.get('*', (req, res) => {
    const indexPath = path.join(clientBuildPath, 'index.html');
    console.log('Attempting to serve:', indexPath);
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.error('index.html not found at:', indexPath);
      res.status(404).send('Frontend build not found');
    }
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
