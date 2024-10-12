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

router.get("/:ownerEmail", async (req, res) => {
  try {
    const { ownerEmail } = req.params;

    // Step 1: Find the user document using the email
    const userSnapshot = await admin
      .firestore()
      .collection("users")
      .where("email", "==", ownerEmail)
      .get();

    if (userSnapshot.empty) {
      return res.status(404).send("User not found");
    }

    const userDoc = userSnapshot.docs[0];
    const ownerId = userDoc.id;

    // Step 2: Fetch parking spots with the ownerId
    const spotsSnapshot = await admin
      .firestore()
      .collection("parkingSpots")
      .where("ownerId", "==", ownerId)
      .get();
    const parkingSpots = spotsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(parkingSpots);
  } catch (error) {
    res.status(500).send("Error fetching parking spots: " + error.message);
  }
});

router.post("/:ownerEmail", async (req, res) => {
  try {
    const { ownerEmail } = req.params;
    const newSpot = req.body;

    if (!newSpot.lat || !newSpot.lng) {
      return res.status(400).send("Latitude and Longitude are required");
    }

    // Find user by ownerEmail
    const userSnapshot = await admin
      .firestore()
      .collection("users")
      .where("email", "==", ownerEmail)
      .get();

    if (userSnapshot.empty) {
      return res.status(404).send("User not found");
    }

    const userDoc = userSnapshot.docs[0];
    const userId = userDoc.id;

    // Adding new parking spot to Firestore
    const addedSpot = await admin
      .firestore()
      .collection("parkingSpots")
      .add({
        ...newSpot,
        lat: Number(newSpot.lat),
        lng: Number(newSpot.lng),
        ownerId: userId,
      });

    res.status(200).json({
      message: "Spot added successfully",
      spotId: addedSpot.id,
      success: true,
    });
  } catch (error) {
    console.error("Error adding parking spot:", error);
    res.status(500).send("Error adding parking spot: " + error.message);
  }
});

export default router;
