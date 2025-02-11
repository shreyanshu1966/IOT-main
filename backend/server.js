const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://yourdomain.com"], // Adjust as needed
  credentials: true,
}));
app.use(helmet()); // Security headers
app.use(morgan("dev")); // Logging HTTP requests
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data
app.use(cookieParser()); // Parse cookies

// Rate Limiting (Protects against brute-force attacks)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/auth", apiLimiter); // Apply only to authentication routes

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/documents", express.static(path.join(__dirname, "documents")));

// Import Routes
const productRoutes = require("./routes/products");
const solutionRoutes = require("./routes/solutions");
// const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const orderRoutes = require("./routes/orders");
const paymentRoutes = require("./routes/payment");
const testimonialRoutes = require("./routes/testimonials");
const clientRoutes = require("./routes/clients");
const dataRoutes = require("./routes/data"); // Import data routes
const subscriptionRoutes = require('./routes/subscription'); // Import subscription routes
const quoteRoutes = require("./routes/quotes");

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/data", dataRoutes); // Use data routes
app.use('/api/subscription', subscriptionRoutes); // Use subscription routes
app.use("/api/quote", quoteRoutes);

// app.use("/api/cart", cartRoutes);


// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
