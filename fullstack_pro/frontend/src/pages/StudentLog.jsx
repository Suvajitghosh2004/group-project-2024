// // src/components/LoginPage.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
// import './StudentLogin.css';

// const StudentLog = () => {
//   const [studentMail, setStudentMail] = useState('');
//   const [studentPassword, setStudentPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [welcome, setWelcome] = useState('');

//   const navigate = useNavigate();  // Initialize useNavigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!studentMail || !studentPassword) {
//       setError('Please enter both email and password.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('/api/student/login', {
//         studentMail,
//         studentPassword,
//       });
//       console.log(response.data);  // Log response to see data from server

//       if (response.data.token) {
//         // Store token in localStorage
//         localStorage.setItem('token', response.data.token);

//         // Display welcome message if needed
//         setWelcome(`Welcome, ${response.data.studentName}!`);

//         // Role-based navigation
//         if (response.data.role === "student") {
//           navigate('/student/dashboard');  // Navigate to the student dashboard
//         } else {
//           setError('You are not a student. Access denied.');
//         }
//       } else {
//         setError('Invalid credentials. Please try again.');
//       }

//       setLoading(false);
//     } catch (err) {
//       setLoading(false);
//       if (err.response && err.response.data) {
//         setError(err.response.data.error || 'An error occurred. Please try again.');
//       } else {
//         setError('An error occurred. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Student Login</h2>
//       {welcome && <p className="welcome-message">{welcome}</p>}  {/* Display welcome message if set */}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="studentMail">Email:</label>
//           <input
//             type="email"
//             id="studentMail"
//             value={studentMail}
//             onChange={(e) => setStudentMail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="studentPassword">Password:</label>
//           <input
//             type="password"
//             id="studentPassword"
//             value={studentPassword}
//             onChange={(e) => setStudentPassword(e.target.value)}
//             placeholder="Enter your password"
//             required
//           />
//         </div>

//         {error && <p className="error">{error}</p>}

//         <div>
//           <button type="submit" disabled={loading}>
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default StudentLog;
