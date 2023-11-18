import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button'
import axios from 'axios';

function NewConstellation({user}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        stars: '',
        lines: '',
        userID: user._id, // set to database user id by default

    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // parsing logic for stars
            const parsedStars = formData.stars
                .split(/\],?\s?\[/) // Split by '], [' or '],['
                .map((pair) =>
                pair
                    .replace(/\[|\]/g, '') // Remove square brackets
                    .split(',')
                    .map((num) => parseFloat(num.trim()))
                );

            // Parsing logic for lines
            const parsedLines = formData.lines
                .split(/\],?\s?\[/) // Split by '], [' or '],['
                .map((pair) =>
                pair
                    .replace(/\[|\]/g, '') // Remove square brackets
                    .split(',')
                    .map((num) => parseFloat(num.trim()))
                );
        
            const dataToSend = {
                ...formData,
                stars: parsedStars,
                lines: parsedLines,
            };
        
            // Send a POST request to your backend API to create a new constellation
            const response = await axios.post('http://localhost:3001/constellation/new', dataToSend);

            if (response.status === 201) {
                console.log('Constellation created successfully');
                // Use navigate to redirect to /dashboard
                navigate('/dashboard');
            } else {
                console.log('Error creating constellation');
            }
        } catch (error) {
        console.error(error);
        }
    };
    

    return (
        <div>
            <h2>Create a New Constellation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Stars (Enter pairs like [0.8, -0.25], [3.3, -0.5]):</label>
                    <textarea
                        name="stars"
                        value={formData.stars}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Lines (Enter indeces of stars to join like [0,1] will join the stars: [0.8, -0.25], [3.3, -0.5]):</label>
                    <textarea
                        name="lines"
                        value={formData.lines}
                        onChange={handleInputChange}
                    />
                </div>

                <Button type="submit">Create Constellation</Button>
            </form>
        </div>
    );
}

export default NewConstellation;
