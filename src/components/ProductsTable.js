import React, { useState, useEffect, useCallback } from 'react';
import './ProductsTable.css';

const BASE_URL = "http://127.0.0.1:8000/products/";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}?page=${page}`);
      const data = await response.json();

      setProducts(data.results);
      setCurrentPage(data.page);
      setTotalPages(data.total_pages);
      setHasPrevious(!!data.previous);
      setHasNext(!!data.next);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchProducts(page);
    }
  };

  const handlePrev = () => {
    if (hasPrevious) {
      fetchProducts(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      fetchProducts(currentPage + 1);
    }
  };

  const truncateDescription = (description, maxLength = 50) => {
    if (!description) return 'No description';
    if (description.length <= maxLength) return description;
    return `${description.substring(0, maxLength)}...`;
  };

  return (
    <div className="products-table-container">
      <div className="table-header">
        <h2>📋 Product List</h2>
        <p>Browse all available products with pagination</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <span>Loading products...</span>
        </div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td data-label="ID">{product.id}</td>
                    <td data-label="Name">{product.name}</td>
                    <td data-label="Description">{truncateDescription(product.description)}</td>
                    <td data-label="Price">₹{product.price}</td>
                    <td data-label="Category">
                      <span className="category-badge">{product.category}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-controls">
            <button
              onClick={handlePrev}
              disabled={!hasPrevious}
              className="pagination-btn"
            >
              ← Previous
            </button>

            <div className="page-info">
              <span>Page</span>
              <select
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                className="page-select"
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </select>
              <span>of {totalPages}</span>
            </div>

            <button
              onClick={handleNext}
              disabled={!hasNext}
              className="pagination-btn"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsTable;