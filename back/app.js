import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import "./config/passportConfig";

// Routers
import { router } from "./routers/authRoutes";

// Initialize
const app = express();
dotenv.config();

app.use(express.json()); // JSON parser
app.use(passport.initialize()); // Passport setup

app.use("/api", router);

// Server running
const PORT = process.env.SERVER_PORT || 5678;
app.listen(PORT, () => console.log("Running on port", PORT + "..."));
