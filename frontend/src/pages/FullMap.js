import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const FullMap = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("full-map").setView([20.5937, 78.9629], 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            const userMarker = L.marker([latitude, longitude]).addTo(mapRef.current);
            userMarker.bindPopup("📍 You are here").openPopup();
            mapRef.current.setView([latitude, longitude], 13);
          },
          (err) => {
            console.error("Geolocation error:", err);
          }
        );
      }
    }
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // -1 goes back in history
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1000,
          padding: "10px 15px",
          borderRadius: "6px",
          border: "none",
          background: "#0043ce",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      {/* Map Container */}
      <div id="full-map" style={{ height: "100vh", width: "100%" }}></div>
    </div>
  );
};

export default FullMap;
