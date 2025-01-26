import React, { useState } from "react";

const LoanRequest = () => {
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [amount, setAmount] = useState("");
    const [loanPeriod, setLoanPeriod] = useState("");
    const [guarantors, setGuarantors] = useState([{ name: "", email: "", location: "", cnic: "" }]);

    const handleGuarantorChange = (index, field, value) => {
        const updatedGuarantors = [...guarantors];
        updatedGuarantors[index][field] = value;
        setGuarantors(updatedGuarantors);
    };

    // const handleAddGuarantor = () => {
    //     setGuarantors([...guarantors, { name: "", email: "", location: "", cnic: "" }]);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            category,
            subcategory,
            amount,
            loanPeriod,
            guarantors,
            status: "Pending", // Default status
        };

        const verifyToken = localStorage.getItem("accessToken");
        if (!verifyToken) {
            console.error("No access token found");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/v3/createloans", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${verifyToken}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error details:", errorData);
                alert(`Failed to submit loan request: ${errorData.message || "Unknown error"}`);
                return;
            }

            const data = await response.json();
            console.log("Loan request created successfully:", data);
            alert("Loan request submitted!");
        } catch (error) {
            console.error("Error submitting loan request:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="flex justify-center items-center h-full bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-8 bg-white shadow-lg rounded-lg w-full max-w-lg"
            >
                <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
                    Request For Loan
                </h1>

                <input
                    type="text"
                    name="category"
                    placeholder="Enter Your Category"
                    className="input input-bordered w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <input
                    type="text"
                    name="subcategory"
                    placeholder="Enter Your Subcategory"
                    className="input input-bordered w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    required
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Enter Your Loan Amount"
                    className="input input-bordered w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <input
                    type="number"
                    name="loanPeriod"
                    placeholder="Enter Loan Period (in months)"
                    className="input input-bordered w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={loanPeriod}
                    onChange={(e) => setLoanPeriod(e.target.value)}
                    required
                />

                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Guarantors</h2>
                    {guarantors.map((guarantor, index) => (
                        <div key={index} className="flex flex-col gap-3 mb-4">
                            <input
                                type="text"
                                placeholder="Guarantor Name"
                                className="input input-bordered w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={guarantor.name}
                                onChange={(e) => handleGuarantorChange(index, "name", e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Guarantor Email"
                                className="input input-bordered w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={guarantor.email}
                                onChange={(e) => handleGuarantorChange(index, "email", e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Guarantor Location"
                                className="input input-bordered w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={guarantor.location}
                                onChange={(e) => handleGuarantorChange(index, "location", e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Guarantor CNIC"
                                className="input input-bordered w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={guarantor.cnic}
                                onChange={(e) => handleGuarantorChange(index, "cnic", e.target.value)}
                                required
                            />

                        </div>
                    ))}

                    {/* <button
                        type="button"
                        onClick={handleAddGuarantor}
                        className="text-blue-500 hover:text-blue-700"
                    >
                        Add Another Guarantor
                    </button> */}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary py-3 px-6 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
                >
                    Submit Loan Request
                </button>
            </form>
        </div>
    );
};

export default LoanRequest;
