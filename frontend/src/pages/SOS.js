import React, { useState } from "react";
import api from "../utils/api";
import "./SOS.css";

const helplines = [
  { name: "Police", number: "100", description: "Emergency police assistance" },
  { name: "Ambulance", number: "102", description: "Medical emergencies" },
  { name: "Fire Brigade", number: "101", description: "Fire emergencies" },
  { name: "Women Helpline", number: "1091", description: "Support for women" },
  { name: "Disaster Management", number: "108", description: "Natural disasters" },
];

const SOS = () => {
  const [sending, setSending] = useState(false);

  const handleSOS = () => {
    if (!window.confirm("Send SOS now? This will notify your emergency contacts.")) return;
    setSending(true);

    // Get geolocation and send SOS
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          sendSOS({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        () => {
          // If geolocation denied or fails
          sendSOS({ lat: null, lng: null });
        }
      );
    } else {
      sendSOS({ lat: null, lng: null });
    }
  };

  const sendSOS = async (location) => {
    try {
      await api.post("/api/sos", {
        message: "I need help!",
        location,
      });
      alert("SOS sent successfully!");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to send SOS");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="sos-container">
      <h1>Emergency SOS</h1>
      <p className="description">
        Press the button below to send your location and emergency alert.
      </p>

      <div className="sos-button-container">
        <button className="sos-button" onClick={handleSOS} disabled={sending}>
          {sending ? "Sending..." : "Send SOS"}
        </button>
      </div>

      <div className="helpline-section">
        <h2>Important Helplines</h2>
        <div className="helpline-cards">
          {helplines.map((line, index) => (
            <div key={index} className="helpline-card">
              <h3>{line.name}</h3>
              <p>{line.description}</p>
              <p>
                {line.number}
                <button
                  className="copy-button"
                  onClick={() => navigator.clipboard.writeText(line.number)}
                >
                  Copy
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SOS;
