import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios if you are using it for API requests

const Profile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({}); // Initialize as an object

  useEffect(() => {
    // Replace the URL with your actual endpoint to fetch employee data
    axios.get(`${process.env.REACT_APP_API_URL}/employee/${id}`)
      .then(response => {
        setEmployee(response.data); // Assuming response.data contains the employee data
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
        // Handle error appropriately
      });
  }, [id]); // Dependency array with 'id' to refetch when the id changes

  return (
    <div className="d-flex mt-3">
      <div className="flex-shrink-0">
        <img 
          src={employee.imageUrl} 
          alt={employee.name} 
          style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
        />
      </div>
      <div className="flex-grow-1 ms-3">
        <h3>{employee.name}</h3>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Location:</strong> {employee.location}</p>
        <p><strong>Role:</strong> {employee.role}</p>
      </div>
    </div>
  );
}

export default Profile;

