import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const EditProduct = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { products, setProducts } = useContext(ProductContext);

  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    image: "",
    rating: "",
  });

  useEffect(() => {
    let product = state?.product;

    if (!product && products.length > 0) {
      product = products.find((item) => String(item.id) === String(id));
    }

    if (product) {
      setForm({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        brand: product.brand,
        image: product.image,
        rating: product.rating,
      });
    }
  }, [id, state, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProducts = products.map((item) =>
      String(item.id) === String(form.id) ? { ...item, ...form } : item
    );

    setProducts(updatedProducts); // ✅ Update context
    localStorage.setItem("allProducts", JSON.stringify(updatedProducts)); // Optional for persistence

    alert("Product updated successfully!");
    navigate(`/admin/viewproduct/${form.id}`, { state: { product: form } });
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Brand</label>
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-12">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-control"
            rows={3}
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Rating (out of 5)</label>
          <input
            type="number"
            name="rating"
            min={0}
            max={5}
            step={0.1}
            value={form.rating}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select</option>
            <option value="Mens Wear">Mens Wear</option>
            <option value="Womens Wear">Womens Wear</option>
            <option value="Kids Wear">Kids Wear</option>
          </select>
        </div>

        <div className="col-md-12">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
