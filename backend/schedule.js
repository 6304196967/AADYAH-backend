const express = require("express");
const scheduleRouter = express.Router();

// Hardcoded Exam Schedule
const examSchedule = {
  "1st": {
    "CSE": [
      { subject: "Math", date: "10-Mar-2025", time: "10:00 AM" },
      { subject: "DLD", date: "12-Mar-2025", time: "2:00 PM" },
      { subject: "P&S", date: "14-Mar-2025", time: "10:00 AM" },
      { subject: "FLAT", date: "16-Mar-2025", time: "2:00 PM" },
      { subject: "DBMS", date: "18-Mar-2025", time: "10:00 AM" },
      { subject: "DSP", date: "20-Mar-2025", time: "2:00 PM" },
      { subject: "CD", date: "22-Mar-2025", time: "10:00 AM" }
    ],
    "ECE": [
      { subject: "Physics", date: "11-Mar-2025", time: "10:00 AM" },
      { subject: "FLAT", date: "13-Mar-2025", time: "2:00 PM" },
      { subject: "DSP", date: "15-Mar-2025", time: "10:00 AM" },
      { subject: "DBMS", date: "17-Mar-2025", time: "2:00 PM" },
      { subject: "P&S", date: "19-Mar-2025", time: "10:00 AM" },
      { subject: "DLD", date: "21-Mar-2025", time: "2:00 PM" },
      { subject: "CD", date: "23-Mar-2025", time: "10:00 AM" }
    ]
  }
};

// Hardcoded Time Table
const timeTable = [
  { day: "Monday", subject: "Math", time: "9:00 AM", faculty: "Prof. Sharma" },
  { day: "Monday", subject: "Physics", time: "11:00 AM", faculty: "Dr. Singh" },
  { day: "Tuesday", subject: "DBMS", time: "2:00 PM", faculty: "Prof. Rao" },
  { day: "Wednesday", subject: "Thermodynamics", time: "10:30 AM", faculty: "Dr. Patel" },
  { day: "Thursday", subject: "DLD", time: "12:00 PM", faculty: "Prof. Reddy" },
  { day: "Friday", subject: "FLAT", time: "3:00 PM", faculty: "Dr. Kumar" },
  { day: "Friday", subject: "P&S", time: "4:30 PM", faculty: "Prof. Verma" },
  { day: "Friday", subject: "Robotics", time: "1:00 PM", faculty: "Dr. Mehta" }
];

// API to get Exam Schedule
scheduleRouter.get("/exam-schedule", (req, res) => {
  res.json(examSchedule);
});

// API to get Time Table
scheduleRouter.get("/time-table", (req, res) => {
  res.json(timeTable);
});

module.exports = scheduleRouter; // Exporting the router
