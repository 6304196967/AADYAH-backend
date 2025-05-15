const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    
    username : String,
    email : {type: String, required :true, unique : true},
    password : String,
    role : String
});

const ReplySchema = new mongoose.Schema({
    content: String,
    user: String,
    timestamp: { type: Date, default: Date.now }
});
  
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    user: String,
    timestamp: { type: Date, default: Date.now },
    replies: [ReplySchema] // ✅ Make sure replies is an array
});

const clubSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, 
    description: { type: String, required: true },
    totalStudents: { type: Number, default: 0 }, 
    studentsByYear: { type: Object, default: {} },
    members: { type: Array, default: [] } 
  });

const SchedulSchema = new mongoose.Schema({
    year : String,
    branch : String
});

const alumniConnectSchema = new mongoose.Schema({
    title : String,
    description: String,
    replies: [
        {
          text: String,
          respondedBy: String, 
          date: { type: Date, default: Date.now }
        }]
})

const internSchema = new mongoose.Schema({
    type: { type: String, enum: ["job", "hackathon", "internship"], required: true },
    title: { type: String, required: true },
    companyOrOrganizer: { type: String, required: true },
    location: { type: String },
    description: { type: String }
});

const ExamScheduleSchema = new mongoose.Schema({
  year: { type: String, required: true, enum: ['1st', '2nd', '3rd', '4th'] },
  branch: { type: String, required: true, enum: ['CSE', 'ECE', 'EEE', 'MECH','CIVIL','MME','CHEM'] },
  exams: [{
    subject: { type: String, required: true },
    subjectCode: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }
  }]
}, { timestamps: true });

const TimeTableSchema = new mongoose.Schema({
  year: { type: String, required: true, enum: ['1st', '2nd', '3rd', '4th'] },
  branch: { type: String, required: true, enum: ['CSE', 'ECE', 'EEE', 'MECH','CIVIL','MME','CHEM'] },
  section: { type: String, required: true, enum: ['A', 'B', 'C','D','E'] },
  schedule: [{
    day: { type: String, required: true, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
    subject: { type: String, required: true },
    time: { type: String, required: true },
    faculty: { type: String, required: true }
  }]
}, { timestamps: true });

const notificationSchema = new mongoose.Schema({
  sentBy: { type: String, required: true },
  role: { type: String, required: true },
title: { type: String, required: true },
  description: { type: String, required: true },
  imageBase64: { type: String }, // Base64 encoded image
  createdAt: { type: Date, default: Date.now }}
);

const ExamSchedule = mongoose.model("ExamSchedule", ExamScheduleSchema);
const TimeTable = mongoose.model("TimeTable", TimeTableSchema);
const notificationModel = mongoose.model("notification",notificationSchema);
const internModel = mongoose.model("Opportunity", internSchema);
const aConnectModel = mongoose.model('alumni', alumniConnectSchema);
const UserModel = mongoose.model('users', UserSchema);
const PostModel = mongoose.model('posts', postSchema);
const ClubModel = mongoose.model('clubs', clubSchema);
const schemaModel = mongoose.model('schedule', SchedulSchema);

module.exports = {
    UserModel : UserModel,
    PostModel : PostModel,
    ClubModel : ClubModel,
    aConnectModel: aConnectModel,
    internModel : internModel,
    schemaModel : schemaModel,
    ExamSchedule : ExamSchedule,
    TimeTable : TimeTable,
    notificationModel : notificationModel

};

