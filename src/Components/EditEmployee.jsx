import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const EditEmployee = ({ show, handleClose, employeeId }) => {
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        category_id: "",
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (employeeId) {
            axios.get(`http://localhost:3000/auth/employee/${employeeId}`)
                .then(response => {
                    const employeeData = response.data.Result[0];
                    setEmployee({
                        name: employeeData.name,
                        email: employeeData.email,
                        address: employeeData.address,
                        salary: employeeData.salary,
                        category_id: employeeData.category_id,
                    });
                })
                .catch(err => console.log(err));

            axios.get('http://localhost:3000/auth/category')
                .then(response => {
                    if(response.data.Status) {
                        setCategories(response.data.Result);
                    }
                })
                .catch(err => console.log(err));
        }
    }, [employeeId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/auth/edit_employee/${employeeId}`, employee)
            .then(response => {
                if(response.data.Status) {
                    handleClose(); // Close the modal on successful update
                } else {
                    alert(response.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    {/* Form fields */}
                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={employee.name} onChange={e => setEmployee({...employee, name: e.target.value})} />
                    </div>
                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={employee.email} onChange={e => setEmployee({...employee, email: e.target.value})} />
                    </div>
                    {/* Address */}
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" value={employee.address} onChange={e => setEmployee({...employee, address: e.target.value})} />
                    </div>
                    {/* Salary */}
                    <div className="mb-3">
                        <label className="form-label">Salary</label>
                        <input type="text" className="form-control" value={employee.salary} onChange={e => setEmployee({...employee, salary: e.target.value})} />
                    </div>
                    {/* Category */}
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <select className="form-select" value={employee.category_id} onChange={e => setEmployee({...employee, category_id: e.target.value})}>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditEmployee;
