import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { createStar, createShootingStar, createConstellation } from '../../utils/constellationUtils'; 
import Button from '../../components/Button/Button'; 
import EditConstellation from './EditConstellation'; 
import '../../components/Constellation/constellation.css'
import axios from 'axios';

function ConstellationPage() {
    const [constellation, setConstellation] = useState({});
    const [constellationsFetched, setConstellationsFetched] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);
    const [editedConstellation, setEditedConstellation] = useState(constellation);

    const navigate = useNavigate();
    const { ID } = useParams();


    const prevIsEditMode = useRef(isEditMode);
    
    useEffect(() => {
        const skyContainer = document.getElementById('skyContainer');
        const constellationContainer = document.getElementById('constellationContainer');
        if (!constellationsFetched) {
            fetchConstellation();
        } else {
            initializeStars(skyContainer);
            initializeConstellation(constellationContainer);
            setTimeout(() => createShootingStar(skyContainer), Math.random() * 20000);
        }

        prevIsEditMode.current = isEditMode;

        
    }, [constellationsFetched, navigate]);

    const fetchConstellation = async () => {
        try {
            const response = await axios.get('https://starmap-43wf.onrender.com/constellation/' + ID);
            setConstellation(response.data);
            setConstellationsFetched(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditClick = () => {
        setIsEditMode(true);

        // Map the constellation properties to the expected form fields
        setEditedConstellation({
            name: constellation.name || '',
            stars: constellation.stars || [],
            description: constellation.description || '',
            lines: constellation.lines || '',
            // pos: constellation.pos || '',
        });
    };

    const handleReturnClick = () => {    
        navigate('/dashboard');
    };

    // Function to handle changes in the edit form inputs
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedConstellation({ ...editedConstellation, [name]: value });
    };

    // Function to handle the edit form submission
    const handleEditSubmit = async () => {
        try {
        const response = await axios.patch('https://starmap-43wf.onrender.com/constellation/' + ID, editedConstellation, {
            timeout: 10000, // Set a longer timeout (in milliseconds)
        });
        if (response.status === 200) {
            setIsEditMode(false);
        }
        } catch (err) {
        console.error(err);
        }
    };

    // Function to close the edit modal
    const closeEditMode = () => {
        setIsEditMode(false);
        setEditedConstellation(constellation); // Reset the edited constellation to the original constellation data
    };

    const handleDeleteClick = async () => {
        if (window.confirm('Are you sure you want to delete this constellation? This action is irreversible.')) {
        try {
            const response = await axios.delete('https://starmap-43wf.onrender.com/constellation/' + ID);
            setConstellation(null);
        } catch (err) {
            console.error(err);
        }
        navigate('/dashboard');
        }
    };

    const initializeStars = (skyContainer) => {
        for (let i = 0; i < 200; i++) {
            createStar(skyContainer);
        }
    };

    const initializeConstellation = (constellationContainer) => {
        createConstellation(
        constellationContainer, // Pass the container element
        constellation,
        navigate,
        '650px',
        '780px',
        `-20px`,
        `120px`,
        false 
        );
    };

    return (
        <div>
            
        {isEditMode ? (
            // Display the EditConstellation component when in edit mode
            <div className="constellation-container">
                <EditConstellation
                    isEditMode={isEditMode}
                    editedConstellation={editedConstellation}
                    handleEditInputChange={handleEditInputChange}
                    handleEditSubmit={handleEditSubmit}
                    closeEditMode={closeEditMode} 
                />
            </div>
        ) : (
            <div className='constellation-container' id='skyContainer'>
                {/* Visualization Section */}
                <div className="constellation-image" id="constellationContainer"></div>
                
                {/* information Section */}
                <div className='constellation-info'>
                    <div>
                        <h2 className="constellation-title">{constellation.name}</h2>
                    </div>

                    <div className='constellation-description'>
                        {constellation.description}
                    </div>
                    
                    <br />
                    <div className='constellation-buttons'>
                        <Button onClick={handleEditClick}>
                            EDIT
                        </Button>

                        <Button onClick={handleDeleteClick}>
                            DELETE
                        </Button>

                        <Button onClick={handleReturnClick}>
                            RETURN
                        </Button>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}

export default ConstellationPage;
