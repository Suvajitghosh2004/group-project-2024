// import { useEffect, useState } from 'react';
// import JobsDeatils from '../component/JobsDeatils';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const StudentDashboard = () => {
//   const [jobs, setJobs] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     axios.get('/api/job/alljobs')
//     .then((response) => {
//       setJobs(response.data);

//     })
//     .catch((error)=>{
//       setError(error);
//       console.log(error);
//     })
//   },[]);

//   function logout() {
//     localStorage.removeItem('token');
  
//     // Set a timer to navigate after 2 seconds (adjust the delay as needed)
//     setTimeout(() => {
//       navigate('/');
//     }, 2000); // 2000 milliseconds = 2 seconds
//   }

//   return (
//     <div>
//       <h1><p>Welcome student dash board</p></h1>
//         <button onClick={logout} >Logout</button>
//       <div className="jobs">
//         {jobs.length > 0 ? (
//           jobs.map((job) => (
//             <JobsDeatils job={job} key={job._id} />
//           ))
//         ) : (
//           <p>No jobs available.</p>
//         )}
//       </div>
//     </div>
//   );

// };

// export default StudentDashboard;
