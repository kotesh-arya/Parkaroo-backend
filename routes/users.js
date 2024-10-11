import { Router } from 'express';
import admin from 'firebase-admin';

const router = Router();

// Route to fetch all users
router.get('/', async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('users').get();
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error fetching users: ' + error.message);
  }
});

// Add more user-related routes here (e.g., create, update, delete)

export default router;
