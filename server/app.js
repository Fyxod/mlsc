import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mainRoute from "./src/routes/main.js";
import authRoute from "./src/routes/auth.js";
import formRoute from "./src/routes/form.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../public/views"));

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB. Error:\n", err);
  });

// Routes
app.get("/", (req, res) => {
  res.render("home");
});
app.use(mainRoute);
app.use(authRoute);
app.use(formRoute);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).render("404", { url: req.originalUrl });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
