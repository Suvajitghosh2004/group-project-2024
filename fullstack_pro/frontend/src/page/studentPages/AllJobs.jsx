import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AllJobsFormate from '../../component/AllJobsFormate'
import './AllJobs.css'
export const AllJobs = () => {
  const [jobs, setJobs] = useState([])
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('api/job/alljobs')
      .then(response => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>AllJobs</h1>
      <div className="all-job">
        <div className="jobs">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <AllJobsFormate job={job} key={job._id} />
            ))
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
      </div>
    </div>
  );
  
}
export default AllJobs;
