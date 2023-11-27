import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditEmployee from "./EditEmployee";

const EmployeeByDepartment = () => {
  const [employee, setEmployee] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const { id } = useParams();
  const handleEditClick = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedEmployeeId(null);
  };

  const navigate = useNavigate();
  const handleEmployeeClick = (id) => {
    navigate(`/dashboard/employee/${id}`);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/employees/byDepartment/` + id)
      .then((result) => {
        if (result.data) {
          setEmployee(result.data);
        } else {
          alert(result.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/employees/` + id)
      .then((result) => {
        if (result.data.status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Address</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr>
                <td>
                  <img src={e.image} className="employee_image" />
                </td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>{e.location}</td>
                <td>{e.role}</td>
                <td>
                  <button
                    onClick={() => handleEmployeeClick(e._id)}
                    style={{ cursor: "pointer" }}
                    className="btn btn-success btn-sm me-2"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleEditClick(e._id)}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditModal && (
        <EditEmployee
          show={showEditModal}
          handleClose={handleCloseModal}
          employeeId={selectedEmployeeId}
        />
      )}
    </div>
  );
};

export default EmployeeByDepartment;
