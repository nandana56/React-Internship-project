import React, { createContext, useState, useEffect } from "react";
import initialProducts from "../Products/productData"; // your static file

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("allProducts");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setProducts(parsed);
        } else {
          throw new Error("Invalid format");
        }
      } catch {
        setProducts(initialProducts);
        localStorage.setItem("allProducts", JSON.stringify(initialProducts));
      }
    } else {
      setProducts(initialProducts);
      localStorage.setItem("allProducts", JSON.stringify(initialProducts));
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("allProducts", JSON.stringify(products));
    }
  }, [products]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
