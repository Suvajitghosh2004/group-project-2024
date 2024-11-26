import { trusted } from "mongoose";
import Student from "../models/student.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import dotenv from "dotenv";
dotenv.config();


const registerStudent = async(req,res) => {
    const {studentName,password,studentCode,contactNumber, studentMail,studentStream} = req.body;
    if(password == ''){
        return res.status(400).json({message: 'Password is required'})
    }
    if(studentName == ''){
        return res.status(400).json({message: "Student name is required"});
    }
    if(studentCode == ''){
        return res.status(400).json({message: "Student code is required"});
    }
    if(studentMail == ''){
        return res.status(400).json({message: "Student mail is required"});
    }
    if(studentStream == ''){
        return res.status(400).json({message: "Student stream is required"});
    }
    try {
      const user = await Student.findOne({ studentMail });
      if(user){
        return res.status(400).json({message: "This male already register..."});
      }
    } catch (error) {
      return res.status(400).json({error: error.message})
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);      
        const student = await Student.create({studentName,password:hashedPassword,studentCode,contactNumber,
             studentMail,studentStream});

             res.status(201).json(student);
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}


const loginStudent = async (req, res) => {
  const { studentMail, studentPassword } = req.body;

  try {
    const user = await Student.findOne({ studentMail });
    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }

    const isPasswordValid = await bcrypt.compare(studentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password!' });
    }

    // Get the role from the user data (assuming it's stored in the DB)
    const role = user.role || 'student'; // Default to 'student' if no role is assigned in the DB

    // Create the JWT with role
    const token = jwt.sign(
      { 
        id: user._id, 
        studentName: user.studentName, 
        role: role, 
        studentCode: user.studentCode, 
        studentStream: user.studentStream 
      },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      studentName: user.studentName, // You can include other user details if necessary
      role: role,
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error!' });
    console.log(error);
  }
};



// const loginStudent = async (req, res) => {
//     const { studentMail, studentPassword } = req.body;
//     if(studentMail == ''){
//         return res.status(400).json({message: "Student mail is required"});
//     }
//     if(studentPassword == ''){
//         return res.status(400).json({message: "Student password is required"});
//     }
//     console.log("mail = ",studentMail);
//     console.log("password = ",studentPassword);
  
//     try {
//       // Find the user by email
//       const user = await Student.findOne({ studentMail });
//       if (!user) {
//         return res.status(404).json({ error: 'User not found!' });
//       }
  
//       // Log to check if user.password is correctly fetched
//       console.log('Hashed password from DB:', user.password);
//       console.log('Password from request:', studentPassword);
  
//       // Check if passwords match
//       const isPasswordValid = await bcrypt.compare(studentPassword, user.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ error: 'Invalid password!' });
//       }
  
//       // Include user data in the payload and sign the token
//       const role = 'student';
//       const token = jwt.sign(
//         { id: user._id, studentName: user.studentName,role:role, studentCode: user.studentCode, studentStream: user.studentStream },
//         process.env.SECRET_KEY,
//         { expiresIn: '1h' }
//       );
  
//       res.status(200).json({ message: 'Login successful!', token });
//     } catch (error) {
//       console.error(error);  // Log the error for debugging
//       res.status(500).json({ error: 'Internal server error!' });
//     }
//   };
  
// Login route in the backend

/*const { username, password } = req.body;
  
try {
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ error: 'User not found!' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid password!' });
  }

  // Include user data in the payload
  const token = jwt.sign(
    { id: user._id, username: user.username, name: user.name },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.status(200).json({ message: 'Login successful!', token });
} catch (error) {
  res.status(500).json({ error: 'Internal server error!' });
}
*/ 
  

export {registerStudent,loginStudent};