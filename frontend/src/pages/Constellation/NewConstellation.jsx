import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStar, createShootingStar, createConstellation } from '../../utils/constellationUtils';
import Button from '../../components/Button/Button';
import Layout from '../../components/Layouts/Layout';
import '../../components/Constellation/constellation.css'

import axios from 'axios';

function NewConstellation({ user }) {
    const navigate = useNavigate();
    const constellationContainer = document.getElementById('constellationContainer');
    const [isDrawing, setIsDrawing] = useState(false);
    const [isLining, setIsLining] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        stars: [], 
        lines: [], 
        userID: user._id, // set to the database user id by default
        pos: [],
    });


    useEffect(() => {
        const skyContainer = document.getElementById('skyContainer');
        
        initializeStars(skyContainer);
        setTimeout(() => createShootingStar(skyContainer), Math.random() * 20000);
    }, []); 



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
    
            const parsedPos = formData.pos
                .split(',')
                .map((num) => parseFloat(num.trim()));
    
            const newFormData = {
                ...formData,
                stars: parsedStars,
                pos: parsedPos,
                // Use formData.lines directly without parsing
            };
    
            // Send a POST request to your backend API to create a new constellation
            const response = await axios.post(
                'https://starmap-43wf.onrender.com/constellation/new',
                newFormData
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
    


    const toggleDrawing = () => {
        setIsDrawing(!isDrawing);
        // setIsLining(false);
    };

    const toggleLining = () => {
        setIsLining(!isLining);
        // setIsDrawing(false);
    };
    

    const clearDrawing = () => {
        // Clear the stars array
        setFormData((prevFormData) => ({
            ...prevFormData,
            stars: [],
            lines: []
        }));

        // Clear the visually drawn stars in the constellationContainer
        const stars = constellationContainer.querySelectorAll('.constellation-star');
        stars.forEach((star) => star.remove());
    
        // Optionally, you can also clear other related state variables if needed
        // For example, if you want to clear lines array when clearing the drawing:
        // setFormData((prevFormData) => ({
        //     ...prevFormData,
        //     stars: [],
        //     lines: [],
        // }));
    };
    
    const drawStar = (e) => {

        // Check if the click originated from one of the toggle buttons
        const isToggleButton = Array.from(e.target.classList).some(className =>
            ['drawing-text', 'drawing-clear', 'drawing-line'].includes(className)
        );
    
        if (isDrawing && !isToggleButton) {
            const boundingRect = constellationContainer.getBoundingClientRect();
            const containerX = e.clientX - boundingRect.left;
            const containerY = e.clientY - boundingRect.top;
        // if (isDrawing) {
        //     const boundingRect = constellationContainer.getBoundingClientRect();
        //     const containerX = e.clientX - boundingRect.left;
        //     const containerY = e.clientY - boundingRect.top;
    
            if (
                containerX >= 0 &&
                containerX <= boundingRect.width - 20 &&
                containerY >= 0 &&
                containerY <= boundingRect.height - 20
            ) {
                const randomSize = Math.random() * 2 + 2.3;
                const x = (containerX / boundingRect.width) * 150 - randomSize / 2.5;
                const y = (containerY / boundingRect.height) * 180 - randomSize / 2.5;
    
                setFormData((prevFormData) => {
                    const newStar = [x.toFixed(1), y.toFixed(1), randomSize.toFixed(1)];
                
                    // Only draw lines if isLining is true and there is a previous star
                    const newLines = isLining && prevFormData.stars.length > 0
                        ? [...prevFormData.lines, [prevFormData.stars.length - 1, prevFormData.stars.length]]
                        : prevFormData.lines;
                
                    return {
                        ...prevFormData,
                        stars: [...prevFormData.stars, newStar],
                        lines: newLines,
                    };
                });
    
                // Create the constellation each time a new star is added
                createConstellation(
                    constellationContainer,
                    {
                        ...formData,
                        stars: [...formData.stars, [x, y, randomSize]],
                        pos: [containerX.toFixed(1), containerY.toFixed(1)],
                    },
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
                        className={`draw-tools drawing-text ${isDrawing ? 'drawing' : ''}`}
                        onClick={() => toggleDrawing()}
                        style={{ zIndex: 1 }}
                    > ✎ </span>
                    <span 
                        id='drawingText' 
                        className= 'draw-tools drawing-clear ' 
                        onClick={() => clearDrawing()}
                        style={{ zIndex: 1 }}
                    > ✖ </span>

<                   span 
                        id='drawingText' 
                        className= {`draw-tools drawing-line ${isLining ? 'lining' : ''}`}
                        onClick={() => toggleLining()}
                        style={{ zIndex: 1 }}
                    > ╱ </span>


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
                        <label>Lines:</label>
                        <input
                            name='lines'
                            value={formData.lines}
                            onChange={handleInputChange}
                            placeholder='1,2,3,3,1,1...'
                        />
                    </div>
                    <div>
                        <label>
                            Constellation Position
                        </label> 
                        <input
                            name='pos'
                            value={formData.pos}
                            onChange={handleInputChange}
                            placeholder='top(10-160), left(10-85) i.e. 110, 40'
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
