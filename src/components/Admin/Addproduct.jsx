import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext"; // Adjust path accordingly

const AddProduct = () => {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductContext); // ✅ Using context
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    image: "",
    rating: "",
  });

  const categories = ["Mens Wear", "Womens Wear", "Kids Wear"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    const { name, description, price, category, brand, image, rating } = form;

    if (!name || !description || !price || !category || !brand || !image || !rating) {
      alert("Please fill all fields.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      description,
      price: parseFloat(price),
      category,
      brand,
      image,
      rating: parseFloat(rating),
    };

    const updatedProducts = [...products, newProduct];

    setProducts(updatedProducts); // ✅ Update context
    localStorage.setItem("allProducts", JSON.stringify(updatedProducts)); // ✅ Persist to storage

    alert("Product added successfully!");
    navigate(`/admin/viewproduct/${newProduct.id}`);
  };

  return (
    <div className="container my-4">
      <h2>Add New Product</h2>
      <div className="form-group mb-3">
        <label>Name</label>
        <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} />
      </div>
      <div className="form-group mb-3">
        <label>Description</label>
        <textarea className="form-control" name="description" value={form.description} onChange={handleChange} />
      </div>
      <div className="form-group mb-3">
        <label>Price</label>
        <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} />
      </div>
      <div className="form-group mb-3">
        <label>Category</label>
        <select className="form-select" name="category" value={form.category} onChange={handleChange}>
          <option value="">-- Select Category --</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="form-group mb-3">
        <label>Brand</label>
        <input type="text" className="form-control" name="brand" value={form.brand} onChange={handleChange} />
      </div>
      <div className="form-group mb-3">
        <label>Image URL (e.g. /Photos/image1.jpeg)</label>
        <input type="text" className="form-control" name="image" value={form.image} onChange={handleChange} />
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
          />
        )}
      </div>
      <div className="form-group mb-3">
        <label>Rating</label>
        <input
          type="number"
          className="form-control"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          step="0.1"
          min="0"
          max="5"
        />
      </div>
      <button className="btn btn-primary" onClick={handleAddProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
