import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"; // Home.jsxの読み込み
import Page1 from "./pages/Page1.jsx"; // Page1.jsxの読み込み
import Page2 from "./pages/Page2.jsx"; // Page2.jsxの読み込み
import Page3 from "./pages/Page3.jsx";
import NoMatch from "./pages/NoMatch.js";
import AppLayout from "./components/Layout/AppLayout.js";

import './Routes.css';

export const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}