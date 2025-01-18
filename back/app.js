require("dotenv").config();
const express = require("express");
const passport = require("passport");

// Routers
const authRouter = require("./routers/authRoutes");

// Initialize express app
const app = express();

// Middleware setup
app.use(express.json);

require("./auth/passport");
app.use(passport.initialize());

app.use("/api", authRouter);

// Server running
const PORT = process.env.SERVER_PORT || 5678;
app.listen(PORT, () => console.log("Running on port", PORT + "..."));
