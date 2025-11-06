import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import AddContentForm from "../components/AddContentForm";
import { useParams, useNavigate } from "react-router-dom";

const CategoryDetails = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const categoryId = id;
  const navigate = useNavigate();

  // Fetch category info
  const fetchCategoryDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://app.moovymed.de/api/v1/categories",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-Locale": "en", // ✅ dynamically sends "en" or "de"
          },
        }
      );

      const allCategories = response.data.data || response.data;
      const found = allCategories.find((c) => c.id === parseInt(categoryId));
      if (found) setCategory(found);
    } catch (error) {
      console.error("Error fetching category details:", error);
    }
  };

  // Fetch category contents
  const fetchCategoryContents = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://app.moovymed.de/api/v1/category-contents",
        { category_id: categoryId, page },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-Locale": "en",
          },
        }
      );

      const result = response.data.data;
      setContents(result.data || []);
      setPagination({
        current_page: result.current_page,
        last_page: result.last_page,
      });
    } catch (error) {
      console.error("Error fetching category contents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
    fetchCategoryContents();
  }, []);

  const handlePageChange = (page) => {
    setLoading(true);
    fetchCategoryContents(page);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-10 text-gray-500">
          Loading category contents...
        </div>
      </MainLayout>
    );
  }

  const handleContentClick = (id) => {
    navigate(`/content/${id}`);
  };

  console.log(category)
  return (
    <MainLayout>
      <div className=" rounded-2xl shadow-sm p-6"
       style={{
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
      }}
      >
        {/* Top Header Section */}
        {category && (
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:underline text-sm mb-3 inline-block"
            >
              ← Back to Categories
            </button>

            <div className="flex items-center justify-center flex-col gap-4">
              <div>
              <img
                src={`https://app.moovymed.de/${category.icon}`}
                alt={category.category_name}
                className="w-35 h-35"
              />
              </div>
             
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  {category.category_name}
                </h1>
                <div className="text-blue-600 text-xs font-semibold">
                {category.content_count} item(s)
              </div>              </div>
            </div>
          </div>
        )}

        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Category Contents
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            + Add Content
          </button>
        </div>

        {/*  Section */}
     {contents.length > 0 ? (
  <div className="overflow-x-auto">
    <div className="min-w-full  rounded-lg p-4 flex flex-row gap-5">
      {contents.map((item, index) => {
        let parsedTags = [];
        try {
          parsedTags = JSON.parse(item.tags);
        } catch {
          parsedTags = [];
        }

        return (
          <div
            key={item.id}
            className=" border-b border-gray-100 py-2 text-center"
            onClick={() => handleContentClick(item.id)}
          >
           
            <div className="bg-white p-3 rounded-2xl" >
            <img
              src={item.media_file}
              alt={item.title}
              className="w-25 h-25 object-cover"
            />
            </div>
            <span className="font-medium mt-1 block">{item.title}</span>
          </div>
        );
      })}
    </div>  
  </div>
) : (
  <div className="text-center text-gray-500 py-10">
    No records found.
  </div>
)}


        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 space-x-3">
          <button
            disabled={pagination.current_page <= 1}
            onClick={() => handlePageChange(pagination.current_page - 1)}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              pagination.current_page <= 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {pagination.current_page} of {pagination.last_page}
          </span>

          <button
            disabled={pagination.current_page >= pagination.last_page}
            onClick={() => handlePageChange(pagination.current_page + 1)}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              pagination.current_page >= pagination.last_page
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Content Modal */}
      {isModalOpen && (
        <AddContentForm
          categoryId={categoryId}
          onClose={() => setIsModalOpen(false)}
          onSuccess={fetchCategoryContents}
        />
      )}
    </MainLayout>
  );
};

export default CategoryDetails;
