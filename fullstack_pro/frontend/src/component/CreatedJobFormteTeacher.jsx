import React from 'react'
import "./AllJobsFormate.css"
const CreatedJobFormteTeacher = ({ job }) => {
  return (
    <div className='ff' >
      <div className="all-job-formate">
        <h3 className='companyName'>{job.companyName}</h3>
        <div className='company-details'>
          <p className='p-student'>Job Role: {job.jobRole}</p>
          <p className='p-student'>Job Location: {job.location}</p>
          <p className='p-student'>Package: {job.salary}</p>
          <p className='p-student'>Eligible: {job.eligibility.join(' ')}</p>
          <p className='p-student'>Required Skill: {job.skills}</p>
        </div>
      </div>
</div>

      )
}

      export default CreatedJobFormteTeacher;
