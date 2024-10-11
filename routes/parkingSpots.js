import { Router } from "express";
import admin from "firebase-admin";

const router = Router();

// Route to fetch all parking spots
router.get("/", async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection("parkingSpots").get();
    const parkingSpots = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(parkingSpots);
  } catch (error) {
    res.status(500).send("Error fetching parking spots: " + error.message);
  }
});

// Add more parking spot-related routes here (e.g., create, update, delete)

export default router;
