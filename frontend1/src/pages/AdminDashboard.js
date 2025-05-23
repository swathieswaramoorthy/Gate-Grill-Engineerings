import React, { useEffect, useState } from "react";
import "./AdminDashboard.css"; // optional: for styling
import axios from "axios";

//import Navbar from "../components/NavBar_admin"; 

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("orders");
  const [data, setData] = useState([]);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchSectionData(activeSection);
  }, [activeSection]);

  const fetchSectionData = async (section) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/admin/${section}`
      );
      setData(response.data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };
  // form for adding the products
  const [form, setForm] = useState({
  name: "",
  price: "",
  description: "",
  stock: "",
  category: "",
  seller: ""
});
const [imageFile, setImageFile] = useState(null);

const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleImageChange = (e) => {
  setImageFile(e.target.files[0]);
};

const handleAddProduct = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  for (let key in form) {
    formData.append(key, form[key]);
  }
  formData.append("image", imageFile);

  try {
    await axios.post(`${backendUrl}/api/admin/add-product`, formData);
    alert("Product added!");
    setForm({
      name: "",
      price: "",
      description: "",
      stock: "",
      category: "",
      seller: ""
    });
    setImageFile(null);
  } catch (err) {
    console.error("Add Product Error:", err);
    alert("Failed to add product");
  }
};


  return (
      //  <>
      // <Navbar /> {/* Admin Navbar */}
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="button-group">
        <button onClick={() => setActiveSection("orders")}>Orders</button>

        <button onClick={() => setActiveSection("contacts")}>Contacts</button>
        <button onClick={() => setActiveSection("feedback")}>Feedback</button>
        <button onClick={() => setActiveSection("custom-designs")}>Customized Designs</button>
        <button onClick={() => setActiveSection("add-products")}>➕   Add Products</button>

      </div>

      <div className="data-section">
        <h2>{activeSection.replace("-", " ").toUpperCase()}</h2>

        {activeSection === "orders" && data.length === 0 && (
          <p>No order data available yet.</p>
        )}
        
        {activeSection === "add-products" && (
  <div className="add-product-form">
    <h3>Add New Product</h3>
    <form onSubmit={handleAddProduct} encType="multipart/form-data">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      ></textarea>
      <input
        type="text"
        name="stock"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="seller"
        placeholder="Seller"
        value={form.seller}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  </div>
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
    <p><strong>Customer Name:</strong> {item.customerName}</p>
    <p><strong>Customer Email:</strong> {item.customerEmail}</p>
    <p><strong>Order Date:</strong> {new Date(item.createdAt).toLocaleString()}</p>
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
