import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedbackButton from "../feedback/FeedbackButton";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchModal from "../../components/SearchModal"; // 🔍 Import modal component

export default function DashboardNavbar() {
  const navigate = useNavigate();
  const [showSearchModal, setShowSearchModal] = useState(false);

  // 🧠 Handle logout directly using localStorage
  const handleLogout = () => {
    // Remove token and user data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login
    navigate("/login");
  };

  return (
    <>
      <header className="bg-white shadow-sm relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img
                  src="https://portal.moovymed.de/static/media/Logo.3f6f8480.svg"
                  alt="Logo"
                  className="h-12"
                />
              </a>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-end space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                {/* Feedback */}
                <div className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-full transition cursor-pointer">
                  <span className="mr-2">
                    <img
                      src="https://portal.moovymed.de/static/media/Icon-Menu-Feedback.d454e81a.svg"
                      alt="Feedback"
                      className="w-5 h-5"
                    />
                  </span>
                  <FeedbackButton />
                </div>

                {/* Settings */}
                <button
                  onClick={() => navigate("/settings")}
                  className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
                >
                  <span className="mr-2">
                    <img
                      src="https://portal.moovymed.de/static/media/Icon-Menu-Anwendungen.dada834e.svg"
                      alt="Settings"
                      className="w-5 h-5"
                    />
                  </span>
                  Settings
                </button>

                {/* 🔍 Search */}
                <span
                  onClick={() => setShowSearchModal(true)}
                  className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-full transition cursor-pointer"
                >
                  <span className="mr-2">
                    <img
                      src="https://portal.moovymed.de/static/media/Icon-Menu-Suche.8f6be80d.svg"
                      alt="Search"
                      className="w-5 h-5"
                    />
                  </span>
                  Search
                </span>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
                >
                  <span className="mr-2">
                    <svg
                      className="w-5 h-5"
                      focusable="false"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                    </svg>
                  </span>
                  Logout
                </button>
              </div>

              {/* Language Switcher */}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* 🔍 Search Modal Component */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />
    </>
  );
}
