import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import MapComponent from "../components/MapComponent";
import "./dashboard.css";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Fetch incidents from backend
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await api.get("/api/incidents");
        setIncidents(res.data || []);
      } catch (err) {
        console.error("Error fetching incidents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  return (
    <div>
      <div className="dashboard-container">
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

        <main className="main-content">
          {/* Topbar */}
          <header className="topbar">
            {/* Greeting with dynamic name */}
            <span className="app-title">{t("greeting", { name: "Vansh" })}</span>

            {/* Search bar */}
            <div className="dashboard-search">
              <input
                type="text"
                placeholder={t("search_placeholder")} // "Search for incidents, alerts, or safe routes..."
                className="search-input"
              />
              <button className="search-btn">{t("search")}</button> 
            </div>

            {/* Profile and notifications */}
            <div className="profile">
              <span className="bell">🔔</span>
              <img
                src="https://media.licdn.com/dms/image/v2/D4E03AQFLncf9MjIMcg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723647237095?e=1760572800&v=beta&t=e_f0m5uL9aZn9Vo6Fh3HPm-Ds50PAO14GdvEBi3RV_A"
                alt="profile"
                className="profile-pic"
              />
            </div>
          </header>

          {/* Hero Section */}
          <section className="hero">
            <div className="hero-text">
              <h1>{t("hero_title")}</h1>
              <p>{t("hero_description")}</p>
              <div className="hero-buttons">
                <button
                  className="btn-primary"
                  onClick={() => navigate("/report")}
                >
                  {t("get_started")}
                </button>
                <button className="btn-secondary">{t("learn_more")}</button>
              </div>
            </div>
            <div className="hero-image">
              <img src="1.png" alt="safety" />
            </div>
          </section>

          {/* Tools Section */}
          <section className="tools">
            <h2 className="tools-title">{t("tools_title")}</h2>
            <p className="tools-subtitle">{t("tools_subtitle")}</p>

            <div className="tool-grid">
              <div className="tool-card">
                <div className="tool-icon">📌</div>
                <h3>{t("report_incident")}</h3>
                <p>{t("report_incident_desc")}</p>
              </div>

              <div className="tool-card">
                <div className="tool-icon">🔔</div>
                <h3>{t("live_alerts")}</h3>
                <p>{t("live_alerts_desc")}</p>
              </div>

              <div className="tool-card">
                <div className="tool-icon">📞</div>
                <h3>{t("emergency_contacts")}</h3>
                <p>{t("emergency_contacts_desc")}</p>
              </div>

              <div className="tool-card">
                <div className="tool-icon">🛣️</div>
                <h3>{t("safe_routes")}</h3>
                <p>{t("safe_routes_desc")}</p>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="map-section">
            <h2>{t("map_title")}</h2>
            <p>{t("map_subtitle")}</p>
            <div className="map-box">
              {loading ? (
                <div>{t("loading_map")}</div>
              ) : (
                <MapComponent
                  incidents={incidents}
                  center={[20.5937, 78.9629]}
                  zoom={5}
                />
              )}
              <button
                onClick={() => navigate("/full-map")}
                style={{ marginTop: "10px" }}
              >
                {t("open_full_map")}
              </button>
            </div>
          </section>

          {/* Alerts Section */}
          <section className="alerts-section">
            <div className="alerts-header">
              <h2>{t("nearby_alerts")}</h2>
              <p>{t("nearby_alerts_desc")}</p>
            </div>
            <div className="alerts-list">
              {loading && <div className="loading">{t("loading_alerts")}</div>}
              {!loading && incidents.length === 0 && (
                <div className="no-alerts">{t("no_alerts")}</div>
              )}
              {!loading &&
                incidents.slice(0, 3).map((inc) => (
                  <div
                    key={inc._id}
                    className={`alert-item ${inc.status === "Resolved"
                        ? "green"
                        : inc.type === "Road Closure"
                          ? "red"
                          : "orange"
                      }`}
                  >
                    <div className="alert-info">
                      <div className="alert-type">{inc.type}</div>
                      <div className="alert-status">{inc.status || t("pending")}</div>
                    </div>
                    <div className="alert-time">
                      {new Date(inc.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Community Section */}
          <section className="community-section">
            <div className="trusted">
              <h2>{t("trusted_title")}</h2>
              <p>{t("trusted_desc")}</p>

              <div className="stats-container">
                <div className="stat-box">
                  <h3>120,482</h3>
                  <span>{t("active_users")}</span>
                </div>
                <div className="stat-box">
                  <h3>58,930</h3>
                  <span>{t("reports_submitted")}</span>
                </div>
                <div className="stat-box">
                  <h3>44,715</h3>
                  <span>{t("alerts_resolved")}</span>
                </div>
              </div>
            </div>
            <div className="testimonials">
              <h2>{t("testimonials_title")}</h2>
              <p>{t("testimonials_desc")}</p>
              <div className="testimonial-cards">
                <div className="card">
                  <p>{t("testimonial1")}</p>
                  <h4>Alex Johnson <span>- {t("commuter")}</span></h4>
                </div>
                <div className="card">
                  <p>{t("testimonial2")}</p>
                  <h4>Priya Patel <span>- {t("student")}</span></h4>
                </div>
                <div className="card">
                  <p>{t("testimonial3")}</p>
                  <h4>Marcus Lee <span>- {t("resident")}</span></h4>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h2>Safion</h2>
            <p>{t("footer_desc")}</p>
          </div>
          <div className="footer-links">
            <h3>{t("quick_links")}</h3>
            <ul>
              <li><a href="#">{t("home")}</a></li>
              <li><a href="#">{t("report_incident")}</a></li>
              <li><a href="#">{t("safety_alerts")}</a></li>
              <li><a href="#">{t("contact_us")}</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>{t("contact")}</h3>
            <p>{t("email")}: support@safeguard.com</p>
            <p>{t("phone")}: +91 98765 43210</p>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Safion. {t("rights_reserved")}</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
