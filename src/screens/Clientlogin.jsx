import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Clientlogin = () => {
    const cnic = useRef();
    const password = useRef();
    const navigate = useNavigate()
    const clientLogin = async (e) => {
        e.preventDefault();
        const loginData = {
            cnic: cnic.current.value,
            password: password.current.value,
        };

        try {
            const response = await fetch("http://localhost:8000/api/v2/clientlogin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(loginData),
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Login successful:", data);
                localStorage.setItem("accessToken", data.accessToken);
                navigate('/clientpasswordchange')
            } else {
                console.error("Login failed:", data);
                alert("Login failed. Please check your CNIC or password.");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="flex justify-center h-[100vh]">
            <form onSubmit={clientLogin} className="flex flex-col justify-center gap-3">
                <h2 className="text-3xl font-bold text-center">Client Login</h2>
                <input
                    type="text"
                    ref={cnic}
                    placeholder="Enter CNIC"
                    className="input input-bordered w-full max-w-xs"
                />
                <input
                    type="password"
                    ref={password}
                    placeholder="Enter Password"
                    className="input input-bordered w-full max-w-xs"
                />
                <button type="submit" className="btn btn-primary w-full">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Clientlogin;
