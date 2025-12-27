import React from "react";
import HomePage from "../features/home/page/HomePage.jsx";
import LoginPage from "../features/auth/page/LoginPage.jsx";
import RegisterPage from "../features/auth/page/RegisterPage.jsx";
import CheckoutPage from "../features/payment/page/CheckoutPage.jsx";
import LabelerPage from "../features/labelers/pages/LabelerPage.jsx";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RequestLabelPage from "../features/labelers/pages/RequestLabelPage.jsx";
import CreateRequestPage from "../features/data_request/pages/CreateRequestPage.jsx";
import RequestsDashboardPage from "../features/data_request/pages/RequestsDashboardPage.jsx";
import NotificationsPage from "../features/notifications/pages/NotificationsPage.jsx";
import MessagesPage from "../features/messages/pages/MessagesPage.jsx"
import SubscriptionPage from "../features/subs/Subscription.jsx";

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
        <Route path="/notifications" element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>} />
        <Route path="/messages" element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>} />
      
      <Route path='/subscriptions' element={<SubscriptionPage />} />
      </Routes>
      
      
      
    </div>
  );
}

export default App;

