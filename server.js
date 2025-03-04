require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const passport = require("./config/passport");
const session = require("express-session");


// Import passport config
require("./config/passport");

// Import routes
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const historyRoutes = require("./routes/historyRoutes");
const pemasukanRoutes = require("./routes/pemasukanRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

connectDB();

const app = express();
app.use(
   cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
   })
);

app.use(express.json());
app.use(cookieParser());

// Session must be before passport initialization
app.use(session({
   secret: process.env.SESSION_SECRET || process.env.JWT_SECRET,
   resave: false,
   saveUninitialized: false,
   cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
   }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/pemasukan", pemasukanRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Error handler
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({
      message: 'Something went wrong!',
      error: process.env.NODE_ENV === 'development' ? err.message : {}
   });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
