import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Layout from '../../components/Layouts/Layout';

const EditConstellation = ({ isEditMode, editedConstellation, handleEditInputChange, handleEditSubmit, closeEditMode }) => {
  return (
    <Layout>
      {isEditMode ? (
        <div className='form-container'>
          <h2 className="event-details-heading">Edit Constellation</h2>
          <form>
            {/* Display the current user's details */}
            <div className="input-label-pair">
              <label htmlFor="edit-firstName" className="event-details-label">Name:</label>
              <input
                value={editedConstellation.name}
                onChange={handleEditInputChange}
                name="name"
                type="text"
                id="edit-name"
                className="event-details-input"
              />
            </div>

            <div className="input-label-pair">
              <label htmlFor="edit-description" className="event-details-label">Description:</label>
              <input
                value={editedConstellation.description}
                onChange={handleEditInputChange}
                name="description"
                type="text"
                id="edit-description"
                className="event-details-input"
              />
            </div>

            <div className="input-label-pair">
              <label htmlFor="edit-stars" className="event-details-label">Stars:</label>
              <input
                value={editedConstellation.stars}
                onChange={handleEditInputChange}
                name="stars"
                type="text"
                id="edit-stars"
                className="event-details-input"
              />
            </div>

            <div className="input-label-pair">
              <label htmlFor="edit-lines" className="event-details-label">Lines:</label>
              <input
                value={editedConstellation.lines}
                onChange={handleEditInputChange}
                name="lines"
                type="text"
                id="edit-lines"
                className="event-details-input"
              />
            </div>

            {/* <div className="input-label-pair">
              <label htmlFor="edit-lines" className="event-details-label">Pos:</label>
              <input
                value={editedConstellation.pos}
                onChange={handleEditInputChange}
                name="pos"
                type="text"
                id="edit-pos"
                className="event-details-input"
              />
            </div> */}

            


            <Link to='/dashboard'>
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

export default EditConstellation;
