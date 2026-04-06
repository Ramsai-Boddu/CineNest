import axios from "axios";
import React, { useState, useEffect } from "react";
import "./css/update-profile.css";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SuperUpdate = () => {
  const { userId } = useParams<{ userId: string }>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get(
          `http://localhost:3000/admin/get-user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = res.data.user;

        setName(user.name || "");
        setEmail(user.email || "");
        setProfilePic(user.profilePic || "");
      } catch (error) {
        console.error(error);
      } finally {
        setFetchLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("accessToken");

      const data = {
        name,
        email,
      };

      const res = await axios.put(
        `http://localhost:3000/super-admin/update-user/${userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const message = res.data?.message || res.data?.data?.message;
      toast.success(message || "User updated successfully");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong";
      toast.error(errorMessage);
    }

    setLoading(false);
  };

  if (fetchLoading) {
    return <div className="container">Loading user data...</div>;
  }

  return (
    <div className="container">
      <h2>Update User</h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="image-section">
          <img
            src={profilePic || "/noprofile.png"}
            alt="profile"
            className="profile-img"
          />
        </div>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">
          {loading ? "Updating..." : "Update"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default SuperUpdate;