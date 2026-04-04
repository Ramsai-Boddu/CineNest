import axios from "axios";
import React, { useState, useEffect } from "react";
import './css/update-profile.css';
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const UpdateUser = () => {
    const { userId } = useParams<{ userId: string }>();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    // ✅ FETCH EXISTING USER DATA
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
                setProfilePic(user.profilePic || null);

            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setFetchLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    // handle file change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setProfilePic(URL.createObjectURL(selected));
        }
    };

    // submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("accessToken");

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);

            if (file) {
                formData.append("file", file);
            }

            await axios.put(
                `http://localhost:3000/admin/update-user/${userId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            localStorage.setItem("profilePic", profilePic || "/noprofile.png");
            toast.success("Updated successfully ✅");
        } catch (err) {
            console.error(err);
            toast.error("Update failed ❌");
        }

        setLoading(false);
    };

    // ✅ LOADING STATE BEFORE DATA COMES
    if (fetchLoading) {
        return <div className="container">Loading user data...</div>;
    }

    return (
        <div className="container">
            <h2>Update User</h2>

            <form onSubmit={handleSubmit} className="form">

                {/* Image */}
                <div className="image-section">
                    <img
                        src={profilePic || "/default.png"}
                        alt="profile"
                        className="profile-img"
                    />

                    <input type="file" onChange={handleFileChange} />
                </div>

                {/* Name */}
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {/* Email */}
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Button */}
                <button type="submit">
                    {loading ? "Updating..." : "Update"}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default UpdateUser;