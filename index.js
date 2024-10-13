import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import userRoutes from './routes/users.js';
import parkingSpotRoutes from './routes/parkingSpots.js';
import { config } from 'dotenv';
config(); // Load environment variables from .env file

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
});

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Set up routes
app.use('/api/users', userRoutes);
app.use('/api/parkingSpots', parkingSpotRoutes);

// Example route
app.get('/api', (req, res) => {
  res.send('Hello World');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
