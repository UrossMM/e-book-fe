import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Signup from "./components/Signup";
import AdminPage from "./AdminPage";
import AdminSettings from "./AdminSettings";
import AdminTempate from "./AdminTempate";
import AdminFilterMeals from "./AdminFilterMeals";
import AdminLogin from "./AdminLogin";
import AdminAdditions from "./AdminAdditions";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="data" element={<Signup />} />
      <Route path="admin" element={<AdminPage/>} />
      <Route path="settings" element={<AdminSettings/>} />
      <Route path="templates" element={<AdminTempate/>}/>
      <Route path="filterMeals" element={<AdminFilterMeals/>} />
      <Route path="login" element={<AdminLogin/>} />
      <Route path="foodstuffs" element={<AdminAdditions/>} />
    </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
