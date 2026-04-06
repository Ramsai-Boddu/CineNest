import { useState } from 'react';
import './css/add-user.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AddUsers = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const adduser = async (e: any) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("accessToken");

            const res = await axios.post(
                "http://localhost:3000/super-admin/create-user",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("User added successfully:", res.data);
            toast.success(res.data?.message || "User added successfully" );
            setFormData({ name: "", email: "" });

        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        }
    };
    return (
        <div className='main-container'>
            <div className='form-container'>
                <h2 className='title'>Add Admin</h2>
                <form onSubmit={adduser}>
                    <div className='input-group'>
                        <label>Name</label>
                        <input type="text" name='name' placeholder='Enter name' value={formData.name}
                            onChange={handleChange} />
                    </div>
                    <div className='input-group'>
                        <label>Email</label>
                        <input type="email" name='email' placeholder='Enter email' value={formData.email}
                            onChange={handleChange} />
                    </div>
                    <button type='submit' className='submit-btn'>Add User</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddUsers