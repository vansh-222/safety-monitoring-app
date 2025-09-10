const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, required: true },
    description: { type: String },
    location: {
      lat: { type: Number },
      lng: { type: Number }
    },
    status: { type: String, default: "Pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Incident", IncidentSchema);
