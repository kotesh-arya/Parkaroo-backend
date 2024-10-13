import { Router } from "express";
import admin from "firebase-admin";

const router = Router();

// Route to fetch all users
router.get("/", async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection("users").get();
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Error fetching users: " + error.message);
  }
});

// Route to fetch user details
router.get("/me/:userEmail", async (req, res) => {
  const { userEmail } = req.params;

  try {
    // Query Firestore to find a user with the specified email
    const userSnapshot = await admin
      .firestore()
      .collection("users")
      .where("email", "==", userEmail)
      .get();

    // Check if the user exists
    if (userSnapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract the user data
    const user = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))[0]; // Take the first user since email should be unique

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Error fetching user: " + error.message);
  }
});

// Route to create a registered user
router.post("/create-user", async (req, res) => {
  const { email, role, userId } = req.body;

  try {
    // Adding new parking spot to Firestore
    const registeredUser = await admin.firestore().collection("users").add({
      email,
      role,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: "User created successfully!",
      registeredUser,
      success: true,
    });
  } catch (error) {
    console.error("Error creating user: ", error);
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Add more user-related routes here (e.g., create, update, delete)

export default router;
