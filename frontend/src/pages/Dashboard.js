import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import MapComponent from "../components/MapComponent";
import "./dashboard.css";

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


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
          <h2 className="logo">SafeLink</h2>
          <ul className="menu">
            <li className="active">Dashboard</li>
            <li onClick={() => navigate("/report")}>Report Incident</li>
            <li>Live Alerts</li>
            <li>Safe Routes</li>
            <li>Emergency Contacts</li>
            <li>Community Support</li>
            <li>Settings</li>
            <li onClick={() => navigate("/login")}>Logout</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Topbar */}
          <header className="topbar">
            <span className="app-title">Hey, Vansh</span>
            <div className="dashboard-search">
              <input
                type="text"
                placeholder="Search incidents, alerts, or safe routes..."
                className="search-input"
              />
              <button className="search-btn">Search</button>
            </div>

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
              <h1>Stay Safe, Stay Connected</h1>
              <p>
                From real-time safety alerts to easy incident reporting and a supportive community network, <br></br>
                Our platform ensures that you are never alone — your digital safety companion,  ready to protect you wherever you are.
              </p>
              <div className="hero-buttons">
                <button
                  className="btn-primary"
                  onClick={() => navigate("/report")}
                >
                  Get Started
                </button>
                <button className="btn-secondary">Learn More</button>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="1.png"
                alt="safety"
              />
            </div>
          </section>

          {/* Tools Section */}
          <section className="tools">
            <h2 className="tools-title">Powerful Safety Tools</h2>
            <p className="tools-subtitle">Everything you need for peace of mind</p>

            <div className="tool-grid">
              <div className="tool-card">
                <div className="tool-icon">📌</div>
                <h3>Report Incident</h3>
                <p>Submit detailed reports with media and location.</p>
              </div>

              <div className="tool-card">
                <div className="tool-icon">🔔</div>
                <h3>Live Safety Alerts</h3>
                <p>Receive real-time notifications and updates.</p>
              </div>

              <div className="tool-card">
                <div className="tool-icon">📞</div>
                <h3>Emergency Contacts</h3>
                <p>Quick-dial trusted contacts and local services.</p>
              </div>

              <div className="tool-card">
                <div className="tool-icon">🛣️</div>
                <h3>Safe Routes</h3>
                <p>Explore recommended routes based on current data.</p>
              </div>
            </div>
          </section>


          {/* Map Section */}
          <section className="map-section">
            <h2>Interactive Map Preview</h2>
            <p>See safety insights around you</p>
            <div className="map-box">
              {loading ? (
                <div>Loading map...</div>
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
                Open Full Map
              </button>
            </div>
          </section>

          {/* Nearby Alerts Section */}
          <section className="alerts-section">
            <div className="alerts-header">
              <h2>Nearby Alerts</h2>
              <p>Stay updated with real-time incident reports</p>
            </div>
            <div className="alerts-list">
              {loading && <div className="loading">Loading alerts...</div>}
              {!loading && incidents.length === 0 && (
                <div className="no-alerts">No incidents reported yet</div>
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
                      <div className="alert-status">{inc.status || "Pending"}</div>
                    </div>
                    <div className="alert-time">
                      {new Date(inc.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
            </div>
          </section>

          <section class="community-section">
            <div class="trusted">
              <h2>Trusted by the Community</h2>
              <p>Growing network of vigilant users</p>

              <div class="stats-container">
                <div class="stat-box">
                  <h3>120,482</h3>
                  <span>ACTIVE USERS</span>
                </div>
                <div class="stat-box">
                  <h3>58,930</h3>
                  <span>REPORTS SUBMITTED</span>
                </div>
                <div class="stat-box">
                  <h3>44,715</h3>
                  <span>ALERTS RESOLVED</span>
                </div>
              </div>
            </div>
            <div class="testimonials">
              <h2>What People Say</h2>
              <p>Real stories from our users</p>
              <div class="testimonial-cards">
                <div class="card">
                  <p>"The live alerts helped me avoid a dangerous area on my commute. Invaluable!"</p>
                  <h4>Alex Johnson <span>- Commuter</span></h4>
                </div>
                <div class="card">
                  <p>"Reporting an incident was quick and easy. The community support is amazing."</p>
                  <h4>Priya Patel <span>- Student</span></h4>
                </div>
                <div class="card">
                  <p>"Safe routes made late-night walks feel much safer. Highly recommend."</p>
                  <h4>Marcus Lee <span>- Resident</span></h4>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h2>SafeGuard</h2>
            <p>Your trusted safety companion for alerts, reporting, and secure routes.</p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Report Incident</a></li>
              <li><a href="#">Safety Alerts</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Contact</h3>
            <p>Email: support@safeguard.com</p>
            <p>Phone: +91 98765 43210</p>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 SafeGuard. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

