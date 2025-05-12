const { Router } = require("express");
const { notificationModel } = require("./db"); // Ensure correct import

const notificationRouter = Router();

notificationRouter.get("/notifications", async (req, res) => {
  try {
    const notifications = await notificationModel.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

notificationRouter.post("/notifications", async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: "Data is required" });

    const newNotification = new notificationModel({ data });
    await newNotification.save();

    res.status(201).json({ message: "Notification added successfully", notification: newNotification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = notificationRouter;
