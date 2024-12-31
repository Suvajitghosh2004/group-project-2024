import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Home from './page/allUserPage/Home';
import Overview from './page/allUserPage/Overview';
import PlacementReport from './page/allUserPage/PlacementReport';
import Contact from './page/allUserPage/Contact';
import AllUser from './layOut/AllUser';
import TeacherLogin from './page/teacherPages/TeacherLogin';
import TeacherRegister from './page/teacherPages/TeacherRegister';
import StudentLogin from './page/studentPages/StudentLogin';
import StudentRegister from './page/studentPages/RegiterStudent';
import AllJobs from './page/studentPages/AllJobs';
import StudentLayout from './layOut/StudentLayout';
import MyJobs from './page/studentPages/MyJobs';
import AppliedJobs from './page/studentPages/AppliedJobs';
import ProtectedRouteStudent from './routerProtector/ProtectedStudent';
import TeacherLayout from './layOut/TeacherLayout';
import AddStudent from './page/teacherPages/AddStudent';
import CreateAJob from './page/teacherPages/CreateAJob';
import CreatedJob from './page/teacherPages/CreatedJob';
import StudentShowOneJob from './page/studentPages/StudentShowOneJob';
import TeacherHandleOwnJob from './page/teacherPages/TeacherHandleOwnJob';
import ProtectedTeacherRouter from './routerProtector/ProtectedTeacherRouter';
import ApplyJob from './page/studentPages/ApplyJob';
import AppliedStudentList from './page/teacherPages/AppliedStudentList';
import SelectRound from './page/dataForPlcaement/SelectRound';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const currentPath = window.location.pathname;
  
        // Handle student redirection
        if (decodedToken.role === 'student' && !currentPath.startsWith('/student-dashboard')) {
          navigate('/student-dashboard');
        }
  
        // Handle teacher redirection
        if (decodedToken.role === 'teacher' && !currentPath.startsWith('/teacher-dashboard')) {
          navigate('/teacher-dashboard');
        }
      } catch (error) {
        console.error('Invalid Token:', error);
        navigate('/'); // Redirect to home if the token is invalid
      }
    }
  }, [navigate]);
  

  return (
    <Routes>
      {/* Root Route */}
      <Route path="/" element={<AllUser />}>
        <Route index element={<Home />} />
        <Route path="overview" element={<Overview />} />
        <Route path="placement-report" element={<PlacementReport />} />
        <Route path="contact" element={<Contact />} />
        <Route path="student-login" element={<StudentLogin />} />
        <Route path="student-register" element={<StudentRegister />} />
        <Route path="teacher-register" element={<TeacherRegister />} />
        <Route path="teacher-login" element={<TeacherLogin />} />
        <Route path="select-student" element={<SelectRound />} />
      </Route>

      {/* Protected Student Dashboard */}
      <Route
        path="/student-dashboard"
        element={
          <ProtectedRouteStudent>
            <StudentLayout />
          </ProtectedRouteStudent>
        }
      >
        <Route index element={<AllJobs />} />
        <Route path="my-job" element={<MyJobs />} />
        <Route path="applied-jobs" element={<AppliedJobs />} />
        <Route path='show-one-job/:id' element={<StudentShowOneJob/>}/>
        <Route path="apply-job/:id" element={<ApplyJob/>} />
      </Route>

        <Route path="/teacher-dashboard" 
          element={
            <ProtectedTeacherRouter>
               <TeacherLayout />
            </ProtectedTeacherRouter>
          }
        >
        <Route index element={<AllJobs />} />
        <Route path='show-one-job/:id' element={<StudentShowOneJob/>}/>
        <Route path="my-job" element={<CreatedJob/>} />
        <Route path="create-a-job" element={<CreateAJob/>} />
        {/* Uncomment the route below if needed */}
        <Route path="add-student" element={<AddStudent />} />
        <Route path="teacher-handle-own-job/:id" element={<TeacherHandleOwnJob />} />
        <Route path="teacher-show-applied-student/:jobId" element={<AppliedStudentList />} />
      </Route>

    </Routes>
  );
}

export default App;
