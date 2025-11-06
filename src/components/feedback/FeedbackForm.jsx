import React, { useState, useRef } from "react";

export default function FeedbackForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  const [touched, setTouched] = useState({ title: false, feedback: false });
  const titleRef = useRef(null);

  const errors = {
    title: title.trim() === "" ? "Value required." : "",
    feedback: feedback.trim() === "" ? "Please enter your feedback." : "",
  };

  const isValid = !errors.title && !errors.feedback;

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ title: true, feedback: true });
    if (!isValid) return;
    const payload = {
      title: title.trim(),
      feedback: feedback.trim(),
      createdAt: new Date().toISOString(),
    };
    if (onSubmit) onSubmit(payload);
    // reset local state after submit
    setTitle("");
    setFeedback("");
    setTouched({ title: false, feedback: false });
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col">
      {/* Content */}
      <div className="px-6 py-5 space-y-4">
        <p className="text-md text-gray-600 text-left">
          Send us your wishes, improvement suggestions, or error messages.  
          We’re grateful for every hint.  
          Alternatively, you can also email us at{" "}
          <a href="mailto:support@moovymed.de" className="underline">
            support@moovymed.de
          </a>.
        </p>

        {/* Title field */}
        <div className="flex flex-col">
          <label
            htmlFor="inputTitle"
            className={`mb-1 text-left text-sm font-medium ${
              errors.title && touched.title ? "text-red-600" : "text-gray-700"
            }`}
          >
            Title <span aria-hidden className="text-red-600">*</span>
          </label>
          <input
            id="inputTitle"
            ref={titleRef}
            placeholder="Title"
            required
            aria-required
            aria-invalid={!!(errors.title && touched.title)}
            aria-describedby="inputTitle-helper-text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, title: true }))}
            className={`w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow ${
              errors.title && touched.title
                ? "border-red-300 bg-red-50"
                : "border-gray-200"
            }`}
          />
          <p
            id="inputTitle-helper-text"
            className={`mt-1 text-sm ${
              errors.title && touched.title
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            {errors.title && touched.title ? errors.title : ""}
          </p>
        </div>

        {/* Feedback field */}
        <div className="flex flex-col">
          <label
            htmlFor="inputFeedback"
            className={`mb-1 text-sm font-medium text-left ${
              errors.feedback && touched.feedback
                ? "text-red-600"
                : "text-gray-700"
            }`}
          >
            Your feedback <span aria-hidden className="text-red-600">*</span>
          </label>
          <textarea
            id="inputFeedback"
            placeholder="Content"
            required
            aria-required
            aria-invalid={!!(errors.feedback && touched.feedback)}
            aria-describedby="inputFeedback-helper-text"
            value={feedback}
            rows={3}
            onChange={(e) => setFeedback(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, feedback: true }))}
            className={`w-full rounded-lg border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow resize-none ${
              errors.feedback && touched.feedback
                ? "border-red-300 bg-red-50"
                : "border-gray-200"
            }`}
          />
          <p
            id="inputFeedback-helper-text"
            className={`mt-1 text-sm ${
              errors.feedback && touched.feedback
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            {errors.feedback && touched.feedback ? errors.feedback : ""}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-white ${
            isValid
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-indigo-400/60 cursor-not-allowed"
          } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
          disabled={!isValid}
        >
          Send
        </button>
      </div>
    </form>
  );
}
