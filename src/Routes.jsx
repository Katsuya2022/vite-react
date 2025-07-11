import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Page1 from "./pages/Page1.jsx";
import TableViewer from "./pages/TableViewer.jsx";
import Todo from "./pages/Todo.jsx";
import NoMatch from "./pages/NoMatch.js";
import AppLayout from "./components/Layout/AppLayout.jsx";
import SignUp from "./pages/SignUp.jsx";

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
            <Route path="page1" element={<Page1 />} />
            <Route path="tableviewer" element={<TableViewer />} />
            <Route path="todo" element={<Todo />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}