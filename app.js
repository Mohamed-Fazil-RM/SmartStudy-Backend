// server.js (Main backend entry file for React Native app)

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("Mongo Error:", err));

// Models
const User = require("./models/User");
const Task = require("./models/Task");
const SearchLog = require("./models/SearchLog");
const Usage = require("./models/Usage");

// ROUTES START

// User Registration/Login (local or Google)
app.post("/api/auth/login", async (req, res) => {
  const { email, password, googleId } = req.body;
  try {
    console.log(req.body)
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, password, googleId, loginHistory: [] });
    } else {
      user.password = password || user.password;
      user.googleId = googleId || user.googleId;
    }

    user.loginHistory.push(new Date());
    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Get All Users (Admin Dashboard)
app.get("/api/admin/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch users" });
  }
});

// Search Resource Handler
app.post("/api/search", async (req, res) => {
  const { query } = req.body;
  const mockData = ["math_notes.pdf", "science_notes.pdf"];
  const result = mockData.filter((item) => item.includes(query.toLowerCase()));

  await SearchLog.create({ query, timestamp: new Date() });
  res.json({ results: result });
});



// App Usage Timing
app.post("/api/usage", async (req, res) => {
  const { userId, startTime, endTime } = req.body;
  try {
    await Usage.create({ userId, startTime, endTime });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to log usage" });
  }
});

// Profile Management
app.put("/api/profile/:userId", async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Profile update failed" });
  }
});

app.get("/api/profile/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// ROUTES END

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// NOTE TO FRONTEND:
// - Integrate Google Login using token and store googleId/email
// - Send request from app login to /api/auth/login
// - Send search bar request to /api/search
// - Update planner tasks via /api/tasks
// - Fetch dashboard stats from /api/tasks/statistics
// - Track app open/close via /api/usage
// - Handle profile with /api/profile

