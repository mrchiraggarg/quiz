import React from 'react'
import LogoMain from "../assets/wowlogo.png"

const NavBar = () => {
  const path = window.location.pathname
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
  <div className="container-fluid">
          <a className="navbar-brand" href="/"><img src={LogoMain} alt="logo"></img></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className={path==="/"?"nav-link active":"nav-link"} aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className={path==="/quiz"?"nav-link active":"nav-link"} aria-current="page" href="/quiz">Quiz</a>
        </li>
        <li className="nav-item">
          <a className={path==="/blog"?"nav-link active":"nav-link"} aria-current="page" href="/blog">Blog</a>
        </li>
      </ul>
      <div className="d-flex align-items-center">  
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">    
        <li className="nav-item">
          <a className={path==="/about-us"?"nav-link active":"nav-link"} aria-current="page" href="/about-us">About us</a>
        </li>
        <li className="nav-item">
          <a className={path==="/social"?"nav-link active":"nav-link"} aria-current="page" href="/social">Social</a>
        </li>
        <li className="nav-item">
          <a className={path==="/contact-us"?"nav-link active":"nav-link"} aria-current="page" href="/contact-us">Contact us</a>
        </li>      
      </ul>
        <div className="mx-4">
          <div id="google_translate_element"></div>
        </div>
      </div>
    </div>
  </div>
</nav>
    </div>
  )
}

export default NavBar