import React, { useState, useEffect } from "react";

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy Data (for now)
  const dummyData = [
    { id: 1, name: "Medical Reports" },
    { id: 2, name: "Patient Records" },
    { id: 3, name: "Radiology Documents" },
    { id: 4, name: "Doctor Notes" },
    { id: 5, name: "Category - Blood Tests" },
    { id: 6, name: "Category - X-Ray Reports" },
    { id: 7, name: "Prescription Files" },
    { id: 8, name: "MRI Scans" },
  ];

  // Debounce effect for search (waits 500ms after typing)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      setLoading(true);
      // simulate API call
      const filtered = dummyData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-6 text-gray-700 text-center">
          Search Documents / Categories
        </h2>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            id="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Start typing to search..."
            className="w-full border border-gray-300 rounded-lg p-4 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            autoFocus
          />
          {loading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              Searching...
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="mt-4">
          {searchQuery.trim() === "" ? (
            <p className="text-gray-500 text-center">Type something to search.</p>
          ) : loading ? (
            <p className="text-center text-gray-600">Searching results...</p>
          ) : results.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {results.map((item) => (
                <li
                  key={item.id}
                  className="p-4 hover:bg-blue-50 rounded-lg cursor-pointer transition"
                >
                  <span className="text-gray-800 font-medium">{item.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
