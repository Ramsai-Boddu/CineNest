import { useState } from 'react';
import './css/forgot-password.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const sendOtp = async (e: any) => {
        e.preventDefault();
        try {
            await axios.put(
                "http://localhost:3000/admin/send-otp",
                { email: formData.email }
            );

            toast.success("OTP sent to your email");

        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to send OTP");
        }
    };
    const isLengthValid = formData.newPassword.length >= 5;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword);

    const changePassowrd = async (e: any) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }



        if (!isLengthValid || !hasSpecialChar) {
            toast.error("Password does not meet criteria");
            return;
        }
        try {
            await axios.put(
                "http://localhost:3000/admin/reset-password", formData
            );
            toast.success("Password reset successful");

            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 4000);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to reset password");
        }
    }


    return (
        <div className='main-container'>
            <div className='form-container'>
                <h2 className='title'>Forgot Password</h2>
                <form onSubmit={changePassowrd}>
                    <div className='input-group'>
                        <label>Email</label>
                        <input type="email" name='email' placeholder='Enter email' value={formData.email} onChange={handleChange} />

                    </div>
                    <div className='input-group'>
                        <label>OTP</label>
                        <input type="text" name='otp' placeholder='Enter OTP' value={formData.otp} onChange={handleChange} />
                    </div>
                    <div className='input-group'>
                        <label>New Password</label>
                        <input type="password" name='newPassword' placeholder='Enter new password' value={formData.newPassword} onChange={handleChange} />
                    </div>
                    <div className='input-group'>
                        <label>Confirm Password</label>
                        <input type="password" name='confirmPassword' placeholder='Confirm new password' value={formData.confirmPassword} onChange={handleChange} />
                    </div>
                    <div className="password-rules">
                        <p className={isLengthValid ? "valid" : "invalid"}>
                            • At least 5 characters
                        </p>

                        <p className={hasSpecialChar ? "valid" : "invalid"}>
                            • At least one special character
                        </p>
                    </div>
                    <div className='button-sec'>
                        <button onClick={sendOtp} className='submit-btn'>Send Otp</button>
                        <button type='submit' className='submit-btn'>Reset Password</button>
                    </div>

                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ForgotPassword