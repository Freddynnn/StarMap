import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStar, createShootingStar, createConstellation } from '../../utils/constellationUtils';
import Button from '../../components/Button/Button';
import Layout from '../../components/Layouts/Layout';
import '../../components/Constellation/constellation.css'

import axios from 'axios';

function NewConstellation({ user }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        stars: [], // Array to store stars as [x, y] coordinates
        lines: [], // Array to store lines as [startIndex, endIndex]
        userID: user._id, // set to the database user id by default
    });


    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const skyContainer = document.getElementById('skyContainer');
        
        initializeStars(skyContainer);
        setTimeout(() => createShootingStar(skyContainer), Math.random() * 20000);
    
        
        // You can also create lines if needed
        // createLines();

        // If you want to update lines based on user input, you can use the following
        // updateLines(parsedLines);
    }, []); 


    const toggleDrawing = () => {
        setIsDrawing(!isDrawing);
    };
    
    const drawStar = (e) => {
        if (isDrawing) {
            const constellationContainer = document.getElementById('constellationContainer');
            const boundingRect = constellationContainer.getBoundingClientRect();
            const containerX = e.clientX - boundingRect.left;
            const containerY = e.clientY - boundingRect.top;
    
            if (
                containerX >= 0 &&
                containerX <= boundingRect.width - 20 &&
                containerY >= 0 &&
                containerY <= boundingRect.height - 20 &&
                (containerX >= 160 || containerY >= 160)
            ) {
                const x = (containerX / boundingRect.width) * 150;
                const y = (containerY / boundingRect.height) * 180;
                const randomSize = Math.random() * 2 + 4;
    
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    stars: [
                        ...prevFormData.stars,
                        [x.toFixed(1), y.toFixed(1), randomSize.toFixed(1)], // Limit decimals to 1
                    ],
                }));
    
                // Create the constellation each time a new star is added
                createConstellation(
                    constellationContainer,
                    { ...formData, stars: [...formData.stars, [x, y, randomSize]] },
                    navigate,
                    `${constellationContainer.offsetWidth}px`,
                    `${constellationContainer.offsetHeight}px`,
                    0,
                    0,
                    false
                );
            }
        }
    };
    
    
      

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Convert stars array to a string with the desired format
            const starsString = formData.stars
                .map((star) => `[${star.join(', ')}]`)
                .join(', ');
    
            // parsing logic for stars
            const parsedStars = starsString
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
            const response = await axios.post(
                'http://localhost:3001/constellation/new',
                dataToSend
            );
    
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
    

    const initializeStars = (skyContainer) => {
        for (let i = 0; i < 100; i++) {
        createStar(skyContainer);
        }
    };




    

    return (
        <Layout>
            <main className='constellation-container' id='skyContainer'>
                
                {/* Visualization Section */}
                <div 
                    className={`constellation-draw ${isDrawing ? 'drawing' : ''}`} 
                    id='constellationContainer'
                    onClick={drawStar}
                >   
                    <span 
                        id='drawingText' 
                        className={`drawing-text ${isDrawing ? 'drawing' : ''}`} 
                        onClick={() => toggleDrawing()}
                        style={{ zIndex: 1 }}
                    > ✎ </span>
                </div>
                
                <div className='constellation-info'>
                <h2 className='constellation-edit-title'>
                    <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder='New Constellation'
                    />
                </h2>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label>Description:</label>
                    <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder='Describe your constellation...'
                        rows='5' // Adjust the number of rows as needed
                    />
                    </div>
                    
                    {/* <div>
                        <label>Stars:</label>
                        <input
                            name='stars'
                            value={formData.stars}
                            onChange={handleInputChange}
                            placeholder='[0.8, -0.25], [3.3, -0.5] ...'
                        />
                    </div> */}
                    <div>
                        <label>
                            Lines:
                        </label>
                        <input
                            name='lines'
                            value={formData.lines}
                            onChange={handleInputChange}
                            placeholder='star indices: [0,1] joins stars at index 0 and 1'
                        />
                    </div> 
                   

                    <br/>
                    <br/>

                    <Button type='submit'>Create Constellation</Button>
                </form>
                </div>
            </main>
            </Layout>

    );
}

export default NewConstellation;
