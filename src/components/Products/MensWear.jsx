import React, { useContext } from "react";
import ProductList from "./ProductList";
import { ProductContext } from "../context/ProductContext";

const MensWear = () => {
  const { products } = useContext(ProductContext);
  return <ProductList category="Mens Wear" />;
};

export default MensWear;
