const express = require("express");
const { internModel } = require("./db");

const internRouter = express.Router();

// Add a new internship or opportunity
internRouter.post("/add", async (req, res) => {
    try {
        const { type, title, companyOrOrganizer, url } = req.body;

        if (!type || !title || !url) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newOpportunity = new internModel({
            type,
            title,
            companyOrOrganizer: companyOrOrganizer || "N/A", // Default if missing
            url, // Store the URL
            location: "N/A", // Default location
            description: "No description available" // Default description
        });

        await newOpportunity.save();

        res.status(201).json({ message: "Event added successfully!", newOpportunity });
    } catch (error) {
        console.error("Error adding event:", error);
        res.status(500).json({ error: "Failed to add event" });
    }
});

// Get all internships or opportunities
internRouter.get("/all", async (req, res) => {
    try {
        const { type } = req.query;
        const query = type ? { type } : {}; // Filter by type if provided
        const opportunities = await internModel.find(query);
        res.status(200).json(opportunities);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch opportunities", details: error.message });
    }
});

module.exports = internRouter;
