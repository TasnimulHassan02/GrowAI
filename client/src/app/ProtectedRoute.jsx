import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const roles = role.split(",");

  if (!token) {
    return <Navigate to="/login" replace />;
  } 
  {console.log(roles[1])}
  if (allowedRoles && !allowedRoles.includes(roles[1])) {
  return <Navigate to="/" replace/>;
}

  return children;
};

export default ProtectedRoute;
