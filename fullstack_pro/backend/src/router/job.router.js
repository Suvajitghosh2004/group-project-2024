import { Router } from "express";
const router = Router();
import { createJob,getAllJobs,getJobById,teacherOwnJob } from "../contollers/job.controller.js";


router.post('/create',createJob);
router.get('/alljobs',getAllJobs);
router.get('/onejob/:id',getJobById);
router.get('/teacher-own-job/:id',teacherOwnJob);


export default router;