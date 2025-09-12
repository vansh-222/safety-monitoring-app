import React from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">SafeLink</h2>
        <ul className="menu">
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/report")}>Report Incident</li>
          <li onClick={() => navigate("/alerts")}>Live Alerts</li>
          <li onClick={() => navigate("/routes")}>Safe Routes</li>
          <li onClick={() => navigate("/sos")}>Emergency Contacts</li>
          <li className="active" onClick={() => navigate("/settings")}>
            Settings
          </li>
          <li onClick={() => navigate("/login")}>Logout</li>
        </ul>
      </aside>

      {/* Main Settings Page */}
      <main className="settings-main">
        <div className="settings-topbar">
          <h1>Security Settings</h1>
          <p>
            Manage password, Two-Factor Authentication and trusted devices.
          </p>
        </div>

        {/* Password Section */}
        <section className="settings-card">
          <h2>Password</h2>
          <p>Set a strong, unique password.</p>
          <button className="btn">Reset Password</button>
        </section>

        {/* Two-Factor Authentication */}
        <section className="settings-card">
          <h2>Two-Factor Authentication</h2>
          <p>Add an extra layer of security to your account.</p>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </section>

        {/* Recovery Options */}
        <section className="settings-card">
          <h2>Recovery Options</h2>
          <div className="recovery-grid">
            <input type="email" placeholder="name@domain.com" />
            <input type="tel" placeholder="+1 555 0100" />
            <button className="btn">Save recovery</button>
          </div>
        </section>

        {/* Trusted Devices */}
        <section className="settings-card">
          <h2>Trusted Devices</h2>
          <table className="device-table">
            <thead>
              <tr>
                <th>Device</th>
                <th>Last Seen</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chrome on MacBook Pro</td>
                <td>2 hours ago</td>
                <td><button className="btn-remove">Remove</button></td>
              </tr>
              <tr>
                <td>iPhone 15 Pro</td>
                <td>Yesterday</td>
                <td><button className="btn-remove">Remove</button></td>
              </tr>
            </tbody>
          </table>
          <button className="btn">Add device</button>
        </section>

        {/* Privacy Controls */}
        <section className="settings-card">
          <h2>Privacy Controls</h2>
          <div className="privacy-controls">
            <label>Reports visibility</label>
            <select>
              <option>My Team</option>
              <option>Everyone</option>
              <option>Private</option>
            </select>

            <label>Blocked users</label>
            <div className="blocked-list">
              <span className="blocked-user">spam_user</span>
            </div>
          </div>
        </section>

         <div className="settings-card">
      <h2>System Settings</h2>
      <p className="subtitle">
        Admin-only controls for roles, backups and versioning.
      </p>

      {/* Manage user roles */}
      <div className="section">
        <h3>Manage user roles</h3>
        <div className="role-row">
          <span>Alice</span>
          <select>
            <option>Member</option>
            <option>Admin</option>
            <option>Viewer</option>
          </select>
        </div>
        <div className="role-row">
          <span>Charlie</span>
          <select>
            <option>Member</option>
            <option>Admin</option>
            <option>Viewer</option>
          </select>
        </div>
      </div>

      {/* Backup & restore */}
      <div className="section">
        <h3>Data backup & restore</h3>
        <button className="btn primary">Backup now</button>
        <button className="btn secondary">Restore</button>
      </div>

      {/* App version */}
      <div className="section version">
        <h3>App version</h3>
        <p>v1.0.0 • Up to date</p>
      </div>
    </div>

      </main>
    </div>
  );
};

export default SettingsPage;

