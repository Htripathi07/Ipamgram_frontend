import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditCategory, { EditDepartmentModal } from "./EditDepartmentModal";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const Navigate = useNavigate([]);
  const handleEditClick = (department) => {
    setSelectedDepartment(department);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedDepartment(null);
  };

  const handleEmployees = (id) => {
    Navigate("/dashboard/departments/" + id);
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
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Department List</h3>
      </div>

      <Link to="/dashboard/add_category" className="btn btn-success">
        Add Department
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.map((c) => (
              <tr>
                <td onClick={() => handleEmployees(c._id)}>{c.name}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleEditClick(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    // onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <EditDepartmentModal
          show={showModal}
          handleClose={handleClose}
          department={selectedDepartment}
        />
      )}
    </div>
  );
};

export default Category;
