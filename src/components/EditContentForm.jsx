import React, { useEffect, useState } from "react";
import axios from "axios";

const EditContentForm = ({ id, onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]); // store tag IDs
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // 🔹 Fetch content details to prefill
  const fetchContent = async () => {
    try {
      const res = await axios.get(
        `https://app.moovymed.de/api/v1/category-content/get/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = res.data.data.contentData;
      const tagList = res.data.data.contentTags || [];
      setTitle(data.title);
      setNotes(data.notes);
      setFiles(data.media_file);
      setSelectedTags(tagList.map((t) => t.id.toString())); // convert to string for select
    } catch (err) {
      console.error("Error fetching content:", err);
    }
  };

  // 🔹 Fetch available tags
  const fetchTags = async () => {
    try {
      const res = await axios.get("https://app.moovymed.de/api/v1/tags", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTags(res.data.data || []);
    } catch (err) {
      console.error("Error fetching tags:", err);
    }
  };

  useEffect(() => {
    fetchContent();
    fetchTags();
  }, [id]);

  // 🔹 Add new tag
  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    try {
      await axios.post(
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
      fetchTags();
      alert("Tag added successfully!");
    } catch (err) {
      console.error("Error adding tag:", err);
      alert("Failed to add tag");
    }
  };

  // 🔹 Handle file selection
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  // 🔹 Submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("notes", notes);

      // ✅ Convert tag IDs → tag names (same as AddContentForm)
      const selectedTagNames = tags
        .filter((t) => selectedTags.includes(t.id.toString()))
        .map((t) => t.tag);

      selectedTagNames.forEach((tagName, i) =>
        formData.append(`tags[${i}]`, tagName)
      );

      // multiple media files
      files.forEach((file, i) => formData.append(`media_files[${i}]`, file));

      await axios.post(
        `https://app.moovymed.de/api/v1/category-content/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Content updated successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating content:", err);
      alert("❌ Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-lg relative">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Edit Content
        </h3>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Title */}
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

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Media Files */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Media Files
            </label>
            <input
              type="file"
              multiple
              accept="image/*,video/*,application/pdf"
              onChange={handleFileChange}
              className="w-full"
            />

            {/* Existing file preview */}
            {files && typeof files === "string" && (
              <img
                src={files}
                alt="preview"
                className="mt-3 w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Tags */}
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
                <option key={tag.id} value={tag.id.toString()}>
                  {tag.tag}
                </option>
              ))}
            </select>
          </div>

          {/* Add New Tag */}
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

          {/* Buttons */}
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
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContentForm;
