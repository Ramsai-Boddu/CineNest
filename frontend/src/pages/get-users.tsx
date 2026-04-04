import axios from "axios"
import { useEffect, useState } from "react";
import './css/get-users.css'

const Getusers = () => {
    type User = {
        id: string;
        name: string;
        email: string;
        password?: string | null;
        role: string;
        isActive: boolean;
        isLoggedIn: boolean;
        otp?: string | null;
        otpExpiry?: string | null;
        profilePic?: string | null;
        token?: string | null;
        createdAt?: string;
        updatedAt?: string;
    };
    const accessToken = localStorage.getItem("accessToken");
    const [users, setUsers] = useState<User[]>([]);
    if (!accessToken) {
        console.error("No access token found. Please log in.");
        return null; // or redirect to login page
    }
    const getUsers = async () => {
        try {
            const res = await axios.get("http://localhost:3000/super-admin/get-users", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setUsers(res.data.data);
            console.log("Users:", res.data);
        } catch (err: any) {
            console.error("Error fetching users:", err);
        }
    }
    useEffect(() => {
        getUsers();
    }, []);

    const toggleActive = async (userId: string) => {
        try {

            await axios.patch(
                `http://localhost:3000/super-admin/manage-active/${userId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            // 🔥 Update UI instantly (no reload)
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === userId
                        ? { ...user, isActive: !user.isActive }
                        : user
                )
            );

        } catch (err: any) {
            console.error("Error updating user status:", err);
        }
    };
    return (
        <div className="user-container">
            <div className="users-table">
                <h3>Registered Users</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Logged In</th>
                            <th>Active</th>
                            <th>Update</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>

                                <td>
                                    <div className="password-cell">
                                        {user.password || "N/A"}
                                    </div>
                                </td>

                                <td>{user.isLoggedIn ? "Yes" : "No"}</td>

                                <td>
                                    {user.isActive ? (
                                        <button
                                            className="deactivate-btn"
                                            onClick={() => toggleActive(user.id)}
                                        >
                                            Deactivate
                                        </button>
                                    ) : (
                                        <button
                                            className="activate-btn"
                                            onClick={() => toggleActive(user.id)}
                                        >
                                            Activate
                                        </button>
                                    )}
                                </td>

                                <td>
                                    <button
                                        className="update-btn"
                                        onClick={() => handleUpdate(user)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Getusers