import React, { useRef, useEffect } from "react";
import "./header.css";
import { motion } from "framer-motion";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Container, Row } from "reactstrap";
import userIcon from "../../assets/images/user-icon.png";
import { useSelector } from "react-redux";

import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

import {toast} from 'react-toastify'
import styled from 'styled-components'

const AuthButton = styled(Link)`
  padding: 0px 20px;
  margin: 0 10px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  text-align: center;
  

  &:hover {
    background-color: #0056b3;
  }
`;
const nav__link = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "hospital",
    display: "Hospitals",
  },
  {
    path: "pharmacy",
    display: "Pharmacies",
  }
];

const Header = () => {
  const headerRef = useRef(null);
  // const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionRef = useRef(null);
  

  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const stickyHeaderFunc = () => {
    const handleScroll = () => {

      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__menu");
      } else {
        headerRef.current.classList.remove("sticky__menu");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener ("scroll", handleScroll)
    }
  };


  const logout = () =>  {
    signOut(auth).then(()=>{
      toast.success('Logged Out')
      navigate('/home')
    }).catch(err=>{
      toast.error(err.message)
    })
  }

  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");


  const toggleProfileActions = () =>   
 {  
  const profileActions = profileActionRef.current;
  profileActions.style.display = profileActions.style.display === "none" ? "block" : "none";
 }

   
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
            
              <div>
              
                <h1>
                  25HEALTHCARE</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__link.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
              
            </div>
            

            <div className="nav__icons">
              

              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt=""
                  onClick={toggleProfileActions}
                />
                
              </div>
                  <div className="auth-buttons">
                      {!currentUser ? (
                        <>
                          <AuthButton to="/login">Login</AuthButton>
                          <AuthButton to="/signup">Signup</AuthButton>
                        </>
                      ) : (
                        <AuthButton as="button" onClick={logout}>Logout</AuthButton>
                      )}
                  </div>

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i class="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

