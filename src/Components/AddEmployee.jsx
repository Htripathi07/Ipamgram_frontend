import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    location: "",
    role: "employee", // default role
    image: null,
  });
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployee({ ...employee, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post(`${process.env.REACT_APP_API_URL}/employees`, employee, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((result) => {
      if (result.data.Status) {
        navigate("/dashboard/employee");
      } else {
        alert(result.data.Error);
      }
    })
    .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/departments`)
      .then((result) => {
        console.log(result.data);
        if (result.data.length > 0) {
          setCategory(result.data);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>

          {/* Email Input */}
          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          {/* Password Input */}
          <div className="col-12">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
          </div>
          {/* Role Selection */}
          <div className="col-12">
            <label htmlFor="inputRole" className="form-label">
              Department
            </label>
            <select
              id="inputRole"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, department: e.target.value })
              }
            >
              {category.map((c) => (
                <option value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          {/* Location Input */}
          <div className="col-12">
            <label htmlFor="inputLocation" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputLocation"
              placeholder="Enter Location"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, location: e.target.value })
              }
            />
          </div>

          {/* Role Selection */}
          <div className="col-12">
            <label htmlFor="inputRole" className="form-label">
              Role
            </label>
            <select
              id="inputRole"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, role: e.target.value })
              }
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="col-12 mb-3">
            <label htmlFor="inputGroupFile01" className="form-label">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={handleImageChange}
            />
          </div>

          {/* Submit Button */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
