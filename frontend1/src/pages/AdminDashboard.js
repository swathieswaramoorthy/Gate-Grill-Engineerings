import React, { useEffect, useState } from "react";
import "./AdminDashboard.css"; // optional: for styling
import axios from "axios";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchSectionData(activeSection);
  }, [activeSection]);

  const fetchSectionData = async (section) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/${section}`
      );
      setData(response.data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="button-group">
        <button onClick={() => setActiveSection("contacts")}>Contacts</button>
        <button onClick={() => setActiveSection("feedback")}>Feedback</button>
        <button onClick={() => setActiveSection("custom-designs")}>Customized Designs</button>
      </div>

      <div className="data-section">
        <h2>{activeSection.replace("-", " ").toUpperCase()}</h2>

        {activeSection === "orders" && data.length === 0 && (
          <p>No order data available yet.</p>
        )}

        {data.length === 0 ? (
          <p>Loading or no entries found.</p>
        ) : (
          data.map((item, index) => (
            <div key={index} className="entry-box">
              {activeSection === "contacts" && (
                <>
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Email:</strong> {item.email}</p>
                  <p><strong>Message:</strong> {item.message}</p>
                </>
              )}

              {activeSection === "feedback" && (
                <>
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Email:</strong> {item.email}</p>
                  <p><strong>Feedback:</strong> {item.feedback}</p>
                </>
              )}

              {activeSection === "custom-designs" && (
                <>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Image:</strong></p>
                  <img
                    src={`http://localhost:8000/uploads/${item.imageUrl}`}
                    alt="Custom Design"
                    style={{ width: "200px", height: "auto" }}
                  />
                </>
              )}

              {activeSection === "orders" && (
                <>
                  <p><strong>Product:</strong> {item.productName}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>User:</strong> {item.userName}</p>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
