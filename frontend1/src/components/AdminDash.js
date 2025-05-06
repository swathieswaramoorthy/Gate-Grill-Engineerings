import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customDesigns, setCustomDesigns] = useState([]);

  useEffect(() => {
    // Simulate fetch calls or replace with your backend API
    fetchData();
  }, []);

  const fetchData = () => {
    // Replace these with actual API calls
    setContacts([{ name: "User A", message: "Need info about gates" }]);
    setFeedbacks([{ user: "User B", content: "Great service!" }]);
    setOrders([{ id: 1, item: "Iron Grill", quantity: 2 }]);
    setCustomDesigns([{ id: 1, file: "design1.png", description: "Custom sliding gate" }]);
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome, Admin</h2>

      <div className="dashboard-section">
        <h3>📨 Contact Messages</h3>
        <ul>
          {contacts.map((c, i) => (
            <li key={i}><strong>{c.name}</strong>: {c.message}</li>
          ))}
        </ul>
      </div>

      <div className="dashboard-section">
        <h3>📝 Feedback</h3>
        <ul>
          {feedbacks.map((f, i) => (
            <li key={i}><strong>{f.user}</strong>: {f.content}</li>
          ))}
        </ul>
      </div>

      <div className="dashboard-section">
        <h3>📦 Orders</h3>
        <ul>
          {orders.map((o) => (
            <li key={o.id}>Order #{o.id}: {o.item} x {o.quantity}</li>
          ))}
        </ul>
      </div>

      <div className="dashboard-section">
        <h3>🎨 Custom Designs</h3>
        <ul>
          {customDesigns.map((d) => (
            <li key={d.id}>
              <strong>Description:</strong> {d.description} <br />
              <img src={`/uploads/${d.file}`} alt="Custom Design" width="100" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
