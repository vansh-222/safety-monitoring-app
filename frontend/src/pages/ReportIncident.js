import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./ReportIncident.css";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      if (form.evidence) formData.append("evidence", form.evidence);

      await api.post("/api/incidents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(t("report_success"));
      navigate("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || t("report_fail");
      alert(msg);
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
       <aside className="sidebar">
          <h2 className="logo">Safion</h2>
          <ul className="menu">
            <li className="active">{t("dashboard")}</li>
            <li onClick={() => navigate("/report")}>{t("report_incident")}</li>
           <li onClick={() => navigate("/chatbot")}>{t("AI Assistant")}</li>
            <li onClick={() => navigate("/sos")}>{t("emergency_contacts")}</li>
            <li onClick={() => navigate("/settings")}>{t("settings")}</li>
            <li onClick={() => navigate("/login")}>{t("logout")}</li>
          </ul>
        </aside>

      {/* Main Content */}
      <div className="admin-content">
        <h2 className="report-title">{t("report_incident")}</h2>
        <form className="report-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("title")}</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder={t("title_placeholder")}
              className="form-input"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label>{t("lat")}</label>
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
              <label>{t("lng")}</label>
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
              <label>{t("category")}</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="theft">{t("theft")}</option>
                <option value="harassment">{t("harassment")}</option>
                <option value="accident">{t("accident")}</option>
                <option value="fire">{t("fire")}</option>
                <option value="flood">{t("flood")}</option>
              </select>
            </div>
            <div className="form-group half">
              <label>{t("date_time")}</label>
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
            <label>{t("description")}</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={5}
              className="form-input"
              placeholder={t("description_placeholder")}
            />
          </div>

          <div className="form-group">
            <label>{t("evidence")}</label>
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
              {t("submit_report")}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/dashboard")}
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
