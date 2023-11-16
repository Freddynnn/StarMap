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


    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
    
        const duration = Math.random() * 1.5 + 0.5; // Random duration between 0.5 and 2 seconds
        shootingStar.style.animationDuration = `${duration}s`;
    
        const randomSize = Math.random() * 2 + 2; // Random size between 2 and 4 pixels
        shootingStar.style.width = `${randomSize}px`;
        shootingStar.style.height = `${randomSize}px`;
    
        shootingStar.style.top = `${Math.random() * 60 + 15}%`;
        shootingStar.style.left = `${Math.random() * 60 + 10}%`;
    
        // Set a random rotation
        const rotation = Math.random() * 360;
        shootingStar.style.transform = `rotate(${rotation}deg)`;
    
        // Set a random translation
        const distance = Math.random() * 50 + 200; // Adjust the range as needed
        const angle = Math.random() * 360;
        const translateX = Math.cos(angle) * distance;
        const translateY = Math.sin(angle) * distance;
        shootingStar.style.transform += ` translate(${translateX}px, ${translateY}px)`;
    
        constellationContainer.appendChild(shootingStar);
    
        shootingStar.addEventListener('animationiteration', () => {
            // Remove the shooting star after the animation completes
            shootingStar.remove();
    
            // Create a new shooting star
            setTimeout(createShootingStar, Math.random() * 20000);
        });
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
            const size = Math.random() * 4 + 4;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${starPosition[0] * 10 + 30}%`;
            star.style.top = `${starPosition[1] * 10 + 30}%`;

            constellation.appendChild(star);
        });

        // full screen width:1707px, height 906px

        // set the default sizes and randomised positions 
        constellation.style.width = '150px';
        constellation.style.height = '180px';
        constellation.style.top = `${(Math.random() * ((906)/2)) + 906/4 - 200}px`;
        constellation.style.left = `${(Math.random() * ((1707)/2)) + 1707/4 - 100}px`;

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
            constellation.style.width = `${newWidth}px`;
            constellation.style.height = `${newHeight}px`;
            constellation.style.top = `${currentTop - sizeChangeY}px`;
            constellation.style.left = `${currentLeft - sizeChangeX}px`;

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
            constellation.style.width = `${newWidth}px`;
            constellation.style.height = `${newHeight}px`;
            constellation.style.top = `${currentTop - sizeChangeY}px`;
            constellation.style.left = `${currentLeft - sizeChangeX}px`;

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
        { name: 'AMOR AETERNUS',
        stars: [
            [0.8, -0.25], [3.3, -0.5],[-0.4, -0.5], [4.5, -0.1], [2, 0.5],
            [-0.7, 0.7], [4, 1.7], [0.5, 2.3], [3.35, 2.65], [1.8, 3.3]
        ]   
        },
        { name: "JOS PICKAXE",
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

    // function initializeShootingStars() {
    //     for (let i = 0; i < 2; i++) { // Adjust the number of shooting stars as needed
    //     createShootingStar();
    //     }
    // }

    initializeStars();
    setTimeout(createShootingStar, Math.random() * 20000);
    initializeConstellations();
}, []); // Run the effect once on component mount

return <div id="constellationContainer" className="constellation-container"></div>;
};

export default NightSky;
