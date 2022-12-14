import React, { useEffect, useState } from "react";
import "../../assets/css/home/bootstrap.min.css";
import "../../assets/css/home/agency.min.css";
import { Link, useHistory } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import "./Header.css";
import firebase from "firebase";
import logo from "../../assets/img/avatar.png";

function Header() {
  const db = firebase.firestore();
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({ name: "" });
  let history = useHistory();

  useEffect(() => {
    const func = async () => {
      var id = localStorage.getItem("token");
      if (localStorage.getItem("token") == null) {
        console.log("not logged in");
      } else {
        const cityRef = db.collection("AdminAccounts").doc(id);
        const doc = await cityRef.get();
        if (!doc.exists) {
          console.log("No such document!");
          setAuth(false);
          history.push("/");
        } else {
          console.log("Document data:", doc.data());
          setUser({ name: doc.data().userName });
          setAuth(true);
        }
      }
    };
    func();
  }, []);
  function logout() {
    localStorage.setItem("token", null);
    history.push("/");
  }

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark Header__height py-lg-1"
        id="mainNav"
      >
        <div className="container">
          <a className="navbar-brand" href="#page-top">
            <img
              className="Header_imageWidth"
              src={logo}
              alt="..."
              height={"45px"}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fa fa-bars ms-1"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#portfolio">
                  Portfolio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#team">
                  Team
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
              <li className={auth ? `nav-item` : `home__hide_adminPannel`}>
                <Link to="/adminPannel" className="nav-link">
                  Admin Pannel
                </Link>
              </li>
              <li className={auth ? `nav-item` : `home__hide_adminPannel`}>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={user.name}
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="#action/3.1" onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
