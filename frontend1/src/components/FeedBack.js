import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FeedBack.css";

const FeedbackPage = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);  // for success message
  const [error, setError] = useState(""); // for handling errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`${backendUrl}/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log("Feedback saved:", data);
          setSubmitted(true); // Show success message
          setError(""); // Reset error message
          setFormData({
            name: "",
            email: "",
            rating: "",
            message: "",
          });
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("An error occurred while submitting your feedback. Please try again.");
      });
  };

  return (
    <div className="container feedback-page mt-5">
      <h2 className="text-center mb-4">We value your feedback!</h2>

      {submitted && (
        <div className="alert alert-success text-center">
          Thank you for your feedback!
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white">
        {/* Name */}
        <div className="row mb-3 align-items-center">
          <label className="col-sm-3 col-form-label text-end">Name:</label>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control compact-input"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>
        </div>

        {/* Email */}
        <div className="row mb-3 align-items-center">
          <label className="col-sm-3 col-form-label text-end">Email:</label>
          <div className="col-sm-6">
            <input
              type="email"
              className="form-control compact-input"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Rating */}
        <div className="row mb-3 align-items-center">
          <label className="col-sm-3 col-form-label text-end">Rating:</label>
          <div className="col-sm-6">
            <select
              className="form-select compact-input"
              name="rating"
              required
              value={formData.rating}
              onChange={handleChange}
            >
              <option value="">Choose a rating</option>
              <option value="5">⭐️⭐️⭐️⭐️⭐️ (Excellent)</option>
              <option value="4">⭐️⭐️⭐️⭐️ (Good)</option>
              <option value="3">⭐️⭐️⭐️ (Average)</option>
              <option value="2">⭐️⭐️ (Poor)</option>
              <option value="1">⭐️ (Very Poor)</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="row mb-3 align-items-center">
          <label className="col-sm-3 col-form-label text-end">Message:</label>
          <div className="col-sm-6">
            <textarea
              className="form-control"
              name="message"
              rows="3"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your thoughts..."
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="row">
          <div className="col-sm-9 offset-sm-3">
            <button type="submit" className="btn btn-primary w-100">
              Submit Feedback
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeedbackPage;
