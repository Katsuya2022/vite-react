import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/Layout/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

import ProtectedRoute from './components/ProtectedRoute';
import Todo from "./pages/Todo.jsx";
import SkillSheet from "./pages/SkillSheet.jsx"
import TableViewer from "./pages/TableViewer.jsx";
import NoMatch from "./pages/NoMatch.js";

import './Routes.css';

export const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />

          <Route element={<ProtectedRoute />}>
            <Route path="todo" element={<Todo />} />
            <Route path="skill-sheet" element={<SkillSheet />} />
            <Route path="tableviewer" element={<TableViewer />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}