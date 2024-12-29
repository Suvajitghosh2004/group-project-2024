import { Router } from "express";
const router = Router();
import { registerStudent,loginStudent,applyForJob,getAppliedJobs } from "../contollers/student.controller.js";

//router.get('/login', (req,res) =>{
   // res.send("welcome to student login page");
//})

router.post('/register',registerStudent);
router.post('/login',loginStudent);
router.post('/store/student-applied-job',applyForJob);
router.post('/get/applied-jobs',getAppliedJobs);

export default router;