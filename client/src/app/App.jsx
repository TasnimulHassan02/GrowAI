import React from "react";
import HomePage from "../features/home/page/HomePage.jsx";
import LoginPage from "../features/auth/page/LoginPage.jsx";
import RegisterPage from "../features/auth/page/RegisterPage.jsx";
import CheckoutPage from "../features/payment/page/CheckoutPage.jsx";
import LabelerPage from "../features/labelers/pages/LabelerPage.jsx";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RequestLabelPage from "../features/labelers/pages/RequestLabelPage.jsx";
import CreateRequestPage from "../features/findData/pages/CreateRequestPage.jsx";
import RequestsDashboardPage from "../features/findData/pages/RequestsDashboardPage.jsx";
// import NotificationsPage from "../features/notifications/pages/NotificationsPage.jsx";
import MessagesPage from "../features/messages/pages/MessagesPage.jsx"
import SubscriptionPage from "../features/subs/Subscription.jsx";
import SellerRegister from "../features/seller/pages/SellerRegisterPage.jsx";
import RegisterLabelerPage from "../features/labelers/pages/RegisterLabelerPage";
import AdminDashboard from "../features/admin/page/AdminDashboardPage.jsx"
import ProfilePage from "../features/profile/page/ProfilePage.jsx";
import DatasetPage from "../features/dataset/page/DatasetPage.jsx";
import DatasetDetailsPage from "../features/dataset/page/DatasetDetailsPage.jsx";
import UploadDatasetPage from "../features/seller/pages/UploadDatasetPage.jsx";
import LabelerDashboard from "../features/labelers/pages/LabelerDashboardPage.jsx";



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
        <Route path="/requestlabel" element={
            <ProtectedRoute>
              <RequestLabelPage />
            </ProtectedRoute>
          } />
        <Route path='/datarequest' element={
            <ProtectedRoute>
              <RequestsDashboardPage />
            </ProtectedRoute>} />
        <Route path='/createrequest' element={
            <ProtectedRoute>
              <CreateRequestPage />
            </ProtectedRoute>} />
        <Route path='/checkout' element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>} />
        {/* <Route path="/notifications" element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>} /> */}
        <Route path="/messages" element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>} />
      
        <Route path='/subscriptions' element={<SubscriptionPage />} />

        <Route path="/sellers/register" element={
            <ProtectedRoute>
              <SellerRegister />
            </ProtectedRoute>} />

        <Route path="/labelers/register" element={
            <ProtectedRoute>
              <RegisterLabelerPage />
            </ProtectedRoute>} />
        <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>} />

        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>} />
        <Route path="/datasets" element={
          <ProtectedRoute>
            <DatasetPage />
          </ProtectedRoute>} />
        <Route path="/datasets/:id" element={
            <ProtectedRoute>
            <DatasetDetailsPage />
          </ProtectedRoute>} />

        <Route
          path="/seller/upload"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <UploadDatasetPage />
            </ProtectedRoute>} />
        <Route
          path="/labeler/dashboard"
          element={
            <ProtectedRoute >
              <LabelerDashboard />
            </ProtectedRoute>} />

      </Routes>
    
      
      
    </div>
  );
}

export default App;

{/* <Route
  path="/buyer/dashboard"
  element={
    <ProtectedRoute allowedRoles={["buyer"]}>
      <BuyerDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/seller/dashboard"
  element={
    <ProtectedRoute allowedRoles={["seller"]}>
      <SellerDashboard />
    </ProtectedRoute>
  }
/> */}