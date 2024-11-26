import React from "react";
import { NavLink } from "react-router-dom";
import "./StudentNavbar.css";
import jwt_decode from 'jwt-decode';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const StudentNavbar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [profileIcon, setProfileIcon] = useState("");
  const [showDropDown, setDropDown] = useState(false);
  const [stream, setStream] = useState('');
  const [studentCode, setStudentCode] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setName(decodedToken.studentName);
        setStream(decodedToken.studentStream);
        setStudentCode(decodedToken.studentCode);
        // If the role is not 'student', redirect to login page
        // if (decodedToken.role === 'student') {
        //   navigate('/student-dashboard');
        // }
      } catch (error) {
        console.error('Invalid Token:', error);
        navigate('/student-login');
      }
    }
  }, []);
  useEffect(() => {
    if (name) {
      setProfileIcon(name.charAt(0).toUpperCase());
    }
  }, [name, studentCode, stream]);

  function handleProfileClick() {
    setDropDown(!showDropDown)
  }

  function logout() {
    localStorage.removeItem('authToken');
    navigate('/');
  }

  return (
    <nav className="navbar-student">
      {/* Left Section: Links */}

      <div className="welcome-text">
        <p id="Welcome-para">Welcome, </p>
        <span className="username">{name}</span>
      </div>
      <div className="student-navber-links">
        <ul className="nav-links-student">
          <li>
            <NavLink
              to="/student-dashboard"
              className={({ isActive }) => (isActive ? "active-link-student-navbar" : "")}
            >
              All Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student-dashboard/my-job"
              className={({ isActive }) => (isActive ? "active-link-student-navbar" : "")}
            >
              Your Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student-dashboard/applied-jobs"
              className={({ isActive }) => (isActive ? "active-link-student-navbar" : "")}
            >
              Applied Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/announcements"
              className={({ isActive }) => (isActive ? "active-link-student-navbar" : "")}
            >
              Announcements
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/place-student"
              className={({ isActive }) => (isActive ? "active-link-student-navbar" : '')}
            >
              Place Student
            </NavLink>
          </li>
        </ul>
        <div className="profile-contanier">
          <div className="profile-icon" onClick={handleProfileClick}>
            {/* <img
            src="https://via.placeholder.com/40"
            alt="Profile Icon"
          /> */}

            <p className="profile">{profileIcon}</p>
          </div>
        
        {showDropDown && (
          <div className="drop-down-menu">
            <p>Name : {name}</p>
            <p>Stram : {stream} </p>
            <p>{studentCode}</p>
            <button onClick={logout}>Logout</button>

          </div>
        )}
      </div>
      </div>
      {/* Right Section: Profile Icon and Welcome Text */}





    </nav >
  );
};

export default StudentNavbar;