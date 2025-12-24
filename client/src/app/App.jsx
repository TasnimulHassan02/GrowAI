import React from "react";
import HomePage from "../features/home/page/HomePage.jsx";
import LoginPage from "../features/auth/page/LoginPage.jsx";
import RegisterPage from "../features/auth/page/RegisterPage.jsx";
import LabelerPage from "../features/labelers/pages/LabelerPage.jsx";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  
  return (
    <div className="font-sans bg-white text-gray-900">
      
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path="/labelers" element={
            <ProtectedRoute>
              <LabelerPage />
            </ProtectedRoute>
          } />
      </Routes>
      
    </div>
  );
}

export default App;

