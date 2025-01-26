"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoanLandingPage() {
  // Initialize loan data state from localStorage or empty values
  const [loanData, setLoanData] = useState(() => {
    const savedData = localStorage.getItem("loanData");
    return savedData ? JSON.parse(savedData) : { category: "", subcategory: "", deposit: "", period: "", loanAmount: "" };
  });
  const [loanEstimate, setLoanEstimate] = useState(null);
  const navigate = useNavigate();

  // Example categories and subcategories
  const categories = {
    "Home Loan": ["Mortgage", "Renovation"],
    "Auto Loan": ["Car", "Motorcycle"],
    "Personal Loan": ["Education", "Medical"],
  };

  const periods = [6, 12, 24, 36, 48];

  // Handle form changes and save to state
  const handleChange = (e) => {
    const updatedData = { ...loanData, [e.target.name]: e.target.value };
    setLoanData(updatedData);
    localStorage.setItem("loanData", JSON.stringify(updatedData)); // Save to localStorage
  };

  // Calculate loan estimate
  const calculateLoan = () => {
    // You can implement the loan calculation logic here
    // Example: Calculate the estimated total amount or monthly payment based on the deposit and loan period
    navigate("/clientregister");
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#f8fafc] py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to Saylani Microfinance</h1>
          <p className="mt-4 text-lg">
            Choose the right loan for your needs and calculate your estimates easily.
          </p>
        </div>
      </section>

      {/* Loan Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Loan Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {Object.keys(categories).map((category) => (
              <div
                key={category}
                className="p-6 bg-white shadow-lg rounded-lg text-center"
              >
                <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
                <ul className="mt-4 space-y-2">
                  {categories[category].map((subcategory) => (
                    <li key={subcategory} className="text-gray-600">
                      {subcategory}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Loan Calculator
          </h2>
          <div className="mt-8 max-w-2xl mx-auto bg-white shadow-lg p-6 rounded-lg">
            <form className="space-y-4">
              {/* Select Category */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Loan Category
                </label>
                <select
                  name="category"
                  value={loanData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select a category</option>
                  {Object.keys(categories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {loanData.category && (
                <div>
                  <label className="block text-gray-700 font-medium">
                    Subcategory
                  </label>
                  <select
                    name="subcategory"
                    value={loanData.subcategory}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">Select a subcategory</option>
                    {categories[loanData.category].map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Initial Deposit */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Initial Deposit ($)
                </label>
                <input
                  type="number"
                  name="deposit"
                  value={loanData.deposit}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter initial deposit"
                />
              </div>

              {/* Loan Period */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Loan Period (months)
                </label>
                <select
                  name="period"
                  value={loanData.period}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select loan period</option>
                  {periods.map((period) => (
                    <option key={period} value={period}>
                      {period} months
                    </option>
                  ))}
                </select>
              </div>

              {/* Loan Amount */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Loan Amount ($)
                </label>
                <input
                  type="number"
                  name="loanAmount"
                  value={loanData.loanAmount}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter loan amount"
                />
              </div>
            </form>
            <button
              onClick={calculateLoan}
              className="btn btn-primary w-full mt-6"
            >
              Proceed
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2025 LoanEasy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
