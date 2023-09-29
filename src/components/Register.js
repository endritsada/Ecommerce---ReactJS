import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUsers, getLoggedInUser } from '../storage/lc'


function Register() {
    const [mesage, setMessage] = useState()
    const navigate=useNavigate()
    
    useEffect(()=>{
        if (getLoggedInUser() == null) navigate('')    
    }, [])

    const handleRegister = e => {
        e.preventDefault()

        const user = {
            fullname: e.target.elements[0].value,
            email: e.target.elements[1].value,
            password: e.target.elements[2].value,
        }   

        const users = getUsers()
        
        if(users.length > 0){
            const user_exists = users.filter(Is_user => Is_user.email == user.email)
            
            if(user_exists.length > 0){
                setMessage('User with' + user.email + 'already exists!')
            }   else {
                localStorage.setItem('users', JSON.stringify([...users, user]))
                navigate('/login'); 
            }
        } else {
            localStorage.setItem('users', JSON.stringify([user]))
            navigate('/login')
        }
    }
    const navigateRegister = () =>{
        navigate ('./login') 
    }
  return (
<section className="py-5">
      <div className="container d-flex justify-content-center">
        <div className="card w-50">
          <div className="card-body">
            <h5 className="card-title mb-4">Register</h5>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">Fullname</label>
                <input type="text" className="form-control" required id="fullname" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" required id="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" required id="password" />
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
              <Link to="/login" className="btn btn-link ms-3">Login</Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  )  
}

export default Register