const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const fs = require("fs");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ **CORS Middleware (Placed at the Top)**
app.use(cors({
  origin: [
    "http://localhost:5175",
    "http://www.intuitiverobotics.io",
    "https://www.intuitiverobotics.io",
    "http://intuitiverobotics.io",
    "https://intuitiverobotics.io",
    "http://api.intuitiverobotics.io",
    "https://api.intuitiverobotics.io"
  ],
  credentials: true,  // Allow sending cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: ['Access-Control-Allow-Origin']
}));

// ✅ **Handle Preflight Requests**
app.options('*', cors());

// ✅ **Global Middleware for CORS Headers**
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization, X-Requested-With, Accept");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // End preflight requests
  }

  next();
});

// ✅ **Security Middleware**
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging HTTP requests
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data
app.use(cookieParser()); // Parse cookies

// ✅ **Rate Limiting (Protects against brute-force attacks)**
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/auth", apiLimiter); // Apply only to authentication routes

// ✅ **MongoDB Connection**
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ **Static File Serving**
const uploadsPath = path.join(__dirname, 'uploads');
const documentsPath = path.join(__dirname, 'uploads/documents');

// Create directories if they don't exist
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });
if (!fs.existsSync(documentsPath)) fs.mkdirSync(documentsPath, { recursive: true });

// Serve files directly from the uploads directory
app.use("/uploads", express.static(uploadsPath));
app.use("/documents", express.static(documentsPath));

// ✅ **Import Routes**
const productRoutes = require("./routes/products");
const solutionRoutes = require("./routes/solutions");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const orderRoutes = require("./routes/orders");
const paymentRoutes = require("./routes/payment");
const testimonialRoutes = require("./routes/testimonials");
const clientRoutes = require("./routes/clients");
const dataRoutes = require("./routes/data");
const subscriptionRoutes = require('./routes/subscription');
const quotesRouter = require('./routes/quotes');

// ✅ **API Routes**
app.use("/api/products", productRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/data", dataRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/quote', quotesRouter);

// ✅ **Default Route**
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// ✅ **Start Server**
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
