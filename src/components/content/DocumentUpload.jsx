// src/pages/DocumentUpload.jsx
import React, { useState, useRef } from "react";

const CATEGORIES = ["Invoice", "Contract", "Receipt", "Passport", "Other"];

export default function DocumentUpload() {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const fileInputRef = useRef(null);
  const dropRef = useRef(null);

  // file handlers
  const onFilesAdded = (fileList) => {
    const newFiles = Array.from(fileList).map((f) => ({
      file: f,
      id: `${f.name}-${f.size}-${Date.now()}`,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileChange = (e) => {
    onFilesAdded(e.target.files);
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.files?.length) {
      onFilesAdded(e.dataTransfer.files);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // tags
  const addTag = (t) => {
    const clean = t.trim();
    if (!clean) return;
    if (!tags.includes(clean)) setTags((p) => [...p, clean]);
  };
  const handleTagKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
      setTagInput("");
    } else if (e.key === "Backspace" && !tagInput && tags.length) {
      setTags((p) => p.slice(0, -1));
    }
  };
  const removeTag = (t) => setTags((p) => p.filter((x) => x !== t));

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      notes,
      category,
      tags,
      files: files.map((f) => ({
        name: f.file.name,
        size: f.file.size,
        type: f.file.type,
      })),
    };
    console.log("Uploading:", payload);
    alert("Upload simulated — check console.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 space-y-5"
      aria-label="Add document"
    >
      <h2 className="text-xl font-semibold">Add document</h2>

      <p className="text-sm text-gray-600">
        Upload any file and use the categories to keep track of things.
      </p>

      {/* File upload */}
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center gap-3
                   hover:border-gray-400 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") fileInputRef.current?.click();
        }}
        aria-describedby="file-help"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
        <svg
          className="w-10 h-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16v1a3 3 0 003 3h4a3 3 0 003-3v-1"
          />
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 10a5 5 0 0110 0"
          />
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 13v-6"
          />
        </svg>
        <div className="text-center">
          <div className="text-sm font-medium">Choose file</div>
          <div id="file-help" className="text-xs text-gray-500">
            or drag & drop files here
          </div>
        </div>
      </div>

      {/* Selected files */}
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center justify-between bg-gray-50 p-2 rounded"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2v6h6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <div className="text-sm font-medium">{f.file.name}</div>
                  <div className="text-xs text-gray-500">
                    {(f.file.size / 1024).toFixed(1)} KB •{" "}
                    {f.file.type || "unknown"}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(f.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Add title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 p-2"
          placeholder="Add title"
        />
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Add notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 p-2 resize-none"
          placeholder="Add notes"
        />
      </div>

      {/* Category & Tag */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Choose Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded border-gray-300 p-2 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="tag"
            className="block text-sm font-medium text-gray-700"
          >
            Add tag
          </label>
          <div className="mt-1 flex gap-2 items-center">
            <input
              id="tag"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKey}
              placeholder="Press Enter to add"
              className="flex-1 rounded border-gray-300 p-2 focus:ring-2 focus:ring-indigo-200"
            />
            <button
              type="button"
              onClick={() => {
                addTag(tagInput);
                setTagInput("");
              }}
              className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Add
            </button>
          </div>

          {/* Show added tags */}
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 bg-gray-100 px-2 py-1 rounded text-sm"
              >
                <span>{t}</span>
                <button
                  type="button"
                  onClick={() => removeTag(t)}
                  aria-label={`Remove ${t}`}
                  className="text-xs text-red-500"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <button
          type="submit"
          className="px-6 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Upload
        </button>
      </div>
    </form>
  );
}
