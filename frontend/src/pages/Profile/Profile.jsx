import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import EditProfile from './EditProfile.jsx'; 
import '../../components/Profile/profile.css';

function Profile({ user, logOut }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  

  const handleEditClick = () => {
    setIsEditMode(true);

    // Map the user properties to the expected form fields
    setEditedUser({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      username: user.username || '',
      email: user.email || '',
      phone: user.phone || '',
    });
  };

  // Function to handle changes in the edit form inputs
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      try {
        // Send a DELETE request to your backend to delete the user's account
        const response = await axios.delete(`https://starmap-43wf.onrender.com/user/${user._id}`);
        
        if (response.status === 200) {
          console.log('Account deleted successfully');
  
        } else {
          console.log('Account deletion failed');
          // Handle deletion failure (display an error message, etc.)
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        // Handle other errors if the request fails
      }
    }
  };

  // Function to handle the edit form submission
  const handleEditSubmit = async () => {
    try {
      console.log('User ID before patch:', user._id);
      
      // Send a PATCH request to update the user's profile
      const response = await axios.patch(`https://starmap-43wf.onrender.com/user/${user._id}`, editedUser);

      if (response.status === 200) {
        setIsEditMode(false);
        // Optionally, you can fetch the updated user data here
        // This depends on your backend response structure
        // const updatedUserData = await axios.get(`https://nexuspod-backend.onrender.com/users/${user._id}`);
        // setUser(updatedUserData.data);
      } else {
        console.log('Profile update failed');
        // Handle update failure (display an error message, etc.)
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle other errors if the request fails
    }
  };

  // Function to close the edit mode
  const closeEditMode = () => {
    setIsEditMode(false);
    setEditedUser(user); // Reset the edited user data to the original user data
  };

  return (
    <main>
      {isEditMode ? (
        <EditProfile
          isEditMode={isEditMode}
          editedUser={editedUser}
          handleEditInputChange={handleEditInputChange}
          handleEditSubmit={handleEditSubmit}
          closeEditMode={closeEditMode}
        />
      ) : (
        <div className='profile-container'>
          <div className="info">
            <h1>{user.username}</h1>

            <h2>EVEN LONG AFTER THEY FADE HERE,</h2>
            <h2> THESE STARS WILL SHINE FOREVER IN MY HEART</h2>
            {/* <h2>Email Address: {user.email}</h2>
            <h2>First Name: {user.firstName}</h2>
            <h2>Last Name: {user.lastName}</h2>
            <h2>Phone: {user.phone}</h2> */}
          </div>
          <section className="edit">
            <Button onClick={handleEditClick}>EDIT</Button>
            {/* <Link to="/change">
              <Button>CHANGE PASSWORD</Button>
            </Link> */}
            <Button onClick={logOut}>LOGOUT</Button>
            {/* <Button onClick={handleDeleteAccount}>DELETE ACCOUNT</Button> */}
          </section>
        </div>
      )}
    </main>
  );
  
}

export default Profile;
