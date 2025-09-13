import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./navbar.css";

const PublicNavbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">🚨 Safion</Link>
      </div>
      <div className="nav-links">
        <Link to="/login">{t("login")}</Link>
        <Link to="/signup" className="signup-btn">
          {t("signup")}
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;
