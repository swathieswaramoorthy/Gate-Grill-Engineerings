import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch("http://localhost:8000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Saved to DB:", data);
        setSubmitted(true); // Show success message
        setFormData({ name: "", email: "", message: "" }); // Clear the form
      })
      .catch(err => console.error(err));
  };
  

  return (
    <div className="contact-page-container">
      <div className="container contact-page">
        <h2 className="text-center mb-4">Contact Us</h2>

        <div className="row">
          {/* Contact Form */}
          <div className="col-md-7">
            {submitted && (
              <div className="alert alert-success">
                Thank you! We'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="p-4 contact-form shadow-sm bg-white rounded">
              <div className="mb-3">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control styled-input"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Your Email</label>
                <input
                  type="email"
                  className="form-control styled-input"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control styled-input"
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="col-md-5 d-flex flex-column justify-content-center mt-4 mt-md-0">
            <div className="info-box shadow-sm p-4 bg-white rounded">
              <h5>Shri Balaji Engineering</h5>
              <p><strong>Address:</strong> Erode, Tamil Nadu, India</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Email:</strong> contact@balajiengineering.com</p>
              <p><strong>Hours:</strong> Mon - Sat, 9am - 6pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
