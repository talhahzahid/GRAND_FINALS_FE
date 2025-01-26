import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
    // State to hold the application data, loading status, and any error messages
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/v4/get");
                setApplications(response.data.applications);  // Extract applications from response
            } catch (err) {
                setError("Failed to load data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchApplications();
    }, []);

    // Handle approve button click
    const handleApprove = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v4/status/${id}`,
                { status: "Approved" }
            );
            // Update the status of the application locally
            setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app._id === id ? { ...app, status: "Approved" } : app
                )
            );
        } catch (err) {
            setError("Failed to approve the application.");
        }
    };

    // Handle reject button click
    const handleReject = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/v4/status/${id}`,
                { status: "Rejected" }
            );
            // Update the status of the application locally
            setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app._id === id ? { ...app, status: "Rejected" } : app
                )
            );
        } catch (err) {
            setError("Failed to reject the application.");
        }
    };

    // Loading spinner or error message handling
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <button className="btn loading">Loading...</button>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Admin Dashboard</h1>

            {/* Application Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Amount</th>
                            <th>Loan Period</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Guarantors</th>
                            <th>Actions</th> {/* New column for buttons */}
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr key={application._id}>
                                <td>{application._id}</td>
                                <td>{application.category}</td>
                                <td>{application.subcategory}</td>
                                <td>{application.amount}</td>
                                <td>{application.loanPeriod} year</td>
                                <td>{application.status}</td>
                                <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                                <td>
                                    {application.guarantors.map((guarantor) => (
                                        <div key={guarantor._id}>
                                            <p><strong>Name:</strong> {guarantor.name}</p>
                                            <p><strong>Email:</strong> {guarantor.email}</p>
                                            <p><strong>Location:</strong> {guarantor.location}</p>
                                            <p><strong>CNIC:</strong> {guarantor.cnic}</p>
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {/* Approve and Reject buttons */}
                                    <button
                                        className="btn btn-success mr-2"
                                        onClick={() => handleApprove(application._id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="btn btn-error"
                                        onClick={() => handleReject(application._id)}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
