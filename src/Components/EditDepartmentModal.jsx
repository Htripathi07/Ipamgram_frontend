import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export const EditDepartmentModal = ({ show, handleClose, department }) => {

    const handleSubmit = () => {
        // Handle the submit action
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Form fields for editing the department */}
                <input 
                    type="text" 
                    defaultValue={department.name} 
                    // ...other input attributes
                />
                {/* Add other form fields as needed */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
