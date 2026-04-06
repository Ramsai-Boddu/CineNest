import { useState } from "react";
import axios from "axios";
import "./css/login.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!formData.email || !formData.password) {
      return "All fields are required";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      return "Invalid email format";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/admin/login",
        formData
      );

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("userId", res.data.data.id);
      localStorage.setItem("role", res.data.data.role);
      localStorage.setItem("profilePic", res.data.data.profilePic);

      navigate("/", { replace: true });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-text">
          <span onClick={() => navigate("/forgot-password")}>
            Forgot Password
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;