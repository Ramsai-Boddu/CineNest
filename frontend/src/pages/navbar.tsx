import { useEffect, useState } from "react";
import './css/navbar.css';
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className='navheader'>
      <div className='logo'>
        <img src="/logo.png" alt="CineNest Logo" className='logoimg'/>
        <h2 className='name'>CineNest</h2>
      </div>
      
      <div className='navlinks'>
        <a href="/">Home</a>
        <a href="/movies">Movies</a>

        {role === "admin" && (
          <a href="/add-user">Add Admin</a>
        )}

        {isLoggedIn ? (
          <>
            <a href="/profile">
              <img src="/noprofile.png" alt="Profile" className='navimg'/>
            </a>
            <a onClick={handleLogout}>
              Logout
            </a>
          </>
        ) : (
          <a href="/login">Login</a>
        )}

      </div>
    </div>
  );
}

export default Navbar;