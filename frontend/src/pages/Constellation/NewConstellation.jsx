import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStar, createShootingStar, createConstellation, handleHover} from '../../utils/constellationUtils';
import Button from '../../components/Button/Button';
import Layout from '../../components/Layouts/Layout';
import '../../components/Constellation/constellation.css'

import axios from 'axios';

function NewConstellation({ user }) {
    const navigate = useNavigate();
    const constellationContainer = document.getElementById('constellationContainer');
    const [isDrawing, setIsDrawing] = useState(false);
    
    // const [selectedStarIndex, setSelectedStarIndex] = useState(0);
    const selectedStarIndexRef = useRef(null);

    // to keep isliningRef constantly up-to-date of the value (event listeners load with values that are set at the time of creation)
    const [isLining, setIsLining] = useState(false);
    const isLiningRef = useRef(isLining);
    useEffect(() => {
        isLiningRef.current = isLining;
    }, [isLining]);


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
        setIsLining(false);
    };

    const toggleLining = () => {
        console.log('Toggling isLining to be:', !isLining);
        setIsLining(!isLining);
        setIsDrawing(false);

        console.log('isLining is now:', isLining);
    };


    const clearDrawing = () => {
        // Clear the stars array and lines array
        setFormData((prevFormData) => ({
            ...prevFormData,
            stars: [],
            lines: []
        }));
    
        // Clear the visually drawn stars and lines in the constellationContainer
        const stars = constellationContainer.querySelectorAll('.constellation-star');
        stars.forEach((star) => star.remove());
    
        const lines = constellationContainer.querySelectorAll('.constellation-line');
        lines.forEach((line) => line.remove());
    
        const constellations = constellationContainer.querySelectorAll('.constellation');
        constellations.forEach((constellation) => constellation.remove());
    
        // Reset selected star index
        selectedStarIndexRef.current = null;
    };



    const handleStarHover = (e, hoverGrowth) => {
        const starElement = e.currentTarget;
        // const starIndex = parseInt(starElement.dataset.starIndex, 10); 
        handleHover(starElement, hoverGrowth, 1, 0.8);
    };


    
    const constellationClick = (e) => {
        console.log(`selected star ${selectedStarIndexRef.current}`);
        console.log(`isLining currently: ${isLiningRef.current}`);

        // Check if the click originated from one of the toggle buttons
        const isToggleButton = Array.from(e.target.classList).some(className =>
            ['drawing-text', 'drawing-clear', 'drawing-line', 'drawing-select'].includes(className)
        );

        if (!isToggleButton) {
            const boundingRect = constellationContainer.getBoundingClientRect();
            const clickX = e.clientX - boundingRect.left;
            const clickY = e.clientY - boundingRect.top;

            // if drawing mode is on, and the click is within defined regions
            if (isDrawing) {
                if (
                    clickX >= 0 && clickX <= boundingRect.width - 20 &&
                    clickY >= 0 && clickY <= boundingRect.height - 20
                ) {

                    // assign random size, and align position to be centered on the click
                    const randomSize = Math.random() * 2 + 2;
                    const x = (clickX / boundingRect.width) * 150 - randomSize / 2.5;
                    const y = (clickY / boundingRect.height) * 180 - randomSize / 2.5;

                    setFormData((prevFormData) => {
                        const newStar = [x.toFixed(1), y.toFixed(1), randomSize.toFixed(1)];
                        return {
                            ...prevFormData,
                            stars: [...prevFormData.stars, newStar],
                        };
                    });

                    // Parse stars before calling createConstellation
                    const parsedStars = formData.stars.map(star =>
                        star.map(coord => parseFloat(coord))
                    );

                    // Create the constellation each time a new star is added (remove old ones too)
                    const existingConstellations = constellationContainer.querySelectorAll('.constellation');
                    existingConstellations.forEach((constellation) => constellation.remove());

                    const newConstellation = createConstellation(
                        constellationContainer,
                        {
                            ...formData,
                            stars: [...parsedStars, [x, y, randomSize]],
                        },
                        navigate,
                        `${constellationContainer.offsetWidth}px`,
                        `${constellationContainer.offsetHeight}px`,
                        0,
                        0,
                        false
                    );

                    // Update the event listeners for starElements in the new constellation
                    const starElements = newConstellation.querySelectorAll('.constellation-star');
                    starElements.forEach((starElement, index) => {
                        starElement.dataset.starIndex = index;
                        starElement.addEventListener('click', handleStarClick);
                        starElement.addEventListener('mouseenter', (e) => handleStarHover(e, 25));
                        starElement.addEventListener('mouseleave', (e) => handleStarHover(e, -20));
                    });
                }
            }
        }
    };


    const handleStarClick = (e) => {
        const clickedStarIndex = parseInt(e.currentTarget.dataset.starIndex, 10);
        // console.log(`Star clicked: ${clickedStarIndex}`);
        // console.log(`Line to be drawn from ${selectedStarIndexRef.current} and ${clickedStarIndex}`);
    
        // console.log(`if parameters: ${isLiningRef.current}, ${selectedStarIndexRef.current !== null} and ${selectedStarIndexRef.current !== clickedStarIndex}`);
    
        if (isLiningRef.current && selectedStarIndexRef.current !== null && selectedStarIndexRef.current !== clickedStarIndex) {
            const currentSelectedStarIndex = selectedStarIndexRef.current;
    
            setFormData((prevFormData) => {
                const newLines = [...prevFormData.lines, [currentSelectedStarIndex, clickedStarIndex]];
    
                // console.log('Lines array before creating constellation:', newLines);
    
                // Parsing logic for stars directly from formData.stars
                const parsedStars = prevFormData.stars.reduce((acc, star) => {
                    acc.push(star.map(parseFloat));
                    return acc;
                }, []);
    
                // Remove existing constellations and redraw with updated lines
                const existingConstellations = constellationContainer.querySelectorAll('.constellation');
                existingConstellations.forEach((constellation) => constellation.remove());
    
                // console.log('starclick createConstellation');
                const newConstellation = createConstellation(
                    constellationContainer,
                    {
                        ...prevFormData,
                        lines: newLines,
                        stars: parsedStars,
                    },
                    navigate,
                    `${constellationContainer.offsetWidth}px`,
                    `${constellationContainer.offsetHeight}px`,
                    0,
                    0,
                    false
                );
    
                const starElements = newConstellation.querySelectorAll('.constellation-star');
                starElements.forEach((starElement, index) => {
                    starElement.dataset.starIndex = index;
                    starElement.addEventListener('click', handleStarClick);
                    starElement.addEventListener('mouseenter', (e) => handleStarHover(e, 25));
                    starElement.addEventListener('mouseleave', (e) => handleStarHover(e, -20));
                });
    
                // console.log(`Line drawn between star ${currentSelectedStarIndex} and star ${clickedStarIndex}`);
    
                // Reset selected star index after drawing a line
                selectedStarIndexRef.current = null;
                // console.log(`Selected star cleared`);
    
                return {
                    ...prevFormData,
                    lines: newLines,
                    selectedStarIndex: currentSelectedStarIndex,
                };
            });
        } else {
            // console.log(`setting selectedstar index to: ${clickedStarIndex}`);
            selectedStarIndexRef.current = clickedStarIndex;
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
                    onClick={constellationClick}
                >   
                    <span 
                        id='drawingText' 
                        className={`draw-tools drawing-text ${isDrawing ? 'drawing' : ''}`}
                        onClick={() => toggleDrawing()}
                        style={{ zIndex: 1 }}
                    > ✎ </span>
                    

                    <span 
                        id='drawingText' 
                        className= {`draw-tools drawing-line ${isLining ? 'lining' : ''}`}
                        onClick={() => toggleLining()}
                        style={{ zIndex: 1 }}
                    > ╱ </span>
                    <span 
                        id='drawingText' 
                        className= 'draw-tools drawing-clear ' 
                        onClick={() => clearDrawing()}
                        style={{ zIndex: 1 }}
                    > ✖ </span>


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

                    {/* <div>
                        <label>Lines:</label>
                        <input
                            name='lines'
                            value={formData.lines}
                            onChange={handleInputChange}
                            placeholder='1,2,3,3,1,1...'
                        />
                    </div> */}
                    <div>
                        <label>
                            Position
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
