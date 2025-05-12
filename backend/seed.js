const mongoose = require("mongoose");
const { ClubModel } = require("./db");

const clubsData = [
  {
    name: "Coding Club",
    image: "coding.jpeg",
    description: "A club for coding enthusiasts to enhance their programming skills.",
    totalStudents: 120,
    studentsByYear: {
      E1: [{ name: "Alice", branch: "CSE" }, { name: "Bob", branch: "IT" }],
      E2: [{ name: "Charlie", branch: "ECE" }, { name: "David", branch: "EEE" }],
      E3: [{ name: "Eve", branch: "CSE" }, { name: "Frank", branch: "MECH" }],
      E4: [{ name: "Grace", branch: "CSE" }, { name: "Hank", branch: "CIVIL" }],
    },
    members: [],
  },
  {
    name: "Robotics Club",
    image: "robotics.jpg",
    description: "A club for robotics lovers to build and innovate.",
    totalStudents: 90,
    studentsByYear: {
      E1: [{ name: "Ian", branch: "ECE" }],
      E2: [{ name: "Jack", branch: "EEE" }],
      E3: [{ name: "Karen", branch: "MECH" }],
      E4: [{ name: "Leo", branch: "CIVIL" }],
    },
    members: [],
  },
  {
    name: "Cybersecurity Club",
    image: "cybersecurity.jpeg",
    description: "A club focused on ethical hacking and cybersecurity skills.",
    totalStudents: 75,
    studentsByYear: {
      E1: [{ name: "Mike", branch: "CSE" }],
      E2: [{ name: "Nancy", branch: "IT" }],
      E3: [{ name: "Oscar", branch: "ECE" }],
      E4: [{ name: "Paul", branch: "EEE" }],
    },
    members: [],
  },
  {
    name: "AI ML Club",
    image: "ai_ml.jpeg",
    description: "A club for coding enthusiasts to enhance their programming skills.",
    totalStudents: 120,
    studentsByYear: {
      E1: [{ name: "Alice", branch: "CSE" }, { name: "Bob", branch: "IT" }],
      E2: [{ name: "Charlie", branch: "ECE" }, { name: "David", branch: "EEE" }],
      E3: [{ name: "Eve", branch: "CSE" }, { name: "Frank", branch: "MECH" }],
      E4: [{ name: "Grace", branch: "CSE" }, { name: "Hank", branch: "CIVIL" }],
    },
    members: [],
  },
];

async function seedDB() {
  try {
    await mongoose.connect("mongodb+srv://admin:M8Ka9GxEjWaNb9kl@cluster0.lphgo.mongodb.net/aadhya");
    console.log("Connected to MongoDB");

    await ClubModel.deleteMany(); // Clear existing data
    await ClubModel.insertMany(clubsData);

    console.log("Club data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDB();
