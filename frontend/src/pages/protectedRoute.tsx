import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }: any) => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Not admin but trying admin route
  if (adminOnly && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;