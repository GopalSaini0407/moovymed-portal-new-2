import { useState } from "react";
import DashboardNavbar from "../components/navbar/DashboardNavbar";
import DocumentUploadModal from "../components/content/DocumentUploadModal";
import Categories from "./Categories";
import UserGreeting from "../components/UserGreeting"; // 👈 Added
import MainLayout from "../layouts/MainLayout";
const Dashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleSearch = (e) => setSearchValue(e.target.value);
  const clearSearch = () => setSearchValue("");

  return (
    <>
 {/* Main Content */}
 <MainLayout>
 <div>
        {/* ✅ Greeting (User name from API) */}
        <UserGreeting />

        {/* ➕ Add Content Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-full shadow-lg transition flex items-center space-x-2 cursor-pointer hover:bg-blue-50"
          >
            <span>Add content</span>
            <span className="flex items-center">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMC43MzciIGhlaWdodD0iMzEuNjYiIHZpZXdCb3g9IjAgMCAzMC43MzcgMzEuNjYiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPi5he2ZpbGw6bm9uZTtzdHJva2U6IzAwNTc5ODtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9PC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xLjcxNiAtMS4wODQpIj4KICAgICAgICA8cGF0aCBjbGFzcz0iYSIKICAgICAgICAgICAgICBkPSJNMTUuOTUsMzIuMjQ0YS43MDcuNzA3LDAsMCwxLS43MDctLjcwN1YxOS4yOTNhLjcwNy43MDcsMCwwLDAtLjcwNy0uNzA3SDIuOTIzYS43MDcuNzA3LDAsMCwxLS43MDctLjcwN1YxNS44MzRhLjcwNy43MDcsMCwwLDEsLjcwNy0uNzA3SDE0LjUzNWEuNzA4LjcwOCwwLDAsMCwuNzA3LS43MDdWMi4yOTFhLjcwNy43MDcsMCwwLDEsLjcwNy0uNzA3aDIuMjc0YS43MDguNzA4LDAsMCwxLC43MDcuNzA3VjE0LjQyYS43MDcuNzA3LDAsMCwwLC43MDcuNzA3SDMxLjI0NmEuNzA3LjcwNywwLDAsMSwuNzA3LjcwN3YyLjA0NGEuNzA3LjcwNywwLDAsMS0uNzA3LjcwN0gxOS42MzhhLjcwNy43MDcsMCwwLDAtLjcwNy43MDd2OS4yNjEiCiAgICAgICAgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAwKSIvPgogICAgPC9nPgo8L3N2Zz4K"
                alt="Upload"
                className="w-6 h-6"
              />
            </span>
          </button>
        </div>

        {/* 🔍 Tag Search */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-700">Tag Search</span>
          </div>
          <div className="relative">
            <input
              id="search-input"
              type="text"
              placeholder="Filter by tag"
              value={searchValue}
              onChange={handleSearch}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchValue && (
              <button
                onClick={clearSearch}
                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                title="Clear"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 🏷️ Categories */}
        <Categories />
      </div>
      </MainLayout>
      {/* 📤 Upload Modal */}
      <DocumentUploadModal
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
    </>
  );
};

export default Dashboard;
