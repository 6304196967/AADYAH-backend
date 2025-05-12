const express = require("express");
const { aConnectModel } = require("./db"); // Ensure the path is correct

const alumniRouter = express.Router();

// 📌 Add Alumni Post
alumniRouter.post("/add", async (req, res) => {
    try {
        const { title, description } = req.body;
        const newAlumni = new aConnectModel({ title, description });
        await newAlumni.save();
        res.status(201).json({ message: "Alumni entry created successfully", newAlumni });
    } catch (error) {
        res.status(500).json({ error: "Failed to create alumni entry", details: error.message });
    }
});

// 📌 Get All Alumni Posts with Replies
alumniRouter.get("/all", async (req, res) => {
    try {
        const alumni = await aConnectModel.find();
        res.status(200).json(alumni);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch alumni entries", details: error.message });
    }
});

// 📌 Add a Reply to an Alumni Post
alumniRouter.post('/reply', async (req, res) => {
    try {
        const { messageId, text, respondedBy } = req.body;

        const message = await aConnectModel.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        // Ensure replies array exists
        if (!message.replies) {
            message.replies = [];
        }

        // Add new reply
        message.replies.push({ text, respondedBy, date: new Date() });
        await message.save();

        res.status(201).json({ message: 'Reply added successfully', message });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add reply', details: error.message });
    }
});


module.exports = alumniRouter;
