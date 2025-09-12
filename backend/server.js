// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

const authRoutes = require("./routes/auth");
const incidentRoutes = require("./routes/incidents");
const sosRoutes = require("./routes/sos");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ connect to MongoDB (only once)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// routes
app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/sos", sosRoutes);



// fallback
app.get("/", (req, res) => res.send("🚀 Safety backend is up"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


