import React, { useEffect, useState } from "react";
import "./StudentFullProfile.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

const StudentFullProfile = () => {
  const [profile, setStudentProfile] = useState(null)
  const [studentDetails, setStudentDeatils] = useState("673f838dadaf5ae614a38ded")
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    studentDetails: "",
    tenth: {
      obtainedMarks: "",
      totalMarks: "",
      board: "",
      yearOfPassing: "",
      schoolName: "",
    },
    twelfth: {
      obtainedMarks: "",
      totalMarks: "",
      branch: "",
      yearOfPassing: "",
      schoolName: "",
      board: "",
    },
    graduation: {
      obtainedCgpa: "",
      totalCgpa: "",
      percentage: "",
      universityName: "",
      yearOfPassing: "",
    },
    postGraduation: {
      obtainedCgpa: "",
      totalCgpa: "",
      percentage: "",
      universityName: "",
      yearOfPassing: "",
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
      const formDataToSend = new FormData();
  
      // Append objects as strings (if required) or directly
      formDataToSend.append("studentDetails", formData.studentDetails);
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
  
  


  return (
    <div className="student-full-profile">
      <div className="student-profile-container">
        <h1 className="student-profile-title">Student Full Profile Form</h1>
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
