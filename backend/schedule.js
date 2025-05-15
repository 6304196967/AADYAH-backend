const express = require('express');
const scheduleRouter = express.Router();
const { ExamSchedule, TimeTable } = require('./db');
const multer = require('multer');
const xlsx = require('xlsx');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

// Utility function to process Excel file
const processExcelFile = (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(sheet);
  } catch (err) {
    throw new Error('Error processing Excel file');
  }
};

// Exam Schedule Endpoints

// Get exam schedule by year and branch
scheduleRouter.get('/exam-schedule/:year/:branch', async (req, res) => {
  try {
    const schedule = await ExamSchedule.findOne({
      year: req.params.year,
      branch: req.params.branch
    });
    res.json(schedule || { exams: [] });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch exam schedule',
      error: err.message 
    });
  }
});

// Upload exam schedule from Excel
scheduleRouter.post('/upload-exam-schedule', upload.single('file'), async (req, res) => {
  try {
    const { year, branch } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const data = processExcelFile(req.file.path);
    const exams = data.map(row => ({
      subject: row['Subject Name'] || row.subject,
      subjectCode: row['Subject Code'] || row.subjectCode,
      date: new Date(row.Date || row.date),
      startTime: row['Start Time'] || row.startTime,
      endTime: row['End Time'] || row.endTime,
    }));

    // Clean up the uploaded file
    fs.unlinkSync(req.file.path);

    const result = await ExamSchedule.findOneAndUpdate(
      { year, branch },
      { $set: { exams } },
      { upsert: true, new: true }
    );

    res.json({ 
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to upload exam schedule',
      error: err.message 
    });
  }
});

// Update exam schedule directly
scheduleRouter.post('/update-exam-schedule', async (req, res) => {
  try {
    const { year, branch, exams } = req.body;
    
    if (!year || !branch || !exams) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const result = await ExamSchedule.findOneAndUpdate(
      { year, branch },
      { $set: { exams } },
      { upsert: true, new: true }
    );

    res.json({ 
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to update exam schedule',
      error: err.message 
    });
  }
});

// Remove exam schedule
scheduleRouter.delete('/remove-exam-schedule', async (req, res) => {
  try {
    const { year, branch } = req.body;
    
    if (!year || !branch) {
      return res.status(400).json({ success: false, message: 'Missing year or branch' });
    }

    const result = await ExamSchedule.findOneAndDelete({ year, branch });
    
    if (!result) {
      return res.status(404).json({ success: false, message: 'Schedule not found' });
    }

    res.json({ 
      success: true,
      message: 'Exam schedule removed successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to remove exam schedule',
      error: err.message 
    });
  }
});

// Time Table Endpoints

// Get timetable by year, branch and section
scheduleRouter.get('/time-table/:year/:branch/:section', async (req, res) => {
  try {
    const timetable = await TimeTable.findOne({
      year: req.params.year,
      branch: req.params.branch,
      section: req.params.section
    });
    res.json(timetable || { schedule: [] });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch timetable',
      error: err.message 
    });
  }
});

// Upload timetable from Excel
scheduleRouter.post('/upload-time-table', upload.single('file'), async (req, res) => {
  try {
    const { year, branch, section } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const data = processExcelFile(req.file.path);
    const schedule = data.map(row => ({
      day: row.Day || row.day,
      subject: row.Subject || row.subject,
      time: row.Time || row.time,
      faculty: row.Faculty || row.faculty
    }));

    // Clean up the uploaded file
    fs.unlinkSync(req.file.path);

    const result = await TimeTable.findOneAndUpdate(
      { year, branch, section },
      { $set: { schedule } },
      { upsert: true, new: true }
    );

    res.json({ 
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to upload timetable',
      error: err.message 
    });
  }
});

// Update timetable directly
scheduleRouter.post('/update-time-table', async (req, res) => {
  try {
    const { year, branch, section, schedule } = req.body;
    
    if (!year || !branch || !section || !schedule) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const result = await TimeTable.findOneAndUpdate(
      { year, branch, section },
      { $set: { schedule } },
      { upsert: true, new: true }
    );

    res.json({ 
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to update timetable',
      error: err.message 
    });
  }
});

// Remove timetable
scheduleRouter.delete('/remove-time-table', async (req, res) => {
  try {
    const { year, branch, section } = req.body;
    
    if (!year || !branch || !section) {
      return res.status(400).json({ success: false, message: 'Missing year, branch or section' });
    }

    const result = await TimeTable.findOneAndDelete({ year, branch, section });
    
    if (!result) {
      return res.status(404).json({ success: false, message: 'Timetable not found' });
    }

    res.json({ 
      success: true,
      message: 'Timetable removed successfully'
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to remove timetable',
      error: err.message 
    });
  }
});

module.exports = scheduleRouter;