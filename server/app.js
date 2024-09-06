import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoSanitize from "express-mongo-sanitize";
import methodOverride from 'method-override';
import helmet from 'helmet';
import mainRoute from "./src/routes/main.js";
import authRoute from "./src/routes/auth.js";
import formRoute from "./src/routes/form.js";
import rateLimiter from "./src/middlewares/rateLimiter.js";
import requestLogger from "./src/middlewares/requestLogger.js";
import connectMongo from "./src/db/mongoose.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  if (req.hostname === 'mlsc.tech') {
    return res.redirect(301, `https://www.${req.hostname}${req.url}`); //just in case domain redirect does not work
  }
  next();
});

// MongoDB connection
connectMongo();

// Middleware setup
app.use(requestLogger);
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(mongoSanitize());
app.disable('x-powered-by');
//helmet
app.use(helmet.xssFilter()); 
app.use(helmet.noSniff()); 
app.use(helmet.ieNoOpen());
app.use(helmet.hsts());
app.use(helmet.referrerPolicy());
app.use(helmet.frameguard({ action: 'deny' }));

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../public/views"));

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.get("/", (_, res) => {
  res.render("home", { flash: null });
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
