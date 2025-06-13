import React from "react";
import ProductList from "./ProductList";
import products from "./productData"; // Move your `products` array into its own file like productData.js

const MensWear = () => <ProductList category="Mens Wear" products={products} />;
export default MensWear;
