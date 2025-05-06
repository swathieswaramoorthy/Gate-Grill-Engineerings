import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const categories = ["All", "Shed", "Steps", "Gates", "Windows", "Grills"];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const query = `?keyword=${keyword || ""}&category=${selectedCategory}`;
    navigate(`/search${query}`);
  };

  return (
    <div className="search-container">
      {/* Category Dropdown */}
      <div className="category-dropdown" ref={dropdownRef}>
        <button
          className="category-button"
          onClick={() => setDropdownVisible((prev) => !prev)}
        >
          <strong>{selectedCategory}</strong> <span className="arrow">▼</span>
        </button>
        {dropdownVisible && (
          <ul className="category-menu">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setDropdownVisible(false);
                }}
              >
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Keyword Input */}
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {/* Search Button */}
      <button className="search-icon-button" onClick={handleSearch}>
        <i className="fa fa-search" />
      </button>
    </div>
  );
}
