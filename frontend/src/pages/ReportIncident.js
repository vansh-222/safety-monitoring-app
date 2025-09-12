import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./ReportIncident.css";

const ReportIncident = () => {
  const [form, setForm] = useState({
    title: "",
    type: "theft",
    description: "",
    lat: "",
    lng: "",
    dateTime: "",
    evidence: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("type", form.type);
      formData.append("description", form.description);
      formData.append("dateTime", form.dateTime);
      formData.append(
        "location",
        JSON.stringify({
          lat: parseFloat(form.lat),
          lng: parseFloat(form.lng),
        })
      );
      if (form.evidence) {
        formData.append("evidence", form.evidence);
      }

      await api.post("/api/incidents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Incident reported successfully");
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.message || err.message || "Failed to report";
      alert(msg);
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
    <aside className="sidebar">
  <h2 className="logo">SafetyApp</h2>
  <ul className="menu">
    <li className="active">Dashboard</li>
    <li onClick={() => navigate("/report")}>Report Incident</li>
    <li>Live News</li>
    <li>Safe Routes</li>
    <li onClick={() => navigate("/sos")}>Emergency Contacts</li>
    <li onClick={() => navigate("/settings")}>Settings</li>  {/* ✅ Updated */}
    <li onClick={() => navigate("/login")}>Logout</li>
  </ul>
</aside>

      {/* Main Content */}
      <div className="admin-content">
        <h2 className="report-title">Report Incident</h2>
        <form className="report-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Concise incident title"
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Location (Latitude)</label>
              <input
                name="lat"
                value={form.lat}
                onChange={handleChange}
                placeholder="e.g. 28.7041"
                className="form-input"
                required
              />
            </div>
            <div className="form-group half">
              <label>Location (Longitude)</label>
              <input
                name="lng"
                value={form.lng}
                onChange={handleChange}
                placeholder="e.g. 77.1025"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>Category</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="theft">Theft</option>
                <option value="harassment">Harassment</option>
                <option value="accident">Accident</option>
                <option value="fire">Fire</option>
                <option value="flood">Flood</option>
              </select>
            </div>
            <div className="form-group half">
              <label>Date & Time</label>
              <input
                type="datetime-local"
                name="dateTime"
                value={form.dateTime}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={5}
              className="form-input"
              placeholder="Provide details about the incident"
            />
          </div>

          <div className="form-group">
            <label>Evidence (Image/Video)</label>
            <input
              type="file"
              name="evidence"
              accept="image/*,video/*"
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Submit Report
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
