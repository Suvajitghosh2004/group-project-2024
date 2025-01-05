import StudentFullProfile from '../models/studentFullProfile.model.js';
import { uploadOnCloudinary } from '../cloudinary/cloudinary.js';
import mongoose from 'mongoose';
import fs from 'fs';
const createStudentFullProfile = async (req,res) => {
    try {
        const {studentDetails} = req.body;
        const readyStudentFullProfile = new StudentFullProfile({studentDetails});
        readyStudentFullProfile.tenth.obtainedMarks = "500";
        await readyStudentFullProfile.save();
        return res.status(201).json({message: "Student Full Profile Created Successfully",data:{readyStudentFullProfile}});
    } catch (error) {
        return res.status(500).json({message: "Error Creating Student Full Profile",error})
    }
}

const getOneStudentFullProfile = async (req,res) => {
     try {
        const {studentDetails} = req.body;
        const studentFullProfile = await StudentFullProfile.findOne({studentDetails}).populate("studentDetails");
        if(!studentFullProfile) {
            return res.status(404).json({message: "Student Full Profile Not Found"})
        }
        return res.status(200).json(studentFullProfile);
     }catch (error){
        return res.status(500).json({message: "Error Getting Student Full Profile",error})
     }
}



const updateStudentFullProfile = async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).send({ message: "Request body is empty" });
      }
      
      const { studentDetails, tenth, twelfth, graduation, postGraduation } = req.body;
  
      // Handle CV upload if it exists
      let cvUrl = null;
      if (req.files?.cv) {
        const cvLocalPath = req.files.cv[0].path; // Get local file path
        const uploadedCV = await uploadOnCloudinary(cvLocalPath); // Upload the file to Cloudinary
        cvUrl = uploadedCV?.url; // Get the URL of the uploaded CV
        // Delete the local file after upload
       // fs.unlinkSync(cvLocalPath);
        //fs.unlinkSync(localFilePath);
      }
      console.log("Update Payload:", {
        studentDetails,
        tenth: JSON.parse(tenth),
        twelfth: JSON.parse(twelfth),
        graduation: JSON.parse(graduation),
        postGraduation: JSON.parse(postGraduation),
       // cv: cvUrl,
      });
      
  
      // Update the student's profile in the database
      const updatedStudent = await StudentFullProfile.findOneAndUpdate(
        { studentDetails: studentDetails },
        {
          $set: {
            tenth: JSON.parse(tenth), // Parsing the fields
            twelfth: JSON.parse(twelfth),
            graduation: JSON.parse(graduation),
            postGraduation: JSON.parse(postGraduation),
            ...(cvUrl && { cv: cvUrl }), // If there's a CV URL, add it to the document
          },
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      res.status(200).json({
        message: "Student profile updated successfully",
        data: updatedStudent,
      });
    } catch (error) {
      console.error("Error updating student profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  



export{
     createStudentFullProfile,
    getOneStudentFullProfile,
    updateStudentFullProfile
    };