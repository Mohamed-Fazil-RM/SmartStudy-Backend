// server.js (Main backend entry file for React Native app)

const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const loginroute=require('./router/Login')
const resourceroute=require('./router/Resouce')
const signuproute=require('./router/Signup')
const Accountrouter=require('./router/Account');
const { logger } = require("./middleware/Handlelogs");


// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
// Models
// const User = require("./models/User");
// const SearchLog = require("./models/SearchLog");
// const Usage = require("./models/Usage");

// // ROUTES START

// // User Registration/Login (local or Google)
// app.post("/api/auth/login", async (req, res) => {
//   const { email, password, googleId } = req.body;
//   try {
//     console.log(req.body)
//     let user = await User.findOne({ email });

//     if (!user) {
//       user = new User({ email, password, googleId, loginHistory: [] });
//     } else {
//       user.password = password || user.password;
//       user.googleId = googleId || user.googleId;
//     }

//     user.loginHistory.push(new Date());
//     await user.save();
//     res.json({ success: true, user });
//   } catch (error) {
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// // Get All Users (Admin Dashboard)
// app.get("/api/admin/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Could not fetch users" });
//   }
// });

// // Search Resourceroute Handler
// app.post("/api/search", async (req, res) => {
//   const { query } = req.body;
//   const mockData = ["math_notes.pdf", "science_notes.pdf"];
//   const result = mockData.filter((item) => item.includes(query.toLowerCase()));

//   await SearchLog.create({ query, timestamp: new Date() });
//   res.json({ results: result });
// });



// // App Usage Timing
// app.post("/api/usage", async (req, res) => {
//   const { userId, startTime, endTime } = req.body;
//   try {
//     await Usage.create({ userId, startTime, endTime });
//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to log usage" });
//   }
// });

// // Profile Management
// app.put("/api/profile/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const updates = req.body;
//   try {
//     const user = await User.findByIdAndUpdate(userId, updates, { new: true });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Profile update failed" });
//   }
// });

// app.get("/api/profile/:userId", async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const user = await User.findById(userId);
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch profile" });
//   }
// });

// // ROUTES END
app.use(logger)
app.use('/api',loginroute,resourceroute,signuproute)
app.use('/auth',Accountrouter)

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
