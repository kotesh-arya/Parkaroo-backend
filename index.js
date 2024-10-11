import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import userRoutes from './routes/users.js';
import parkingSpotRoutes from './routes/parkingSpots.js';

// Initialize the app with the service account
const serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'));
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// Middleware to parse JSON
app.use(bodyParser.json());

// Set up routes
app.use('/users', userRoutes);
app.use('/parkingSpots', parkingSpotRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
