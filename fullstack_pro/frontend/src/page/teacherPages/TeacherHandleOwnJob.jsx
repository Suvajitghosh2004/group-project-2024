import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TeacherHandleOwnJob.css";
const TeacherHandleOwnJob = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Fetch job ID from the URL
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/job/onejob/${id}`) // Fetch job details by ID
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job:", error);
        setError("Failed to load job details.");
      });
  }, [id]);

  const handleDeleteClick = () => {
    setShowPopup(true);
  };
  
  const handleShowStudent = () =>{
    navigate(`/teacher-dashboard/teacher-show-applied-student/${id}`);
  }

  const confirmDelete = () => {
    axios
      .delete(`/api/job/delete-a-job/${id}`) // Replace :id with actual job ID
      .then((response) => {
        if (response.status === 200) {
          alert("Job deleted successfully");
          setShowPopup(false);
          navigate("/teacher-dashboard/my-job"); // Redirect after deletion
        } else {
          alert("Failed to delete job");
        }
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
        alert("An error occurred while deleting the job");
      });
  };

  const cancelDelete = () => {
    setShowPopup(false);
  };

  if (error) return <p>{error}</p>;
  if (!job) return <p>Loading...</p>;

  return (
    <div className="student-show-one-job-details-main">
      <div className="student-show-one-job-details-left-box">
        <div className="job-details">
          <h1>{job.companyName}</h1>
          <p className="job-details-oneByone"><strong>Job Role:</strong> {job.jobRole}</p>
          <p className="job-details-oneByone"><strong>Job Location:</strong> {job.location}</p>
          <p className="job-details-oneByone"><strong>Salary:</strong> {job.salary}</p>
          <p className="job-details-oneByone"><strong>Eligible:</strong> {job.eligibility.join(', ')}</p>
          <p className="job-details-oneByone"><strong>Required Skills:</strong> {job.skills || "Not specified"}</p>
        </div>

        <div>
          <button className="btn btn-primary" onClick={handleShowStudent}>Show Student</button>
          <button className="btn btn-primary" onClick={handleDeleteClick}>Delete</button>
          
        </div>
      </div>
      <div className="student-show-one-job-details-right-box">
        <div className="job-descp-stud-show">
          <h1>Job Description</h1>
          <p className="job-descp-details">{job.description || "No description provided."}</p>
        </div>
      </div>
      {showPopup && (
            <div className="popup">
              <p>Are you sure you want to delete?</p>
              <button onClick={confirmDelete} style={{ marginRight: "10px" }}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
          )}
    </div>
  );
};

export default TeacherHandleOwnJob;
