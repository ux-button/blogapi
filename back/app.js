import dotenv from "dotenv";
import express from "express";
import passport from "passport";

// Routers
import { router } from "./routers/authRoutes";

// Initialize
const app = express();
dotenv.config();

// Middleware setup
app.use(express.json);

import "./config/passportConfig";
app.use(passport.initialize());

app.use("/api", router);

// Server running
const PORT = process.env.SERVER_PORT || 5678;
app.listen(PORT, () => console.log("Running on port", PORT + "..."));
