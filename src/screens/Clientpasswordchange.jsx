import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const Clientpasswordchange = () => {
    const navigate = useNavigate()
    const newPassword = useRef();

    const updatePassword = async (e) => {
        e.preventDefault();

        const passwordData = {
            newPassword: newPassword.current.value,
        };
        const verifyToken = localStorage.getItem("accessToken");
        if (!verifyToken) {
            navigate("/");
            return;
        }
        try {
            const response = await fetch("http://localhost:8000/api/v2/clientpasswordupdate", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${verifyToken}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(passwordData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Password updated successfully!");
                console.log("Success:", data);
                navigate('/dashboard')
                newPassword.current.value = '';
            } else {
                alert("Failed to update password. Please try again.");
                console.error("Error:", data);
            }
        } catch (error) {
            console.error("Error updating password:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div>
            <div className="flex justify-center h-[100vh]">
                <form
                    onSubmit={updatePassword}
                    className="flex flex-col justify-center gap-3  w-full max-w-sm"
                >
                    <h1 className="text-2xl text-center font-bold">Update Password</h1>

                    <input
                        type="password"
                        placeholder="Enter New Password"
                        ref={newPassword}
                        className="input input-bordered w-full"
                        required
                    />

                    <button type="submit" className="btn btn-primary">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Clientpasswordchange;
