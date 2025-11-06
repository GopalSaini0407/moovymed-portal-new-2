import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryContents = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  // 🔹 Fetch category contents (POST method)
  const fetchCategoryContents = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `https://app.moovymed.de/api/v1/category-contents?page=${page}`,
        {},
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
    fetchCategoryContents();
  }, []);

  const handlePageChange = (page) => {
    setLoading(true);
    fetchCategoryContents(page);
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading category contents...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Category Contents
        </h2>
      </div>

      {/* Data Table */}
      {contents.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                  #
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                  Title
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                  Description
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {contents.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4 text-sm text-gray-700">
                    {(pagination.current_page - 1) * 10 + (index + 1)}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    {item.title || "-"}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-600 truncate max-w-xs">
                    {item.description || "-"}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-500">
                    {item.created_at || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  );
};

export default CategoryContents;
