import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // If you're using axios for API requests

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    location: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/signup`, values)
      .then((response) => {
        if (response.data.message === "Signup successfully") {
          alert(response.data.message);
          navigate("/adminlogin"); 
        }
      })
      .catch((error) => {
        setError("Error during registration"); 
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-warning">{error && error}</div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name:</strong>
            </label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              placeholder="Enter Name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role">
              <strong>Role:</strong>
            </label>
            <select
              name="role"
              onChange={(e) => setValues({ ...values, role: e.target.value })}
              className="form-control rounded-0"
            >
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="location">
              <strong>Location:</strong>
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter Location"
              onChange={(e) =>
                setValues({ ...values, location: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Register
          </button>
          <div className="mb-1">
            <p>
              Already Registered?{" "}
              <span>
                <u onClick={() => navigate("/")}>Login Here</u>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
