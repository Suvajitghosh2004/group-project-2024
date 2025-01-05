import React, { useEffect, useState } from "react";
import "./StudentFullProfile.css";

import axios from "axios";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

const StudentFullProfile = () => {
 const {studentDetails} = useParams();
 // const studentDetails = "673f838dadaf5ae614a38ded";//
  //const[studentDetails,set] =useState("673f838dadaf5ae614a38ded");
  const [profile, setStudentProfile] = useState(null)
  //const [studentDetails, setStudentDeatils] = useState("673f838dadaf5ae614a38ded")
  const [student,setStudent] = useState(null)
  const [error, setError] = useState(null)
  const [profilePic,setProfilePic] = useState("http://res.cloudinary.com/dvaxphsns/image/upload/v1736013201/of9a2r1bqatqyxbudf4t.jpg");
  const [isProfilePicEdit,setProfilePicEdit] = useState(false);
  const [tempProfilePic,setTempProfilePic] = useState("");
  const [filePath,setFilePath] = useState(null);
  const [formData, setFormData] = useState({
    tenth: {
      obtainedMarks: "",
      totalMarks: "",
      board: "",
      yearOfPassing: "",
      schoolName: "",
      ex:"12"
    },
    twelfth: {
      obtainedMarks: "",
      totalMarks: "",
      branch: "",
      yearOfPassing: "",
      schoolName: "",
      board: "",
      ex:"12"
    },
    graduation: {
      obtainedCgpa: "",
      totalCgpa: "",
      percentage: "",
      universityName: "",
      yearOfPassing: "",
      ex:"12"
    },
    postGraduation: {
      obtainedCgpa: "",
      totalCgpa: "",
      percentage: "",
      universityName: "",
      yearOfPassing: "",
      ex:"12"
    },
    cv: "",
  });
 
  // useEffect(() => {
  //     const token = localStorage.getItem('authToken');
  //     if (token) {
  //       try {
  //         const decodedToken = jwt_decode(token);
  //         setStudentDeatils(decodedToken.id);
  //       } catch (err) {
  //         setError('Invalid token. Please log in again.');
  //       }
  //     } else {
  //       setError('No authentication token found. Please log in.');
  //     }
  //   }, []);
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile])

  useEffect(() => {
    const studetProfile = async () => {
      try {
        const response = await axios.post("/api/student/get/one-student-full-profile", { studentDetails })
        if (response) {
          setStudentProfile(response.data)
          setStudent(response?.data?.studentDetails);
          setProfilePic(response?.data?.studentDetails?.profilePic)
        }
      } catch (error) {
        console.log(error);
      }
    }
    //if(studentDeatils){
    studetProfile();
    //}
  }, []);
  const [isEditable, setIsEditable] = useState(false);
  const [showPostGraduation, setShowPostGraduation] = useState(false);

  const handleChange = (e, section, field) => {
    if (field === "cv") {
      setFormData({
        ...formData,
        [field]: e.target.files[0], // Save the file object
      });
    } else if (section) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      formData.tenth.ex = "sourav";
      formData.twelfth.ex = "sourav";
      formData.graduation.ex = "sourav";
      formData.postGraduation.ex = "sourav";
      const formDataToSend = new FormData();
  
      // Append objects as strings (if required) or directly
      formDataToSend.append("studentDetails",studentDetails);
      formDataToSend.append("tenth", JSON.stringify(formData.tenth)); 
      formDataToSend.append("twelfth", JSON.stringify(formData.twelfth));
      formDataToSend.append("graduation", JSON.stringify(formData.graduation));
      formDataToSend.append("postGraduation", JSON.stringify(formData.postGraduation));
  
      // Append the CV file only if it exists
      if (formData.cv) {
        formDataToSend.append("cv", formData.cv);
      }
  
      const response = await axios.post(
        "/api/student/update/student-full-profile",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Profile updated successfully:", response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response || error.message);
      alert("Error updating profile. Please try again.");
    }
  };
  
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFilePath(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempProfilePic(reader.result); // Set the selected image
       
      };
      reader.readAsDataURL(file);
     // setFilePath(reader.readAsDataURL(file));
      setProfilePicEdit(true);
    }
  };
  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };
  async function savePicture() {
    try {
        const formData = new FormData();
        formData.append('id', studentDetails);
        formData.append('filePath', filePath);

        const response = await axios.post("/api/student/update/profile-pic", formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.status === 200) {
          console.log(response.data);
          setProfilePic(response?.data?.profilePic)
            alert("Profile picture updated successfully");
        } else {
            alert("Failed to update profile picture");
        }
        console.log("Response:", response.data);
    } catch (error) {
        console.error("Error updating profile picture:", error);
        alert("An error occurred while updating the profile picture");
    }
}

  const handleSave = () => {
    savePicture();
    setProfilePicEdit(false); // Hide the save button
  };
  const handleCancel = () => {
    setTempProfilePic("");
    //setTempImage(null); // Discard the uploaded image
    setProfilePicEdit(false); // Hide the save button
  };

  return (
    <div className="student-full-profile">
      <div className="student-profile-container">
        {formData?.tenth?.ex || "sdfgh"}
      <div className="student-profile-picture">
      <div className="profile-container" style={{ textAlign: 'center' }}>
      <div
        style={{
          position: 'relative',
          width: '150px',
          height: '150px',
          margin: 'auto',
        }}
      >
        <img
          src={tempProfilePic ||profilePic}
          alt="Profile"
          className="profile-pic"
          style={{
            borderRadius: '50%',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            border: '2px solid #ccc',
          }}
        />
        <button
          onClick={triggerFileInput}
          className="edit-btn"
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            background: 'white',
            borderRadius: '50%',
            padding: '5px',
            cursor: 'pointer',
            border: 'none',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          }}
        >
          ✏️
        </button>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      {isProfilePicEdit && (
        <div style={{ marginTop: '10px' }}>
          <button
            onClick={handleSave}
            style={{
              padding: '5px 10px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              marginRight: '5px',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            style={{
              padding: '5px 10px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
      </div>
      <div className="student-info">
        <p>Name :{student?.studentName || ''}</p>
        <p>Student Code : {student?.studentCode || ''}</p>
        <p>Stream: {student?.studentCode || ''}</p>
      </div>
        <h1 className="student-profile-title"></h1>
        <button
          type="button"
          onClick={() => setIsEditable(!isEditable)}
          className="student-profile-button student-profile-edit-button"
        >
          {isEditable ? "Save" : "Edit"}
        </button>

        <form onSubmit={handleSubmit}>

          <fieldset className="student-profile-fieldset">
            <legend className="student-profile-legend">Tenth Details</legend>
            <div className="input-style">
              <label className="student-profile-label">Obtained Marks:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="Obtained Marks"
                  value={formData?.tenth?.obtainedMarks || null}
                  onChange={(e) => handleChange(e, "tenth", "obtainedMarks")}
                  className="student-profile-input"
                />
              ) : (
                <label >{profile?.tenth?.obtainedMarks || null}</label>
              )}
            </div>
            <div className="input-style">
              <label className="student-profile-label">Total Marks:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="Total Marks"
                  value={formData?.tenth?.totalMarks || null}
                  onChange={(e) => handleChange(e, "tenth", "totalMarks")}
                  className="student-profile-input"
                />
              ) : (
                <label >{profile?.tenth?.totalMarks || null}</label>
              )}
            </div>
            <div className="input-style">
              <label className="student-profile-label">Board Name:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="Board"
                  value={formData?.tenth?.board || null}
                  onChange={(e) => handleChange(e, "tenth", "board")}
                  className="student-profile-input"
                />
              ) : (
                <label >{profile?.tenth?.board || null}</label>
              )}
            </div>
            <div className="input-style">
              <label className="student-profile-label">Year of Passing:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="Year of Passing"
                  value={formData?.tenth?.yearOfPassing || null}
                  onChange={(e) => handleChange(e, "tenth", "yearOfPassing")}
                  className="student-profile-input"
                />
              ) : (
                <label >{profile?.tenth?.yearOfPassing || null}</label>
              )}
            </div>
            <div className="input-style">
              <label className="student-profile-label">School Name:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="School Name"
                  value={formData?.tenth?.schoolName || null}
                  onChange={(e) => handleChange(e, "tenth", "schoolName")}
                  className="student-profile-input"
                  disabled={!isEditable}
                />
              ) : (
                <label >{profile?.tenth?.schoolName || null}</label>
              )}
            </div>
          </fieldset>
          <fieldset className="student-profile-fieldset">
            <legend className="student-profile-legend">Twelfth Details</legend>

            <div className="input-style">
              <label className="student-profile-label">Obtained Marks:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="Obtained Marks"
                  value={formData?.twelfth?.obtainedMarks || null}
                  onChange={(e) => handleChange(e, "twelfth", "obtainedMarks")}
                  className="student-profile-input-two-marks"
                />
              ) : (
                <label >{profile?.twelfth?.obtainedMarks || null}</label>
              )}
            </div>
            <div className="input-style">
              <label className="student-profile-label">Total Marks:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="Total Marks"
                  value={formData?.twelfth?.totalMarks || null}
                  onChange={(e) => handleChange(e, "twelfth", "totalMarks")}
                  className="student-profile-input-two-marks"
                />
              ) : (
                <label >{profile?.twelfth?.totalMarks || null}</label>
              )}
            </div>

            <div className="input-style">
              <label className="student-profile-label">Branch:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="Branch"
                  value={formData?.twelfth?.branch || null}
                  onChange={(e) => handleChange(e, "twelfth", "branch")}
                  className="student-profile-input"
                  disabled={!isEditable}
                />
              ) : (
                <label >{profile?.twelfth?.branch || null}</label>
              )}
            </div>
            <div className="input-style">
              <label className="student-profile-label">Year of Passing:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="Year of Passing"
                  value={formData?.twelfth?.yearOfPassing || null}
                  onChange={(e) => handleChange(e, "twelfth", "yearOfPassing")}
                  className="student-profile-input"
                />
              ) : (
                <label >{profile?.tenth?.yearOfPassing || null}</label>
              )}
            </div>
            <div className="input-style">
              <label className="student-profile-label">School Name:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="School Name"
                  value={formData?.twelfth?.schoolName || null}
                  onChange={(e) => handleChange(e, "twelfth", "schoolName")}
                  className="student-profile-input"
                  disabled={!isEditable}
                />
              ) : (
                <label >{profile?.tenth?.schoolName || null}</label>
              )}
            </div>
            <div className="input-style">
              <label className="student-profile-label">Board Name:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="Board"
                  value={formData?.twelfth?.board || null}
                  onChange={(e) => handleChange(e, "twelfth", "board")}
                  className="student-profile-input"
                />
              ) : (
                <label >{profile?.twelfth?.board || null}</label>
              )}
            </div>
          </fieldset>

          <fieldset className="student-profile-fieldset">
            <legend className="student-profile-legend">Graduation Details</legend>
            <div className="input-style">
              <label className="student-profile-label">Obtained CGPA:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="Obtained CGPA"
                  value={formData?.graduation?.obtainedCgpa || null}
                  onChange={(e) => handleChange(e, "graduation", "obtainedCgpa")}
                  className="student-profile-input"

                />
              ) : (
                <label >{profile?.graduation?.obtainedCgpa || null}</label>
              )}
            </div>
            <div className="input-style">
              <label className="student-profile-label">Total CGPA:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="Total CGPA"
                  value={formData?.graduation?.totalCgpa || null}
                  onChange={(e) => handleChange(e, "graduation", "totalCgpa")}
                  className="student-profile-input"

                />
              ) : (
                <label >{profile?.graduation?.totalCgpa || null}</label>
              )}
            </div>
            <div className="input-style">
              <label className="student-profile-label">Percentage:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="Percentage"
                  value={formData?.graduation?.percentage || null}
                  onChange={(e) => handleChange(e, "graduation", "percentage")}
                  className="student-profile-input"

                />
              ) : (
                <label >{profile?.graduation?.percentage || null}</label>
              )}
            </div>
            {showPostGraduation && (
              <div className="input-style">
                <label className="student-profile-label">University Name:</label>
                {isEditable ? (
                  <input
                    type="text"
                    placeholder="University Name"
                    value={formData?.graduation?.universityName || null}
                    onChange={(e) => handleChange(e, "graduation", "universityName")}
                    className="student-profile-input"

                  />
                ) : (
                  <label >{profile?.graduation?.universityName || null}</label>
                )}
              </div>
            )}
            <div className="input-style">
              <label className="student-profile-label">Year of Passing:</label>
              {isEditable ? (
                <input
                  type="text"
                  placeholder="Year of Passing"
                  value={formData?.graduation?.yearOfPassing || "2025"}
                  onChange={(e) => handleChange(e, "graduation", "yearOfPassing")}
                  className="student-profile-input"

                />
              ) : (
                <label >{profile?.graduation?.yearOfPassing || "2025"}</label>
              )}
            </div>
          </fieldset>
          <div className="post-graduate-show">
            <p>Do you want to add Post-Graduation details?</p>
            <button
              type="button"
              className="toggle-btn yes-btn"
              onClick={() => setShowPostGraduation(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className="toggle-btn no-btn"
              onClick={() => setShowPostGraduation(false)}
            >
              No
            </button>
          </div>
          {showPostGraduation && (
            <fieldset className="student-profile-fieldset">
              <legend className="student-profile-legend">PostGraduation Details</legend>
              <div className="input-style">
                <label className="student-profile-label">Obtained CGPA:</label>
                {isEditable ? (
                  <input
                    type="text"
                    placeholder="Obtained CGPA"
                    value={formData?.postGraduation?.obtainedCgpa || null}
                    onChange={(e) => handleChange(e, "postGraduation", "obtainedCgpa")}
                    className="student-profile-input"

                  />
                ) : (
                  <label >{profile?.postGraduation?.obtainedCgpa || null}</label>
                )}
              </div>
              <div className="input-style">
                <label className="student-profile-label">Total CGPA:</label>
                {isEditable ? (
                  <input
                    type="text"
                    placeholder="Total CGPA"
                    value={formData?.postGraduation?.totalCgpa || null}
                    onChange={(e) => handleChange(e, "postGraduation", "totalCgpa")}
                    className="student-profile-input"

                  />
                ) : (
                  <label >{profile?.postGraduation?.totalCgpa || null}</label>
                )}
              </div>
              <div className="input-style">
                <label className="student-profile-label">Percentage:</label>
                {isEditable ? (
                  <input
                    type="text"
                    placeholder="Percentage"
                    value={formData?.postGraduation?.percentage || null}
                    onChange={(e) => handleChange(e, "postGraduation", "percentage")}
                    className="student-profile-input"

                  />
                ) : (
                  <label >{profile?.postGraduation?.percentage || null}</label>
                )}
              </div>
              <div className="input-style">
                <label className="student-profile-label">Year of Passing:</label>
                {isEditable ? (
                  <input
                    type="text"
                    placeholder="Year of Passing"
                    value={formData?.postGraduation?.yearOfPassing || null}
                    onChange={(e) => handleChange(e, "postGraduation", "yearOfPassing")}
                    className="student-profile-input"

                  />
                ) : (
                  <label >{profile?.postGraduation?.yearOfPassing || null}</label>
                )}
              </div>
            </fieldset>
          )}

          <div className="student-profile-group">
            <label className="student-profile-label">Upload CV</label>
            <input
              type="file"
              onChange={(e) => handleChange(e, null, "cv")}
              className="student-profile-input"
              name="cv"
            />
          </div>


          {isEditable && (
            <button type="submit" className="student-profile-button student-profile-submit-button">
              Submit
            </button>
          )}
        </form>

        <div className="student-profile-group">
          <label className="student-profile-label">Upload CV</label>

          {formData.cv && (
            <p>Selected File: {formData.cv.name}</p> // Safely display the file name
          )}
        </div>

      </div>
    </div>
  );
};

export default StudentFullProfile;
