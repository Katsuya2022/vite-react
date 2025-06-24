import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"; // Home.jsxの読み込み
import Page1 from "./pages/Page1.jsx";
import TableViewer from "./pages/TableViewer.jsx";
import Todo from "./pages/Todo.jsx";
import NoMatch from "./pages/NoMatch.js";
import AppLayout from "./components/Layout/AppLayout.jsx";

import './Routes.css';

export const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/TableViewer" element={<TableViewer />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}