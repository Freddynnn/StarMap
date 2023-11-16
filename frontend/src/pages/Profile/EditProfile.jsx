import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Layout from '../../components/Layouts/Layout';

const EditProfile = ({ isEditMode, editedUser, handleEditInputChange, handleEditSubmit, closeEditMode }) => {
  return (
    <Layout>
      {isEditMode ? (
        <div className='form-container'>
          <h2 className="event-details-heading">Edit Profile</h2>
          <form>
            {/* Display the current user's details */}
            <div className="input-label-pair">
              <label htmlFor="edit-firstName" className="event-details-label">First Name:</label>
              <input
                value={editedUser.firstName}
                onChange={handleEditInputChange}
                name="firstName"
                type="text"
                id="edit-firstName"
                className="event-details-input"
              />
            </div>

            <div className="input-label-pair">
              <label htmlFor="edit-lastName" className="event-details-label">Last Name:</label>
              <input
                value={editedUser.lastName}
                onChange={handleEditInputChange}
                name="lastName"
                type="text"
                id="edit-lastName"
                className="event-details-input"
              />
            </div>

            <div className="input-label-pair">
              <label htmlFor="edit-username" className="event-details-label">Username:</label>
              <input
                value={editedUser.username}
                onChange={handleEditInputChange}
                name="username"
                type="text"
                id="edit-username"
                className="event-details-input"
              />
            </div>

            <div className="input-label-pair">
              <label htmlFor="edit-email" className="event-details-label">Email:</label>
              <input
                value={editedUser.email}
                onChange={handleEditInputChange}
                name="email"
                type="email"
                id="edit-email"
                className="event-details-input"
              />
            </div>

            <div className="input-label-pair">
              <label htmlFor="edit-phone" className="event-details-label">Phone:</label>
              <input
                value={editedUser.phone}
                onChange={handleEditInputChange}
                name="phone"
                type="tel"
                id="edit-phone"
                className="event-details-input"
              />
            </div>


            <Link to='/profile'>
              <Button className="event-details-button" onClick={handleEditSubmit}>
                SAVE
              </Button>
            </Link>

            <Button className="event-details-button" onClick={closeEditMode}>
              CANCEL
            </Button>
          </form>
        </div>
      ) : null}
    </Layout>
  );
};

export default EditProfile;
