// import React from "react";
// import HomePage from "./pages/HomePage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import RegisterPage from "./pages/RegisterPage.jsx";
// import LabelerPage from "./pages/LabelerPage.jsx";
// import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <div className="font-sans bg-slate-50 text-slate-900 min-h-screen">
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route
//           path="/labelers"
//           element={
//             <ProtectedRoute>
//               <LabelerPage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import React from "react";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LabelerPage from "./pages/LabelerPage.jsx";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  
  return (
    <div className="font-sans bg-white mx-8 text-gray-900">
      
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

