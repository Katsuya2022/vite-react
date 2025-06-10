import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"; // Home.jsxの読み込み
import Page1 from "./pages/Page1.jsx"; // Page1.jsxの読み込み
import Page2 from "./pages/Page2.jsx"; // Page2.jsxの読み込み

export const AppRoutes = () => {
   return (
       <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/Page1" element={<Page1 />} />
           <Route path="/page2" element={<Page2 />} />
       </Routes>
   )
}