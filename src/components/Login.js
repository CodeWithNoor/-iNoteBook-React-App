import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json)

    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken)   // auth-token save local storage
      //replace set to true
      navigate('/', { replace: true });
    }
    else {
      alert("Invalid Credentials");   // JavaScript native alert
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container'>
      <h3><strong>Login</strong></h3>
      <hr />

      <form className='container my-5' onSubmit={handleClickSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} />
        </div>
        <button type="submit" className="btn btn-primary btn-sm">Submit</button>
      </form>
    </div>
  )
}

export default Login
