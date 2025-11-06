import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ContentDetail() {
  const { id } = useParams(); // 👈 URL se ID lo
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔑 get token from localStorage

        const res = await axios.get(
          `https://app.moovymed.de/api/v1/category-content/get/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 👈 attach token here
            },
          }
        );

        setContent(res.data.data.contentData);
        setTags(res.data.data.contentTags);
      } catch (err) {
        console.error("Error fetching content:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchContent();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );

  if (!content)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        No content found.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-100">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>

      {/* 🏷 Title */}
      <h2 className="text-2xl font-semibold text-center mb-2">
        {content.title}
      </h2>

      {/* 📝 Notes */}
      <p className="text-gray-500 text-center mb-6">{content.notes}</p>

      {/* 🖼 Image */}
      {content.media_file && (
        <div className="flex justify-center mb-6">
          <img
            src={content.media_file}
            alt={content.title}
            className="w-80 h-80 object-cover rounded-2xl border shadow-sm"
          />
        </div>
      )}

      {/* 🏷 Tags */}
      <div className="flex flex-wrap justify-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag.id}
            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
          >
            #{tag.tag}
          </span>
        ))}
      </div>

      {/* ⚙️ Footer Actions */}
      <div className="flex justify-center gap-4 mt-8">
        <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
          Edit
        </button>
        <button className="px-5 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition">
          Delete
        </button>
      </div>
    </div>
  );
}
