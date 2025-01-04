import React, { useState } from "react";
import "./StudentFullProfile.css";

const StudentFullProfile = () => {
  const [profile, setProfile] = useState(null)
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

  const [isEditable, setIsEditable] = useState(true);
  const [showPostGraduation, setShowPostGraduation] = useState(false);

  const handleChange = (e, section, field) => {
    if (section) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
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
                  value={profile?.tenth?.obtainedMarks || null}
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
                  value={profile?.tenth?.totalMarks || null}
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
                  value={profile?.tenth?.board || null}
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
                  value={profile?.tenth?.yearOfPassing || null}
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
                  value={profile?.tenth?.schoolName || null}
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
                    value={profile?.twelfth?.obtainedMarks || null}
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
                    value={profile?.twelfth?.totalMarks || null}
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
                  value={profile?.twelfth?.branch || null}
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
                  value={profile?.twelfth?.yearOfPassing || null}
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
                  value={profile?.twelfth?.schoolName || null}
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
                  value={profile?.twelfth?.board || null}
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
                  value={profile?.graduation?.obtainedCgpa || null}
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
                  value={profile?.graduation?.totalCgpa || null}
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
                  value={profile?.graduation?.percentage || null}
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
                    value={profile?.graduation?.universityName || null}
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
                  value={profile?.graduation?.yearOfPassing || "2025"}
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
                    value={profile?.postGraduation?.obtainedCgpa || null}
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
                    value={profile?.postGraduation?.totalCgpa || null}
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
                    value={profile?.postGraduation?.percentage || null}
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
                    value={profile?.postGraduation?.yearOfPassing || null}
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

            />
          </div>


          {isEditable && (
            <button type="submit" className="student-profile-button student-profile-submit-button">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default StudentFullProfile;
