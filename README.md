# Student Teacher Booking Appointment System

A web-based appointment scheduling system that allows students to book appointments with teachers. The system is built using **HTML, CSS, JavaScript, and Firebase**.

---

## Roles & Permissions

### 👩‍💻 Admin
- Manage teachers by adding their details (saved in Firestore).
- Approve or reject registered students.

### 👨‍🏫 Teacher
- Schedule appointments with details like **date, time, subject, and meeting type**.
- View appointment requests from students (including student name, message, and time slot).
- Approve or reject appointment requests (updates stored in Firestore).

### 👩‍🎓 Student
- Register with details like **name and parent’s name**.
- Search for teachers and view available schedules.
- Book appointments and request a slot.
- Attend approved meetings to ask questions or clear doubts.

---

## Features
- **Login & Registration** (Students, Teachers, and Admin via Firebase Authentication).
- **Admin Dashboard**: Manage teachers and approve student registrations.
- **Teacher Dashboard**: Schedule appointments, view requests, approve/reject bookings.
- **Student Dashboard**: Register, browse teacher schedules, and request appointments.
- Real-time database updates using **Firebase Firestore**.

---


How to run the project?
In the firebase.js make sure you have the following configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

