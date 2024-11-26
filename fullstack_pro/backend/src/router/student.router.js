import { Router } from "express";
const router = Router();
import { registerStudent,loginStudent } from "../contollers/student.controller.js";

//router.get('/login', (req,res) =>{
   // res.send("welcome to student login page");
//})

router.post('/register',registerStudent);
router.post('/login',loginStudent);

export default router;