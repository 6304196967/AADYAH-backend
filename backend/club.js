const express = require("express");
const { ClubModel } = require("./db");

const clubRouter = express.Router();

// Get all clubs
clubRouter.get("/all", async (req, res) => {
  try {
    const clubs = await ClubModel.find();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new club
clubRouter.post("/add", async (req, res) => {
  const { name, description, totalMembers, imageURL } = req.body;

  if (!name || !description || !totalMembers || !imageURL) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newClub = new ClubModel({
      name,
      description,
      totalStudents: totalMembers, // Mapping totalMembers to totalStudents
      image: imageURL
    });

    await newClub.save();
    res.status(201).json({ message: "Club added successfully", club: newClub });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

clubRouter.post("/join", async (req, res) => {
  const { clubId, userName, userBranch, userYear } = req.body;

  // Validate required fields
  if (!clubId || !userName?.trim() || !userBranch?.trim() || !userYear?.trim()) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const club = await ClubModel.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    // Prevent duplicate membership
    if (club.members.some(member => member.name === userName)) {
      return res.status(400).json({ message: "User already joined this club" });
    }

    // Add user to members array
    const newMember = { name: userName, branch: userBranch, year: userYear };
    club.members.push(newMember);

    // Update studentsByYear
    if (!club.studentsByYear[userYear]) {
      club.studentsByYear[userYear] = [];
    }
    club.studentsByYear[userYear].push(newMember);

    // Increment totalStudents count
    club.totalStudents += 1;

    await club.save();
    res.status(200).json({ message: "User joined successfully", club });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = clubRouter;
