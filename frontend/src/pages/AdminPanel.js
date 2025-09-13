import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./AdminPanel.css";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const reports = [
    { id: "RPT-1024", title: t("report1_title"), date: "9/1/2025", status: t("resolved") },
    { id: "RPT-1023", title: t("report2_title"), date: "8/28/2025", status: t("in_review") },
    { id: "RPT-1022", title: t("report3_title"), date: "8/18/2025", status: t("open") },
    { id: "RPT-1021", title: t("report4_title"), date: "8/10/2025", status: t("resolved") },
    { id: "RPT-1020", title: t("report5_title"), date: "8/3/2025", status: t("in_review") },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
       <aside className="sidebar">
          <h2 className="logo">Safion</h2>
          <ul className="menu">
            <li className="active">{t("dashboard")}</li>
            <li onClick={() => navigate("/report")}>{t("report_incident")}</li>
            <li>{t("live_news")}</li>
            <li>{t("safe_routes")}</li>
            <li onClick={() => navigate("/sos")}>{t("emergency_contacts")}</li>
            <li onClick={() => navigate("/settings")}>{t("settings")}</li>
            <li onClick={() => navigate("/login")}>{t("logout")}</li>
          </ul>
        </aside>

      {/* Main Content */}
      <div className="admin-content">
        {/* Profile Header */}
        <div className="admin-header">
          <div className="profile-card">
            <img
              src="https://media.licdn.com/dms/image/v2/D4E03AQFLncf9MjIMcg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723647237095?e=1760572800&v=beta&t=e_f0m5uL9aZn9Vo6Fh3HPm-Ds50PAO14GdvEBi3RV_A"
              alt="profile"
              className="profile-img"
            />
            <div className="profile-info">
              <h2>Vansh Kumar</h2>
              <span className="role">{t("admin")}</span>
              <p>vansh.kumar@example.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="profile-actions">
              <button className="edit-btn">{t("edit_profile")}</button>
              <button className="security-btn">{t("security_check")}</button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button className="tab active">{t("my_reports")}</button>
          <button className="tab">{t("security_settings")}</button>
          <button className="tab">{t("activity_logs")}</button>
        </div>

        {/* Reports List */}
        <div className="reports-list">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-info">
                <h4>{report.title}</h4>
                <span className="report-id">{report.id}</span> •{" "}
                <span className="report-date">{report.date}</span>
              </div>
              <div className={`status ${report.status.toLowerCase().replace(" ", "-")}`}>
                {report.status}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <h3>{t("quick_stats")}</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <p>{t("reports_submitted")}</p>
              <h2>128</h2>
              <span className="positive">+4 {t("this_week")}</span>
            </div>
            <div className="stat-card">
              <p>{t("alerts_resolved")}</p>
              <h2>86</h2>
              <span className="positive">+2 {t("today")}</span>
            </div>
            <div className="stat-card">
              <p>{t("communities_joined")}</p>
              <h2>5</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
