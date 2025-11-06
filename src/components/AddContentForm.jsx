import React, { useEffect, useState } from "react";
import axios from "axios";

const AddContentForm = ({ categoryId, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch existing tags
  const fetchTags = async () => {
    try {
      const res = await axios.get("https://app.moovymed.de/api/v1/tags", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTags(res.data.data || []);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  // Add new tag API call
  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    try {
      const res = await axios.post(
        "https://app.moovymed.de/api/v1/tag/create",
        { tag: newTag },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNewTag("");
      fetchTags(); // refresh tags list
      alert("Tag added successfully!");
    } catch (error) {
      console.error("Error creating tag:", error);
      alert("Failed to create tag");
    }
  };

  // Submit content form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("notes", notes);
      formData.append("category_id", categoryId);
      if (file) formData.append("media_file", file);
      selectedTags.forEach((tagId, i) =>
        formData.append(`tags[${i}]`, tagId)
      );

      const res = await axios.post(
        "https://app.moovymed.de/api/v1/category-content/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Content added successfully!");
      onSuccess(); // refresh parent list
      onClose();
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-lg relative">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Add New Content
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Media File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full"
            />
          </div>

          {/* Existing tags */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Tags</label>
            <select
              multiple
              value={selectedTags}
              onChange={(e) =>
                setSelectedTags(
                  Array.from(e.target.selectedOptions, (opt) => opt.value)
                )
              }
              className="w-full border rounded-lg px-3 py-2 h-28"
            >
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.tag}
                </option>
              ))}
            </select>
          </div>

          {/* Add new tag */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="New tag name"
              className="flex-1 border rounded-lg px-3 py-2"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600"
            >
              + Add Tag
            </button>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContentForm;
