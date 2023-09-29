import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import {useEffect, useState,} from 'react'
import { getLoggedInUser, getUsers } from '../storage/lc'
function Login() {

    const [message, setMessage] = useState()
    const navigate = useNavigate()

  
    useEffect(() => {
      if(getLoggedInUser() == null);
    }, [])

    const handleLogin = e => {
        e.preventDefault();
        const user = {
          email: e.target.elements[0].value, 
          password: e.target.elements[1].value,
        };
      
        const users = getUsers();
      
        if (users.length > 0) {
          const userExists = users.find(u => u.email === user.email && u.password === user.password);
          if (userExists) {
            localStorage.setItem('loggedin', JSON.stringify(user));
            navigate('/');
          } else {
            setMessage('Incorrect email and password');
          }
        } else {
          setMessage('User with ' + user.email + ' does not exist!');
        }
      }
      




  return (
    <section className="py-5">
    <div className="container d-flex justify-content-center">
      <div className="card w-50">
        <div className="card-body">
          <h5 className="card-title mb-4">Login</h5>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <Link to="/register" className="btn btn-link ms-3">Register</Link>
          </form>
        </div>
      </div>
    </div>
  </section>  )
}

export default Login