import React, { useEffect } from 'react';
import './NightSky.css';

const NightSky = () => {
useEffect(() => {
    const constellationContainer = document.getElementById('constellationContainer');


    // fill the sky with stars
    function createStar() {
    const star = document.createElement('div');
    star.className = 'star';

    const randomDelay = Math.random() + 's';
    star.style.animationDelay = randomDelay;

    // Randomize the size of the stars
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    constellationContainer.appendChild(star);
    }


    // create constellations from our coded list of star positions
    function createConstellation(constellationData) {

        // Check if the constellation with the same name already exists (stop duplication)
        if (document.querySelector(`.constellation[data-name="${constellationData.name}"]`)) {
            console.log(`Constellation ${constellationData.name} already exists.`);
            return;
        }
        const constellation = document.createElement('div');
        constellation.className = 'constellation';
        constellation.setAttribute('data-name', constellationData.name);

        const nameDisplay = document.createElement('div');
            nameDisplay.className = 'constellation-name';
        nameDisplay.textContent = constellationData.name;
        constellation.appendChild(nameDisplay);


        // create the stars in the constellation 
        constellationData.stars.forEach((starPosition) => {
            const star = document.createElement('div');
            star.className = 'constellation-star';

            const randomDelay = Math.random() + 's';
            star.style.animationDelay = randomDelay;

            // Set the size and position of the constellation stars
            const size = Math.random() * 4 + 5.5;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${starPosition[0] * 10 + 30}%`;
            star.style.top = `${starPosition[1] * 10 + 30}%`;

            constellation.appendChild(star);
        });

        // set the default sizes and randomised positions 
        constellation.style.top = `${(Math.random() * 50) + 10}%`;
        constellation.style.left = `${(Math.random() * 50) + 10}%`;
        constellation.style.width = '12%';
        constellation.style.height = '25%';

        // growth of constellation on hover (in percentage)
        const hoverGrowth = 5;


        // making constellation grow in size on mouse hover
        constellation.addEventListener('mouseenter', () => {
            const currentWidth = parseFloat(constellation.style.width);
            const currentHeight = parseFloat(constellation.style.height);
            const currentTop = parseFloat(constellation.style.top);
            const currentLeft = parseFloat(constellation.style.left);

            // Increase size by a percentage
            const newWidth = currentWidth + (currentWidth * (hoverGrowth / 100));
            const newHeight = currentHeight + (currentHeight * (hoverGrowth / 100));
            const sizeChangeX = (newWidth - currentWidth) / 2;
            const sizeChangeY = (newHeight - currentHeight) / 2;

            // Adjust the position to keep the center unchanged
            constellation.style.width = `${newWidth}%`;
            constellation.style.height = `${newHeight}%`;
            constellation.style.top = `${currentTop - sizeChangeY}%`;
            constellation.style.left = `${currentLeft - sizeChangeX}%`;

            // Make the name visible on hover
            nameDisplay.style.opacity = 1; 
        });


        // make constellation return to original size
        constellation.addEventListener('mouseleave', () => {
            const currentWidth = parseFloat(constellation.style.width);
            const currentHeight = parseFloat(constellation.style.height);
            const currentTop = parseFloat(constellation.style.top);
            const currentLeft = parseFloat(constellation.style.left);

            // Decrease size by a percentage
            const newWidth = currentWidth - (currentWidth * (hoverGrowth / 100));
            const newHeight = currentHeight - (currentHeight * (hoverGrowth / 100));
            const sizeChangeX = (newWidth - currentWidth) / 2;
            const sizeChangeY = (newHeight - currentHeight) / 2;

            // Adjust the position to keep the center unchanged
            constellation.style.width = `${newWidth}%`;
            constellation.style.height = `${newHeight}%`;
            constellation.style.top = `${currentTop - sizeChangeY}%`;
            constellation.style.left = `${currentLeft - sizeChangeX}%`;

            // Hide the name on mouse leave
            nameDisplay.style.opacity = 0; 
        });

        constellationContainer.appendChild(constellation);
    };

    function initializeStars() {
    for (let i = 0; i < 100; i++) {
        createStar();
    }
    }

    function initializeConstellations() {
    const constellations = [
        { name: 'Heart',
        stars: [
            [1.25, -0.1], [2.75, -0.1],
            [0.3, 0.25], [3.7, 0.25],
            [2, 0.5],
            [0, 1], [4, 1],
            [0.5, 1.7], [3.5, 1.7],
            [1.25, 2.4], [2.75, 2.4],
            [1.92, 3.1]
        ]
        },
        { name: "Jo's Pickaxe",
        stars: [
            // top of pickaxe (left to right)
            [-0.3, -0.9], [1.7, -1.3], [4, -1], [5.6, 1.1], [5.2, 2.6],

            // diagonal handle (top to bottom)
            [2.7, 0.8], [1.0, 1.8], [-0.1, 3.9], [-2, 5.2]
        ]
        }
    ];

    constellations.forEach((constellationData) => {
        createConstellation(constellationData);
    });
    }

    initializeStars();
    initializeConstellations();
}, []); // Run the effect once on component mount

return <div id="constellationContainer" className="constellation-container"></div>;
};

export default NightSky;
