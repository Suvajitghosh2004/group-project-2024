import React from "react";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
//import "./StudentNavbar.css";
//import jwt_decode from 'jwt-decode';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const TeacherNavbar = () => {
  const navigate = useNavigate();
  const [teacherName, setTeacherName] = useState("");
  const [profileIcon, setProfileIcon] = useState("");
  const [showDropDown, setDropDown] = useState(false);
  const [stream, setStream] = useState('');
  //const [studentCode, setStudentCode] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        if(decodedToken.role !== 'teacher'){
          navigate('/teacher-login');
        }
        setTeacherName(decodedToken.teacherName);
        setStream(decodedToken.teacherDepatment);
        // If the role is not 'student', redirect to login page
        // if (decodedToken.role === 'student') {
        //   navigate('/student-dashboard');
        // }
      } catch (error) {
        console.error('Invalid Token:', error);
        navigate('/teacher-login');
      }
    }
  }, []);
  useEffect(() => {
    if (teacherName) {
      setProfileIcon(teacherName.charAt(0).toUpperCase());
    }
  }, [teacherName,stream]);

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
        <p id="Welcome-para">Welcome</p>
        <span className="username">{teacherName}</span>
      </div>
      <div className="student-navber-links">
        <ul className="nav-links-student">
          <li>
            <NavLink
              to="/teacher-dashboard"
              className={({ isActive }) => (isActive ? "active-link-student-navbar" : "")}
            >
              All Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teacher-dashboard/my-job"
              className={({ isActive }) => (isActive ? "active-link-student-navbar" : "")}
            >
              My Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teacher-dashboard/add-student"
              className={({ isActive }) => (isActive ? "active-link-student-navbar" : "")}
            >
              Add Student
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teacher-dashboard/create-a-job"
              className={({ isActive }) => (isActive ? "active-link-student-navbar" : "")}
            >
              Create a job
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/place-student"
              className={({ isActive }) => (isActive ? "active-link-student-navbar" : '')}
            >
              Announcements
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
            <p>Name : {teacherName}</p>
            <p>Department : {stream} </p>
            <button onClick={logout}>Logout</button>

          </div>
        )}
      </div>
      </div>
      {/* Right Section: Profile Icon and Welcome Text */}





    </nav >
  );
};

export default TeacherNavbar;
