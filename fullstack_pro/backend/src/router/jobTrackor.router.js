import { Router } from "express";
const router = Router();

import { getJobTrackerDetails,selectRound,createJobTrackor } from "../contollers/jobTracker.controller.js";

router.get('/one/:jobTrackerId',getJobTrackerDetails);
router.post("/select-student",selectRound);
router.post("/create-job-tracker",createJobTrackor);

export default router;