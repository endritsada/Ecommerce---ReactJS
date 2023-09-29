import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    // Fetch data from API and set cart items on component mount
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setData(response.data);
        setCartItems(JSON.parse(localStorage.getItem('cart')) || []);
        setSortedProducts([...response.data].sort((a, b) => a.price - b.price));
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, []); // Add an empty dependency array here
  
  const handleKeyUp = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = sortedProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
    setSearchTerm(e.target.value);

    setFilteredData(filteredProducts);
  };

  const isItemInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
      setCartItems([...cartItems]); // Create a new array and set it
    } else {
      const newItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newItem]); // Create a new array and set it
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };
  
  const handleRemoveToCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCartItems); // Set the updated array
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };
  

  const shortenDescription = (description) => {
    if (description.length > 50) {
      return description.slice(0, 50) + '...';
    }
    return description;
  };

  const shortenTitle = (title) => {
    if (title.length > 15) {
      return title.slice(0, 15) + '...';
    }
    return title;
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const displayedProducts = (searchTerm ? filteredData : sortedProducts).slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNext = () => {
    // Update the current page when the "Next" button is clicked
    setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    // Update the current page when the "Prev" button is clicked
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAsc = () => {
    // Sort products by ascending order of prices
    const sorted = [...data].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
  };

  const handleDsc = () => {
    // Sort products by descending order of prices
    const sorted = [...data].sort((a, b) => b.price - a.price);
    setSortedProducts(sorted);
  };


  return (
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-8 col-sm-6" style={{width:'100%'}}>
              <div className="search" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  style={{ marginRight: '10px' }}
                  type="search"
                  placeholder="Type here to search for products"
                  onKeyUp={handleKeyUp}
                />
                <button onClick={handleAsc}>Asc</button>
                <button onClick={handleDsc}>Dsc</button>
              </div>
      
              <br></br>
      
              <div>
                <button onClick={handlePrev} disabled={currentPage === 1}>
                  Prev
                </button>
                <span> Page {currentPage} </span>
                <button
                  onClick={handleNext}
                  disabled={
                    currentPage * productsPerPage >=
                    (searchTerm ? filteredData : sortedProducts).length
                  }
                >
                  Next
                </button>
              </div>
      
              <div className="row">
                {displayedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="col-lg-3 col-md-4 col-sm-6 mb-4"
                    style={{ height: '500px', width: '400px' }}
                  >
                    <div className="card">
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.title}
                        style={{ width: '200px', height: '200px' }}
                      />
                      <div
                        className="card-body"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr 1fr',
                          gridTemplateRows: '4fr',
                          width:'100%',
                        }}
                      >
                        <h5 className="card-title">
                          {shortenTitle(product.title)}
                        </h5>
                        <p className="card-text">${product.price}</p>
                        <p className="card-text">
                          {shortenDescription(product.description)}
                        </p>
                        {isItemInCart(product.id) ? (
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleRemoveToCart(product)}
                          >
                            Remove from cart
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
      
      }
  

export default Home
