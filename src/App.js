// import React, { useState, useRef, useCallback } from 'react';
// import './App.css';

// function App() {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
  
//   const limit = 20;
//   const suggestionsRef = useRef(null);

//   // Load products from API
//   const loadProducts = useCallback(async (reset = false) => {
//     if (loading) return;
    
//     const currentOffset = reset ? 0 : offset;
//     const searchQuery = query.trim();
    
//     if (searchQuery.length === 0) {
//       setSuggestions([]);
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/products/?q=${searchQuery}&limit=${limit}&offset=${currentOffset}`
//       );
//       const data = await response.json();

//       if (reset) {
//         setSuggestions(data.results);
//         setOffset(limit);
//       } else {
//         setSuggestions(prev => [...prev, ...data.results]);
//         setOffset(prev => prev + limit);
//       }

//       setHasMore(data.results.length === limit);
//     } catch (error) {
//       console.error('Error loading products:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [query, offset, loading, limit]);

//   // Handle input change
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     setSelectedProduct(null);
//     setOffset(0);
//     setHasMore(true);
    
//     if (value.trim().length === 0) {
//       setSuggestions([]);
//     } else {
//       loadProducts(true);
//     }
//   };

//   // Handle scroll in suggestions dropdown
//   const handleScroll = useCallback((e) => {
//     const container = e.target;
//     if (
//       container.scrollTop + container.clientHeight >= container.scrollHeight - 10 &&
//       hasMore &&
//       !loading &&
//       query.trim().length > 0
//     ) {
//       loadProducts(false);
//     }
//   }, [hasMore, loading, query, loadProducts]);

//   // Show product details
//   const showDetails = (product) => {
//     setSelectedProduct(product);
//   };

//   return (
//     <div className="App">
//       {/* Animated Background */}
//       <div className="animated-bg"></div>
      
//       {/* Header Section */}
//       <header className="hero-section">
//         <div className="hero-content">
//           <div className="logo-wrapper">
//             <div className="logo-icon">
//               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </div>
//             <h1 className="logo-text">Product<span>Hub</span></h1>
//           </div>
//           <h2 className="hero-title">Discover Your Next Favorite Product</h2>
//           <p className="hero-subtitle">Search through thousands of products with intelligent suggestions</p>
//         </div>
//       </header>

//       {/* Search Section */}
//       <div className="search-section">
//         <div className="container">
//           <div className="search-card">
//             <div className="search-header">
//               <div className="search-icon">
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//                   <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 placeholder="What are you looking for today?"
//                 value={query}
//                 onChange={handleInputChange}
//                 className="search-input"
//               />
//               {query && (
//                 <button className="clear-btn" onClick={() => {
//                   setQuery('');
//                   setSuggestions([]);
//                   setSelectedProduct(null);
//                 }}>
//                   ✕
//                 </button>
//               )}
//             </div>
            
//             {suggestions.length > 0 && (
//               <div
//                 className="suggestions-dropdown"
//                 ref={suggestionsRef}
//                 onScroll={handleScroll}
//               >
//                 <div className="suggestions-header">
//                   <span>🎯 Suggestions</span>
//                   <span className="results-count">{suggestions.length} results</span>
//                 </div>
//                 {suggestions.map((product, index) => (
//                   <div
//                     key={index}
//                     className="suggestion-item"
//                     onClick={() => showDetails(product)}
//                   >
//                     <div className="product-info">
//                       <div className="product-name">
//                         <strong>{product.name}</strong>
//                         <span className="product-category-badge">{product.category}</span>
//                       </div>
//                       <div className="product-meta">
//                         <span className="product-price">₹{product.price}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 {loading && (
//                   <div className="loading-more">
//                     <div className="spinner"></div>
//                     <span>Loading more products...</span>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
          
//           {/* Product Details Section */}
//           {selectedProduct && (
//             <div className="details-card">
//               <button className="close-details" onClick={() => setSelectedProduct(null)}>
//                 ✕
//               </button>
//               <div className="details-header">
//                 <div className="product-badge">Premium Product</div>
//                 <h3>{selectedProduct.name}</h3>
//               </div>
//               <div className="details-content">
//                 <p className="product-description">{selectedProduct.description}</p>
//                 <div className="product-features">
//                   <div className="feature-item">
//                     <span className="feature-label">💰 Price</span>
//                     <span className="feature-value">₹{selectedProduct.price}</span>
//                   </div>
//                   <div className="feature-item">
//                     <span className="feature-label">📂 Category</span>
//                     <span className="feature-value">{selectedProduct.category}</span>
//                   </div>
//                 </div>
//                 <button className="action-btn">
//                   View Details →
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="footer">
//         <p>© 2024 ProductHub. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;



import React, { useState, useRef, useCallback, useEffect } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  const limit = 20;
  const suggestionsRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Debounce search query to avoid too many API calls
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query]);

  // Reset search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      resetAndSearch();
    } else if (debouncedQuery.trim().length === 0) {
      setSuggestions([]);
      setSelectedProduct(null);
    }
  }, [debouncedQuery]);

  // Load products from API
  const loadProducts = useCallback(async (reset = false) => {
    if (loading) return;
    
    const currentOffset = reset ? 0 : offset;
    const searchQuery = debouncedQuery.trim();
    
    if (searchQuery.length === 0) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      // Try to search for exact matches first
      let url = `http://127.0.0.1:8000/products/?q=${encodeURIComponent(searchQuery)}&limit=${limit}&offset=${currentOffset}`;
      
      const response = await fetch(url);
      const data = await response.json();

      let results = data.results || [];

      // If no results and query is a number, try searching for products containing that number
      if (results.length === 0 && !isNaN(searchQuery) && searchQuery.length > 0) {
        // Try to get all products and filter client-side for better matching
        const allProductsUrl = `http://127.0.0.1:8000/products/?limit=100&offset=0`;
        const allResponse = await fetch(allProductsUrl);
        const allData = await allResponse.json();
        
        if (allData.results) {
          // Filter products where name or price contains the search query
          results = allData.results.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.price.toString().includes(searchQuery) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
          
          // Apply pagination manually
          const start = currentOffset;
          const end = currentOffset + limit;
          results = results.slice(start, end);
        }
      }

      if (reset) {
        setSuggestions(results);
        setOffset(limit);
      } else {
        setSuggestions(prev => [...prev, ...results]);
        setOffset(prev => prev + limit);
      }

      setHasMore(results.length === limit);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, offset, loading, limit]);

  const resetAndSearch = () => {
    setSelectedProduct(null);
    setOffset(0);
    setHasMore(true);
    setSuggestions([]);
    loadProducts(true);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  // Handle scroll in suggestions dropdown
  const handleScroll = useCallback((e) => {
    const container = e.target;
    if (
      container.scrollTop + container.clientHeight >= container.scrollHeight - 10 &&
      hasMore &&
      !loading &&
      debouncedQuery.trim().length > 0
    ) {
      loadProducts(false);
    }
  }, [hasMore, loading, debouncedQuery, loadProducts]);

  // Show product details
  const showDetails = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="App">
      <div className="animated-bg"></div>
      
      <header className="hero-section">
        <div className="hero-content">
          <div className="logo-wrapper">
            <div className="logo-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="logo-text">Product<span>Hub</span></h1>
          </div>
          <h2 className="hero-title">Discover Your Next Favorite Product</h2>
          <p className="hero-subtitle">Search through thousands of products with intelligent suggestions</p>
        </div>
      </header>

      <div className="search-section">
        <div className="container">
          <div className="search-card">
            <div className="search-header">
              <div className="search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="What are you looking for today? (Try searching 4000)"
                value={query}
                onChange={handleInputChange}
                className="search-input"
              />
              {query && (
                <button className="clear-btn" onClick={() => {
                  setQuery('');
                  setDebouncedQuery('');
                  setSuggestions([]);
                  setSelectedProduct(null);
                  setOffset(0);
                }}>
                  ✕
                </button>
              )}
            </div>
            
            {loading && suggestions.length === 0 && (
              <div className="loading-initial">
                <div className="spinner"></div>
                <span>Searching products...</span>
              </div>
            )}
            
            {suggestions.length > 0 && (
              <div
                className="suggestions-dropdown"
                ref={suggestionsRef}
                onScroll={handleScroll}
              >
                <div className="suggestions-header">
                  <span>🎯 Suggestions for "{debouncedQuery}"</span>
                  <span className="results-count">{suggestions.length} results</span>
                </div>
                {suggestions.map((product, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => showDetails(product)}
                  >
                    <div className="product-info">
                      <div className="product-name">
                        <strong>{product.name}</strong>
                        <span className="product-category-badge">{product.category}</span>
                      </div>
                      <div className="product-meta">
                        <span className="product-price">₹{product.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="loading-more">
                    <div className="spinner"></div>
                    <span>Loading more products...</span>
                  </div>
                )}
              </div>
            )}
            
            {!loading && suggestions.length === 0 && debouncedQuery && (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h4>No products found</h4>
                <p>Try searching with different keywords</p>
              </div>
            )}
          </div>
          
          {selectedProduct && (
            <div className="details-card">
              <button className="close-details" onClick={() => setSelectedProduct(null)}>
                ✕
              </button>
              <div className="details-header">
                <div className="product-badge">Premium Product</div>
                <h3>{selectedProduct.name}</h3>
              </div>
              <div className="details-content">
                <p className="product-description">{selectedProduct.description || 'No description available'}</p>
                <div className="product-features">
                  <div className="feature-item">
                    <span className="feature-label">💰 Price</span>
                    <span className="feature-value">₹{selectedProduct.price}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-label">📂 Category</span>
                    <span className="feature-value">{selectedProduct.category}</span>
                  </div>
                </div>
                <button className="action-btn">
                  View Details →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>© 2024 ProductHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;