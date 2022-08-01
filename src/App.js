import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AdminHome from "./components/admin/AdminHome";
import Student from "./components/admin/enrolment/Student";
import Faculty from "./components/admin/enrolment/Faculty";
import Course from "./components/admin/register/Course";
import Section from "./components/admin/register/Section";
import Subject from "./components/admin/register/Subject";

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
      </Route>
    </Routes>
  );
};

export default App;
