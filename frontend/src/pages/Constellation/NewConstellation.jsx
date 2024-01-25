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
    const [isLining, setIsLining] = useState(false);
    
    
    // const [selectedStarIndex, setSelectedStarIndex] = useState(0);
    const selectedStarIndexRef = useRef(null);


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

    // useEffect(() => {
    //     console.log(`selected star index has been set to: ${selectedStarIndex}`);
    // }, [selectedStarIndex]);

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
    console.log('Toggling isLining:', !isLining);
    setIsLining(!isLining);
    setIsDrawing(false);
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
        // setSelectedStarIndex(null);
        selectedStarIndexRef.current = null;
    };

    const handleStarHover = (e, hoverGrowth) => {
        const starElement = e.currentTarget;
        
        // You can access information about the star using starElement.dataset or other properties
        const starIndex = parseInt(starElement.dataset.starIndex, 10); // Assuming you have a data attribute for the star index
    
        // Example: Log the star index to the console
        // console.log('Hovered over star index:', starIndex);
        handleHover(starElement, hoverGrowth, 1, 0.8);
        
        // You can add more logic based on the hovered star
    };


    
    const constellationClick = (e) => {

        console.log(`selected star ${selectedStarIndexRef.current}`);

        // Check if the click originated from one of the toggle buttons
        const isToggleButton = Array.from(e.target.classList).some(className =>
            ['drawing-text', 'drawing-clear', 'drawing-line', 'drawing-select'].includes(className)
        );
        
        if(!isToggleButton){
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
                    
                        // Only draw lines if isLining is true and there is a previous star
                        // const newLines = isLining && prevFormData.stars.length > 0
                        //     ? [...prevFormData.lines, [prevFormData.stars.length - 1, prevFormData.stars.length]]
                        //     : prevFormData.lines;
                    
                        return {
                            ...prevFormData,
                            stars: [...prevFormData.stars, newStar],
                            //  lines: newLines,
                        };
                    });
                    
                    
                    // Create the constellation each time a new star is added (remove old ones too)
                    const existingConstellations = constellationContainer.querySelectorAll('.constellation');
                    existingConstellations.forEach((constellation) => constellation.remove());
    
                    createConstellation(
                        constellationContainer,
                        {
                            ...formData,
                            stars: [...formData.stars, [x, y, randomSize]],
                            //pos: [clickX.toFixed(1), clickY.toFixed(1)],
                            // lines: isLining && formData.stars.length > 0
                            //     ? [...formData.lines, [formData.stars.length - 1, formData.stars.length]]
                            //     : formData.lines,
                        },
                        navigate,
                        `${constellationContainer.offsetWidth}px`,
                        `${constellationContainer.offsetHeight}px`,
                        0,
                        0,
                        false
                    );

                    const newConstellation = constellationContainer.lastChild; // Assuming the new constellation is the last child
                    if (newConstellation) {
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
            // else if (isLining) {
            //     // Logic for drawing lines when in "isLining" mode
            //     const starElements = constellationContainer.querySelectorAll('.constellation-star');
            //     const clickedStarIndex = parseInt(e.target.dataset.starIndex, 10);


            //     console.log(`Line to be drawn from ${selectedStarIndex} and  ${clickedStarIndex}`);
            //     if (!isNaN(clickedStarIndex) && selectedStarIndex !== null && !isNaN(selectedStarIndex) && selectedStarIndex !== clickedStarIndex) {
            //         const newLines = [...formData.lines, [selectedStarIndex, clickedStarIndex]];
    
            //         setFormData((prevFormData) => ({
            //             ...prevFormData,
            //             lines: newLines,
            //         }));
    
            //         // Remove existing constellations and redraw with updated lines
            //         const existingConstellations = constellationContainer.querySelectorAll('.constellation');
            //         existingConstellations.forEach((constellation) => constellation.remove());
    
            //         createConstellation(
            //             constellationContainer,
            //             {
            //                 ...formData,
            //                 lines: newLines,
            //             },
            //             navigate,
            //             `${constellationContainer.offsetWidth}px`,
            //             `${constellationContainer.offsetHeight}px`,
            //             0,
            //             0,
            //             false
            //         );
    
            //         console.log(`Line drawn between star ${selectedStarIndex} and star ${clickedStarIndex}`);
            //         setSelectedStarIndex(null); // Reset selected star index after drawing a line
            //         console.log(`selected star cleared:  ${selectedStarIndex}`);
            //     } else {
            //         setSelectedStarIndex(clickedStarIndex);
            //     }
            // }
        }
    };

    const handleStarClick = (e) => {
    const clickedStarIndex = parseInt(e.currentTarget.dataset.starIndex, 10);
    console.log(`Star clicked: ${clickedStarIndex}`);
    console.log(`Line to be drawn from ${selectedStarIndexRef.current} and  ${clickedStarIndex}`);

    console.log(`if parameters: ${isLining},  ${selectedStarIndexRef.current !== null} and  ${selectedStarIndexRef.current !== clickedStarIndex}`);

    if (isLining && selectedStarIndexRef.current !== null && selectedStarIndexRef.current !== clickedStarIndex) {
        console.log('drawing line');
        setFormData((prevFormData) => {
            const newLines = [...prevFormData.lines, [selectedStarIndexRef.current, clickedStarIndex]];
            
            // Remove existing constellations and redraw with updated lines
            const existingConstellations = constellationContainer.querySelectorAll('.constellation');
            existingConstellations.forEach((constellation) => constellation.remove());
            
            createConstellation(
                constellationContainer,
                {
                    ...prevFormData,
                    lines: newLines,
                },
                navigate,
                `${constellationContainer.offsetWidth}px`,
                `${constellationContainer.offsetHeight}px`,
                0,
                0,
                false
            );
            
            console.log(`Line drawn between star ${selectedStarIndexRef.current} and star ${clickedStarIndex}`);
            
            // Reset selected star index after drawing a line
            selectedStarIndexRef.current = null;
            console.log(`Selected star cleared`);
            
            return {
                ...prevFormData,
                lines: newLines,
            };
        });
    } else {
        console.log(`setting selectedstar index to: ${clickedStarIndex}`);
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
