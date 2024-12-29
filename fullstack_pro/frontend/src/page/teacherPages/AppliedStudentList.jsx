import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AppliedStudentList.css'; // Import the CSS file

const AppliedStudentList = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/job/applied-student-list/${jobId}`)
      .then((response) => {
        setJob(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [jobId]);

  const downloadCSV = () => {
    if (!job) return;

    // Add Job Details as part of the CSV content
    const jobDetails = [
      ['Company Name', job.companyName],
      ['Job Role', job.jobRole],
      ['Location', job.location],
      ['Skills Required', job.skills],
      ['Salary', job.salary],
      ['Eligibility', job.eligibility.join(', ')],
      ['Apply Link', job.applyLink],
    ];

    const jobDetailsCsv = jobDetails.map((detail) => detail.join(': ')).join('\n');

    // Add Applied Students data
    const headers = ['Student Code', 'Name', 'Stream', 'Contact Number'];
    const rows = job.appliedStudent
      ? job.appliedStudent.map((student) => [
          student.studentCode,
          student.studentName,
          student.studentStream,
          student.contactNumber,
        ])
      : [];
    const studentDataCsv = [
      headers.join(','), // Add headers
      ...rows.map((row) => row.join(',')), // Add rows
    ].join('\n');

    // Combine Job Details and Student Data
    const csvContent = `${jobDetailsCsv}\n\nApplied Students:\n${studentDataCsv}`;

    // Generate Dynamic File Name
    const fileName = `${job.companyName.replace(/\s+/g, '_')}_${job.jobRole.replace(/\s+/g, '_')}.csv`;

    // Create Blob and Trigger Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="applied-student-list__loading">Loading...</div>;
  }

  if (error) {
    return <div className="applied-student-list__error">Error: {error}</div>;
  }

  if (!job) {
    return <div className="applied-student-list__error">No job details available.</div>;
  }

  return (
    <div className="applied-student-list">
      <h1 className="applied-student-list__header">Job Details</h1>
      <div>
        <h2 className="applied-student-list__sub-header">Company Name: {job.companyName}</h2>
        <p className="applied-student-list__info"><strong>Location:</strong> {job.location}</p>
        <p className="applied-student-list__info"><strong>Job Role:</strong> {job.jobRole}</p>
        <p className="applied-student-list__info"><strong>Skills Required:</strong> {job.skills}</p>
        <p className="applied-student-list__info"><strong>Salary:</strong> {job.salary}</p>
        <p className="applied-student-list__info"><strong>Eligibility:</strong> {job.eligibility.join(', ')}</p>
        <p className="applied-student-list__info">
          <strong>Apply Link:</strong>{' '}
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="applied-student-list__link"
          >
            {job.applyLink}
          </a>
        </p>
      </div>
    <div>
      <h2 className="applied-student-list__sub-header">Applied Students
        <button
          onClick={downloadCSV}
          className="applied-student-list__download-button"
        >
          Download CSV
        </button>
     
      </h2>
      </div>
      {job.appliedStudent && job.appliedStudent.length > 0 ? (
        <table className="applied-student-list__table">
          <thead>
            <tr>
              <th>Student Code</th>
              <th>Name</th>
              <th>Stream</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {job.appliedStudent.map((student) => (
              <tr key={student._id}>
                <td>{student.studentCode}</td>
                <td>{student.studentName}</td>
                <td>{student.studentStream}</td>
                <td>{student.contactNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="applied-student-list__info">No students have applied for this job yet.</p>
      )}
    </div>
  );
};

export default AppliedStudentList;
