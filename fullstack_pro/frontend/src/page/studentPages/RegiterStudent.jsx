import { useState } from "react";
import "./RegisterStudent.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentRegister = () => {
  const [error, setError] = useState(null);
  const [details, setDetails] = useState({
    studentName: "",
    studentMail: "",
    studentCode: "",
    contactNumber: "",
    studentStream: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const onSwitch = () => {
    navigate("/student-login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (details.password !== details.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("/api/student/register", {
        studentName: details.studentName,
        studentMail: details.studentMail,
        studentCode: details.studentCode,
        contactNumber: details.contactNumber,
        studentStream: details.studentStream,
        password: details.password,
      });

      if (response.status === 200 || response.status === 201) {
        alert("Student Registered Successfully");
        console.log(response.data);
        navigate("/student-login"); // Redirect after successful registration
      } else {
        setError(`Unexpected response: ${response.status} - ${response.data}`);
      }
    } catch (err) {
      // Extract a more specific error message if possible
      const message =
        err.response?.data?.message ||
        "An error occurred during registration. Please try again.";
      setError(message);
      alert(`${error}`)
      console.error("Registration Error:", err);
    }
  };

  return (
    <div className="main-register-student">
      <div className="register-container">
        <h1>Student Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentName">Name:</label>
            <input
              type="text"
              id="studentName"
              value={details.studentName}
              onChange={(e) =>
                setDetails({ ...details, studentName: e.target.value })
              }
              placeholder="Enter Your Full Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentCode">Student Code:</label>
            <input
              type="text"
              id="studentCode"
              value={details.studentCode}
              onChange={(e) =>
                setDetails({ ...details, studentCode: e.target.value })
              }
              placeholder="Enter Your Full Student Code"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="text"
              id="contactNumber"
              value={details.contactNumber}
              onChange={(e) =>
                setDetails({ ...details, contactNumber: e.target.value })
              }
              placeholder="Enter Your Contact Number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentStream">Stream:</label>
            <input
              type="text"
              id="studentStream"
              value={details.studentStream}
              onChange={(e) =>
                setDetails({ ...details, studentStream: e.target.value })
              }
              placeholder="Enter Your Stream"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="studentMail">Email:</label>
            <input
              type="email"
              id="studentMail"
              value={details.studentMail}
              onChange={(e) =>
                setDetails({ ...details, studentMail: e.target.value })
              }
              placeholder="Enter Your University Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={details.confirmPassword}
              onChange={(e) =>
                setDetails({ ...details, confirmPassword: e.target.value })
              }
              placeholder="Confirm Password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Display errors here */}
          <button type="submit" className="btn">
            Register
          </button>
        </form>
        <p id="p-id">
          Already have an account?{" "}
          <button className="link-btn" onClick={onSwitch}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default StudentRegister;
