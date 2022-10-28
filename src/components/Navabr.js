import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function Navabr() {
    let location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(location.pathname);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/Login")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                       {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                            <Link className="btn btn-primary btn-sm mx-2" to="/Login" role="button">LogIn</Link>
                            <Link className="btn btn-primary btn-sm mx-2" to="/Signup" role="button">SignUp</Link>
                        </form> : <button type="button" className="btn btn-primary btn-sm" onClick={handleLogout} >Log Out</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
