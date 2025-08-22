"use client";

import React, { useState } from "react";

const RequestCall = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    purposeOfPurchase: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log("Form submitted:", formData);
  };

  const purposeOptions = [
    "Investment property",
    "Primary residence",
    "Vacation home",
    "Business property",
    "Rental property",
    "Other"
  ];

  return (
    <section
      className="py-16 md:py-24 px-4 bg-white"
      role="region"
      aria-labelledby="request-call-title"
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <header className="text-center mb-12">
          <h2
            id="request-call-title"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
            style={{ color: "#CA9B43", fontFamily: '"Baskerville Display PT", serif' }}
          >
            REQUEST A CALL
          </h2>
        </header>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
          role="form"
          aria-labelledby="request-call-title"
        >

          {/* Full Name Field */}
          <div className="flex flex-col">
            <label
              htmlFor="fullName"
              className="text-gray-700 text-sm font-medium mb-2 sr-only"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full name"
              className="w-full px-4 py-3 border border-black bg-white text-gray-900 placeholder-black focus:outline-none focus:ring-2 focus:ring-[#CA9B43] focus:border-transparent transition-all duration-300 rounded-lg"
              required
              aria-required="true"
            />
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="text-gray-700 text-sm font-medium mb-2 sr-only"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone number"
              className="w-full px-4 py-3 border border-black bg-white text-gray-900 placeholder-black focus:outline-none focus:ring-2 focus:ring-[#CA9B43] focus:border-transparent transition-all duration-300 rounded-lg"
              required
              aria-required="true"
            />
          </div>

          {/* Purpose of Purchase Dropdown */}
          <div className="flex flex-col">
            <label
              htmlFor="purposeOfPurchase"
              className="text-gray-700 text-sm font-medium mb-2 sr-only"
            >
              Purpose of Purchase
            </label>
            <select
              id="purposeOfPurchase"
              name="purposeOfPurchase"
              value={formData.purposeOfPurchase}
              onChange={handleInputChange}
              className="w-full px-4 py-3 pr-10 border border-black bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CA9B43] focus:border-transparent transition-all duration-300 cursor-pointer rounded-lg appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23000000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em'
              }}
              required
              aria-required="true"
            >
              <option value="" disabled className="text-black">
                Purpose of purchase
              </option>
              {purposeOptions.map((option, index) => (
                <option key={index} value={option} className="text-black">
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col">
            <button
              type="submit"
              className="w-full px-6 py-3 text-white font-medium uppercase tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#CA9B43] focus:ring-offset-2 hover:opacity-90 rounded-lg min-h-[50px]"
              style={{ backgroundColor: "#CA9B43" }}
              aria-label="Submit contact request"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RequestCall;