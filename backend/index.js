const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./login');
const cors = require("cors");
const adminRouter = require('./admin');
const clubRouter = require('./club');
const alumniRouter = require('./alumni');
const internRouter = require("./intern");
const scheduleRouter = require('./schedule');
const notificationRouter = require('./notification');
const app = express();
app.use(express.json());  
app.use(cors());
app.use("/api/user", UserRouter);  
app.use("/api/admin", adminRouter);
app.use("/api/clubs", clubRouter);
app.use("/api/alumni", alumniRouter);
app.use("/api/intern", internRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/noti", notificationRouter);


async function main() {
    try {
        await mongoose.connect("mongodb+srv://r210387:tdUaskqu2m4lrFKI@cluster0.zpvznpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log('Connected to MongoDB');

        app.listen(3000, () => {
            console.log('Server running on http://localhost:3000');
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
}
main();