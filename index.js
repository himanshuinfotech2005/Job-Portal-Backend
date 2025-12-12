import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import applicationRoute from "./routs/application.route.js";
import companyRoute from "./routs/company.route.js";
import jobRoute from "./routs/job.route.js";
import userRoute from "./routs/user.route.js";
import connectDB from "./utils/db.js";

dotenv.config();

const app = express();

// ----------------------
// Correct CORS setup
// ----------------------

const allowedOrigins = [
  "https://job-portal-omega-black.vercel.app", // your Vercel deployed frontend
  "http://localhost:5173"                      // dev frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow server-to-server or no origin (like Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ BLOCKED BY CORS:", origin);
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
// handle preflight requests
app.options("*", cors(corsOptions));

// ----------------------
// Middlewares
// ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ----------------------
// API Routes
// ----------------------
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// ----------------------
// Start Server
// ----------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
