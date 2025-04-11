import React, { Fragment, useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";


export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/products?" + searchParams)
      .then((res) => res.json())
      .then((res) => setProducts(res.products));
  }, [searchParams]);

  const handleExit = () => {
    navigate("/");
  };

  const handleImageUpload = (e) => {
    setUploadedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = () => {
    // Simulate form submission
    console.log("Submitted:", { image: uploadedImage, text: textContent });
  
    // Show success toast
    toast.success("Design submitted successfully!");
  
    // Clear form data
    setUploadedImage(null);
    setTextContent("");
  
    // Close modal
    setShowModal(false);
  };
  
  return (
    <Fragment>
      {/* Top-right Customize Button */}
      <div className="top-bar-actions">
        <button className="customize-btn" onClick={() => setShowModal(true)}>
          Customize Your Design
        </button>
      </div>

      <h1 id="products_heading">AVAILABLE DESIGNS</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>

      {/* Exit Button */}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button className="exit-btn" onClick={handleExit}>Exit</button>
      </div>

      {/* Modal */}
      {showModal && (
  <>
    <div className="modal-overlay" onClick={() => setShowModal(false)} />
    <div className="customize-modal">
      <h2>Upload your design or describe it</h2>

      <label htmlFor="file-upload" className="custom-file-upload">
        Upload File
      </label>
      <input
        id="file-upload"
        type="file"
        style={{ display: "none" }}
        onChange={(e) => setUploadedImage(e.target.files[0])}
      />

      {/* Show uploaded file name */}
      {uploadedImage && (
        <p className="file-name">File Uploaded: {uploadedImage.name}</p>
      )}

      <textarea
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
        placeholder="Describe your custom design..."
      />

      <div>
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        <button className="cancel-btn" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  </>
)}


    </Fragment>
  );
}
