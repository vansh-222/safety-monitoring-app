import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Settings.css";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="settings-container">
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

      {/* Main Settings Page */}
      <main className="settings-main">
        <div className="settings-topbar">
          <h1>{t("security_settings")}</h1>
          <p>{t("security_settings_desc")}</p>
        </div>

        {/* Password Section */}
        <section className="settings-card">
          <h2>{t("password")}</h2>
          <p>{t("password_desc")}</p>
          <button className="btn">{t("reset_password")}</button>
        </section>

        {/* Two-Factor Authentication */}
        <section className="settings-card">
          <h2>{t("two_factor_auth")}</h2>
          <p>{t("two_factor_desc")}</p>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </section>

        {/* Recovery Options */}
        <section className="settings-card">
          <h2>{t("recovery_options")}</h2>
          <div className="recovery-grid">
            <input type="email" placeholder={t("email_placeholder")} />
            <input type="tel" placeholder={t("phone_placeholder")} />
            <button className="btn">{t("save_recovery")}</button>
          </div>
        </section>

        {/* Trusted Devices */}
        <section className="settings-card">
          <h2>{t("trusted_devices")}</h2>
          <table className="device-table">
            <thead>
              <tr>
                <th>{t("device")}</th>
                <th>{t("last_seen")}</th>
                <th>{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chrome on MacBook Pro</td>
                <td>2 {t("hours_ago")}</td>
                <td><button className="btn-remove">{t("remove")}</button></td>
              </tr>
              <tr>
                <td>iPhone 15 Pro</td>
                <td>{t("yesterday")}</td>
                <td><button className="btn-remove">{t("remove")}</button></td>
              </tr>
            </tbody>
          </table>
          <button className="btn">{t("add_device")}</button>
        </section>

        {/* Privacy Controls */}
        <section className="settings-card">
          <h2>{t("privacy_controls")}</h2>
          <div className="privacy-controls">
            <label>{t("reports_visibility")}</label>
            <select>
              <option>{t("my_team")}</option>
              <option>{t("everyone")}</option>
              <option>{t("private")}</option>
            </select>

            <label>{t("blocked_users")}</label>
            <div className="blocked-list">
              <span className="blocked-user">spam_user</span>
            </div>
          </div>
        </section>

        {/* System Settings */}
        <div className="settings-card">
          <h2>{t("system_settings")}</h2>
          <p className="subtitle">{t("system_settings_desc")}</p>

          {/* Manage user roles */}
          <div className="section">
            <h3>{t("manage_user_roles")}</h3>
            <div className="role-row">
              <span>Alice</span>
              <select>
                <option>{t("member")}</option>
                <option>{t("admin")}</option>
                <option>{t("viewer")}</option>
              </select>
            </div>
            <div className="role-row">
              <span>Charlie</span>
              <select>
                <option>{t("member")}</option>
                <option>{t("admin")}</option>
                <option>{t("viewer")}</option>
              </select>
            </div>
          </div>

          {/* Backup & restore */}
          <div className="section">
            <h3>{t("data_backup_restore")}</h3>
            <button className="btn primary">{t("backup_now")}</button>
            <button className="btn secondary">{t("restore")}</button>
          </div>

          {/* App version */}
          <div className="section version">
            <h3>{t("app_version")}</h3>
            <p>{t("version_number")}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
