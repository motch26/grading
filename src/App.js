import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import StudentHome from "./components/student/StudentHome";
import TeacherHome from "./components/teacher/TeacherHome";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import Classes from "./components/teacher/Classes";
import SessionInfo from "./components/teacher/SessionInfo";
import Edit from "./components/teacher/Edit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home">
        <Route path="student" element={<StudentHome />} />
        <Route path="teacher" element={<TeacherHome />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="classes" element={<Classes />}>
            <Route path=":sessionID" element={<SessionInfo />}>
              <Route path="edit" element={<Edit />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
