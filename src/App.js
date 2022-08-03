import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AdminHome from "./components/admin/AdminHome";
import Student from "./components/admin/enrolment/Student";
import Faculty from "./components/admin/enrolment/Faculty";
import Course from "./components/admin/register/Course";
import Section from "./components/admin/register/Section";
import Subject from "./components/admin/register/Subject";
import Load from "./components/admin/load/Load";
import FacultyHome from "./components/faculty/FacultyHome";
import Classes from "./components/faculty/Classes";
import Grades from "./components/faculty/Grades";
import StudentHome from "./components/student/StudentHome";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="admin" element={<AdminHome />}>
        <Route path="student" element={<Student />} />
        <Route path="faculty" element={<Faculty />} />
        <Route path="course" element={<Course />} />
        <Route path="section" element={<Section />} />
        <Route path="subject" element={<Subject />} />
        <Route path="load" element={<Load />} />
      </Route>
      <Route path="faculty" element={<FacultyHome />}>
        <Route path="classes" element={<Classes />} />
        <Route path="grades" element={<Grades />} />
      </Route>
      <Route path="student" element={<StudentHome />} />
    </Routes>
  );
};

export default App;
