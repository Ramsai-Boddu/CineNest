import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ProtectedRoute = ({ children, adminOnly = false }: any) => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Please login to access this page");
      navigate("/login", { replace: true });
    } else if (adminOnly && role !== "admin") {
      toast.error("You are not authorized to access this page");
      navigate("/", { replace: true });
    }
  }, [token, role, adminOnly, navigate]);

  if (!token || (adminOnly && role !== "admin")) {
    return null;
  }

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default ProtectedRoute;