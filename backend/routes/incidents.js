// routes/incidents.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Incident = require("../models/Incident");
const auth = require("../middleware/auth");

// Configure Multer (store files in /uploads)
const upload = multer({ dest: "uploads/" });

// POST /api/incidents (create incident)
router.post("/", auth, upload.single("evidence"), async (req, res) => {
  try {
    // If multipart/form-data => multer fills req.body + req.file
    // If JSON => express.json() fills req.body
    const { type, description, location, title, dateTime } = req.body || {};

    if (!type) {
      return res.status(400).json({ message: "Type is required" });
    }

    let parsedLocation = {};
    try {
      // If location is stringified JSON (from FormData)
      parsedLocation = location ? JSON.parse(location) : {};
    } catch (e) {
      parsedLocation = location || {};
    }

    const inc = new Incident({
      user: req.user.id,
      title: title || "Untitled",
      type,
      description,
      location: parsedLocation, // { lat, lng }
      dateTime: dateTime || new Date(),
      evidencePath: req.file ? req.file.path : null,
      status: "Pending",
    });

    await inc.save();
    return res.status(201).json(inc);
  } catch (err) {
    console.error("Create incident error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET /api/incidents (list all incidents)
router.get("/", auth, async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    return res.json(incidents);
  } catch (err) {
    console.error("List incidents error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// PATCH /api/incidents/:id (update status)
router.patch("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    const inc = await Incident.findById(req.params.id);
    if (!inc) return res.status(404).json({ message: "Incident not found" });

    if (status) inc.status = status;
    await inc.save();
    return res.json(inc);
  } catch (err) {
    console.error("Update incident error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/incidents/:id (remove incident)
router.delete("/:id", auth, async (req, res) => {
  try {
    const inc = await Incident.findById(req.params.id);
    if (!inc) return res.status(404).json({ message: "Incident not found" });

    await inc.deleteOne();
    return res.json({ message: "Incident deleted" });
  } catch (err) {
    console.error("Delete incident error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
