import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Clientregister = () => {
  const cnic = useRef();
  const email = useRef();
  const name = useRef();
  const navigate = useNavigate()
  const registration = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const userData = {
      cnic: cnic.current.value,
      email: email.current.value,
      name: name.current.value,
    };

    try {
      const response = await fetch("http://localhost:8000/api/v2/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Registration successful:", data);
      } else {
        console.error("Registration failed:", data);
      }
      navigate('/clientlogin')
      cnic.current.value = ""
      email.current.value = ""
      name.current.value = ""
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center h-[100vh]">
        <form onSubmit={registration} className="flex flex-col justify-center gap-3">
          <h2>Welcome to Saylani Microfinance Registration</h2>

          {/* CNIC Input */}
          <input
            type="text"
            name="cnic"
            ref={cnic} // Add the ref to this input
            placeholder="Enter CNIC Number"
            className="input input-bordered w-full max-w-xs"
          />

          {/* Email Input */}
          <input
            type="email"
            name="email"
            ref={email} // Add the ref to this input
            placeholder="Enter Your Email"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            name="name"
            ref={name}
            placeholder="Enter Your Name"
            className="input input-bordered w-full max-w-xs"
          />

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Clientregister;
