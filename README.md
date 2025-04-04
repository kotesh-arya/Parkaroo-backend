# Parkaroo Backend

Parkaroo is a parking space discovery and management application that connects drivers with nearby available parking spaces, including private spaces listed by homeowners.

This repository contains the **backend server** of the Parkaroo application built using **Node.js**, **Express**, and **Firebase Firestore**.

---

## Features Implemented

### 1. **Authentication**
- Firebase Authentication is used to manage user sign-up and sign-in.
- Authenticated users are assigned roles (`driver` or `owner`).
- Role-based access is enabled.

### 2. **User Roles**
- **Drivers** can view nearby parking spots.
- **Owners** can view and manage parking spots they have listed.

### 3. **Parking Spot Management**
- Owners can:
  - Add a new parking spot.
  - View a list of their added parking spots.
- Data is stored in **Firestore**, organized by collections for users and parking spots.

### 4. **API Endpoints**
- `POST /api/parking-spots`: Add a new parking spot (Owners only).
- `GET /api/parking-spots?ownerId=<ownerId>`: Get all parking spots listed by an owner.
- `GET /api/nearby-spots?lat=<lat>&lng=<lng>`: Get nearby parking spots for drivers (to be expanded with geolocation logic).

### 5. **Cloud Functions Integration**
- Plans are in place to use **Firebase Cloud Functions** to handle secure database operations from the backend.
- This will abstract Firestore logic from the frontend and enforce validation/security at the backend layer.

---

## Tech Stack

- **Backend Framework**: Node.js + Express
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Hosting**: AWS EC2
- **Deployment**: Nginx reverse proxy for serving backend API

---

## Folder Structure

```
parkaroo-backend/
├── controllers/
│   └── parkingController.js
├── routes/
│   └── parkingRoutes.js
├── services/
│   └── firebaseService.js
├── app.js
├── server.js
└── README.md
```

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/parkaroo-backend.git
   cd parkaroo-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase credentials**
   - Add your Firebase service account key file.
   - Create a `.env` file and configure the following:
     ```
     FIREBASE_PROJECT_ID=your-project-id
     FIREBASE_CLIENT_EMAIL=your-service-account-email
     FIREBASE_PRIVATE_KEY="your-private-key"
     ```

4. **Run the server**
   ```bash
   npm start
   ```

---

## To Do (Upcoming Features)

- [ ] Implement Firebase Cloud Functions for secure database access.
- [ ] Add geolocation support to fetch nearby parking spots.
- [ ] Add update and delete functionality for parking spots.
- [ ] Enhance role-based middleware for route protection.
- [ ] Integrate booking functionality for drivers.

---



