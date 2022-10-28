import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });


  const handleClickSubmit = async (e) => {
    const { name, email, password } = credentials;
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();
    console.log(json)

    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken)   // auth-token save local storage
      //replace set to true
      navigate('/Login', { replace: true });
      props.showAlert('Account has been Created Successfully', 'success')   // JavaScript native alert
    }
    else {
      props.showAlert('Invalid Details', 'danger')   // JavaScript native alert
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className='container'>
      <h3><strong>Sign Up</strong></h3>
      <p>Please fill in this form to create an account.</p>
      <hr />

      <form className='container my-5' onSubmit={handleClickSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="password" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required />
        </div>

        <div className="my-4">
          {/* <button type="button" className="btn btn-primary btn-sm mx-1">Cancel Button</button> */}
          <button type="submit" className="btn btn-primary btn-sm mx-1">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Signup;

