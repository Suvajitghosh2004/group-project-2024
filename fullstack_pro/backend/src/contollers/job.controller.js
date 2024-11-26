import Job from "../models/job.model.js";
import mongoose from "mongoose";
const createJob = async (req, res) => {
    const {companyName,location,jobRole,skills,eligibility,salary,description,appyLink,creator} = req.body;
    if(companyName === ""){
        return res.status(400).json({message: "Company name is required"});
    }
    if(jobRole === ""){
        return res.status(400).json({message: "Job role is required"});
    }
    

    try {
        const newJob = await Job.create({companyName,location,jobRole,eligibility,skills,creator,
            salary,description,appyLink})
            res.status(201).json(newJob);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


const getAllJobs = async (req, res) => {
    try {
        const allJobs = await Job.find({}).sort({createdAt : -1})
        res.status(200).json(allJobs);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
  
}

const getJobById = async (req, res) => {
    const { id } = req.params; // Extract ID from route parameters
    try {
      const oneJob = await Job.findById(id); // Fetch job by ID
      if (!oneJob) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.status(200).json(oneJob); // Return the found job
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "An error occurred. Please try again later." });
    }
};



const teacherOwnJob = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Query the database to fetch jobs associated with the id
      const jobs = await Job.find({ creator: id });
  
      if (!jobs || jobs.length === 0) {
        return res.status(404).json({ message: 'No jobs found for the specified creator.' });
      }
  
      res.status(200).json(jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };



// const getJobById = async (req, res) => {
//      const {id} = req.params.id;
//      try {
//         const oneJob = await Job.findById(id);
//         if(!oneJob){
//             return res.status(404).json({message: "Job not found"});

//         }
//         res.status(201).json(oneJob);
//      } catch (error) {
//         res.status(500).json({message:"Job not fonund please try letter"});
//      }
// }
/*
     const workouts = await Workout.find({}).sort({createdAt : -1})
   res.status(200).json(workouts);
*/

export {
    createJob,
    getAllJobs,
    getJobById,
    teacherOwnJob
}