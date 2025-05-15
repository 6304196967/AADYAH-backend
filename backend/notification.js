const { Router } = require("express");
const { notificationModel } = require("./db");
const multer = require("multer");
const path = require("path");
const { TiLeaf } = require("react-icons/ti");

const notificationRouter = Router();

// Configure multer to handle file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * GET all notifications (sorted by newest)
 */
notificationRouter.get("/notifications", async (req, res) => {
  try {
    const notifications = await notificationModel.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

notificationRouter.post("/notifications", upload.single("image"), async (req, res) => {
  try {
    const { title, description, username, role } = req.body; // Change sentBy to username

    if (!title || !description || !username || !role) {
      return res.status(400).json({ error: "Title, description, username and role are required" });
    }

    let imageBase64 = null;
    if (req.file) {
      imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }
    console.log(title, description, username, role, imageBase64);
    const newNotification = new notificationModel({
      title,
      description,
      sentBy: username, // Map username to sentBy
      role,
      imageBase64,
      createdAt: new Date()
    });
     console.log("here");
    await newNotification.save();
   
    res.status(201).json({
      message: "Notification added successfully",
      notification: newNotification
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

notificationRouter.delete("/notifications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await notificationModel.findByIdAndDelete(id);
    
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.json({
      message: "Notification deleted successfully",
      notification
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = notificationRouter;