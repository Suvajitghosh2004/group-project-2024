import { Router } from "express";
const router = Router();
import { registerStudent,loginStudent,applyForJob,getAppliedJobs ,getStudentDetails} from "../contollers/student.controller.js";

//router.get('/login', (req,res) =>{
   // res.send("welcome to student login page");
//})

router.post('/register',registerStudent);
router.post('/login',loginStudent);
router.post('/store/student-applied-job',applyForJob);
router.post('/get/applied-jobs',getAppliedJobs);
router.post('/track/details',getStudentDetails);

export default router;