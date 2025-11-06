import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en"); // ✅ move inside component
  const navigate = useNavigate();

  // 🔄 Listen for language changes (localStorage update)
  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem("language") || "en");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 📦 Fetch Categories
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://app.moovymed.de/api/v1/categories",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-Locale": language, // ✅ dynamically sends "en" or "de"
          },
        }
      );

      if (response.data && response.data.data) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Fetch again whenever language changes
  useEffect(() => {
    fetchCategories();
  }, [language]);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="text-center mb-6">
        <span className="text-sm font-medium text-gray-700">Categories</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.category_name)}
            className="bg-gray-50 hover:bg-blue-50 rounded-xl p-4 text-center cursor-pointer transition border border-transparent hover:border-blue-200 group"
          >
            <div className="flex justify-center mb-2">
           
                <img
                  src={`https://app.moovymed.de/${category.icon}`}
                  alt={category.category_name}
                  className="w-25 h-25"
                />
              
            </div>
            <div className="text-gray-700 font-medium text-sm mb-1">
              {category.category_name}
            </div>
            {category.content_count !== null && (
              <div className="text-blue-600 text-xs font-semibold">
                {category.content_count} item(s)
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
