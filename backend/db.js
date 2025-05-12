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
  year: String,
  branch: String,
  exams: [
    {
      subject: String,
      date: String,
      time: String,
    },
  ],
});

const TimeTableSchema = new mongoose.Schema({
  day: String,
  subject: String,
  time: String,
  faculty: String,
});

const notificationSchema = new mongoose.Schema({
    data : String},
    {timestamps :true
});

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

