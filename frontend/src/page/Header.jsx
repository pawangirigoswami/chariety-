import React from 'react'
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <div>
<div style={{
    position:"fixed",
    zIndex:"2",
    width:"100%"
}}>
<header className="site-header" >
        <div className="container">
            <div className="row">

                <div className="col-lg-8 col-12 d-flex flex-wrap">
                    <p className="d-flex me-4 mb-0">
                        <i className="bi-geo-alt me-2"></i>
                        Akershusstranda 20, 0150 Oslo, Norway
                    </p>

                    <p className="d-flex mb-0">
                        <i className="bi-envelope me-2"></i>

                        <a href="mailto:info@company.com">
                            pawangoswami9424@gmail.com
                        </a>
                    </p>
                </div>

                <div className="col-lg-3 col-12 ms-auto d-lg-block d-none">
                    <ul className="social-icon">
                        <li className="social-icon-item">
                            <a href="#" className="social-icon-link bi-twitter"></a>
                        </li>

                        <li className="social-icon-item">
                            <a href="#" className="social-icon-link bi-facebook"></a>
                        </li>

                        <li className="social-icon-item">
                            <a href="#" className="social-icon-link bi-instagram"></a>
                        </li>

                        <li className="social-icon-item">
                            <a href="#" className="social-icon-link bi-youtube"></a>
                        </li>

                        <li className="social-icon-item">
                            <a href="#" className="social-icon-link bi-whatsapp"></a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </header>

    <nav className="navbar navbar-expand-lg bg-light shadow-lg">
        <div className="container">
            <a className="navbar-brand" href="index.html">
                <img src="assets/images/logo.png" className="logo img-fluid" alt="Kind Heart Charity"/>
                <span>
                    Kind Heart Charity
                    <small>Non-profit Organization</small>
                </span>
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                       
                        <Link to="/" className="nav-link click-scroll">Home</Link>
                    </li>

                    <li className="nav-item">
                       
                        <Link to="/about" className="nav-link click-scroll">About</Link>
                    </li>

                    <li className="nav-item">
                        
                        <Link to="/cause" className="nav-link click-scroll">Causes</Link>
                    </li>

                    <li className="nav-item">
                        
                        <Link to="/volunter" className="nav-link click-scroll">Volunteer</Link>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link click-scroll dropdown-toggle" href="#section_5"
                            id="navbarLightDropdownMenuLink" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">News</a>

                        <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                            <li>
                               
                                <Link to="/news" className="dropdown-item">News Details</Link>
                                </li>

                            
                        </ul>
                    </li>

                    <li className="nav-item">

                        <Link to="/contact" className="nav-link click-scroll">Contact</Link>
                    </li>

                    <li className="nav-item">
                    
                                            <Link to="/signup" className="nav-link click-scroll">sign up</Link>
                                        </li>
                                        <li className="nav-item">
                    
                                            <Link to="/login" className="nav-link click-scroll">login</Link>
                                        </li>

                   
                </ul>
            </div>
        </div>
    </nav>
    </div>

        
    </div>
  )
}

export default Header