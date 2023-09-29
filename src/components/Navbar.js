import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from '../storage/lc';

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('loggedin');
  }

  // Get the user object from getLoggedInUser()
  const user = getLoggedInUser();

  return (
    <nav>
      <ul className="nav d-flex justify-content-center justify-content-lg-center ms-4 w-100 ">
        <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/cart" className="nav-link">Cart</Link>
        </li>
        {user ? (
          <>
            <li className="nav-item">
              <span className="nav-link">{user.email}</span>
            </li>
            <li className='nav-item'>
              <button className="nav-link" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
