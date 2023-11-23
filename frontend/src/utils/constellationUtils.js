// constellationUtils.js

// function for creating star and adding it to a container
export function createStar(container, isNightSky = false) {
    const star = document.createElement('div');
    star.className = 'star';

    const randomDelay = Math.random() + 's';
    star.style.animationDelay = randomDelay;

    // Randomize the size of the stars
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.top = isNightSky ? `${Math.random() * 200}%` : `${Math.random() * 100}%`;     
    star.style.left = `${Math.random() * 100}%`;

    container.appendChild(star);
}


export function createMoon(container) {
    const moon = document.createElement('div');
    moon.className = 'moon';

    // const randomDelay = Math.random() + 's';
    // moon.style.animationDelay = randomDelay;

    // Randomize the size of the stars
    
    moon.style.width = `50px`;
    moon.style.height = `50px`;

    moon.style.top = `${(Math.random() * 50)+25}%`;
    moon.style.left = `${(Math.random() * 50) + 25}%`;

    container.appendChild(moon);
}






// shooting star creation function
export function createShootingStar(container) {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';

    // Random duration between 0.5 and 2 seconds
    const duration = Math.random() * 1.5 + 0.5; 
    shootingStar.style.animationDuration = `${duration}s`;

    // Random size between 2 and 4 pixels
    const randomSize = Math.random() * 2 + 2; 
    shootingStar.style.width = `${randomSize}px`;
    shootingStar.style.height = `${randomSize}px`;

    // Random position in a smaller section of the screen
    shootingStar.style.top = `${Math.random() * 50 + 20}%`;
    shootingStar.style.left = `${Math.random() * 50 + 10}%`;

    // Set a random rotation
    const rotation = Math.random() * 360;
    shootingStar.style.transform = `rotate(${rotation}deg)`;

    // Set a random translation
    const distance = Math.random() * 50 + 200; // Adjust the range as needed
    const angle = Math.random() * 360;
    const translateX = Math.cos(angle) * distance;
    const translateY = Math.sin(angle) * distance;
    shootingStar.style.transform += ` translate(${translateX}px, ${translateY}px)`;

    container.appendChild(shootingStar);

    shootingStar.addEventListener('animationiteration', () => {
        // Remove the shooting star after the animation completes
        shootingStar.remove();

        // Create a new shooting star
        setTimeout(() => createShootingStar(container), Math.random() * 15000);
    });
}



// function for creating 
export function createConstellation(container, constellationData, navigate, width, height, top, left,  isNightSky = false) {
    const constellation = document.createElement('div');
    constellation.className = 'constellation';
    constellation.setAttribute('data-name', constellationData.name);

    const nameDisplay = document.createElement('div');
    nameDisplay.className = 'constellation-name';
    nameDisplay.textContent = constellationData.name;
    constellation.appendChild(nameDisplay);

    const linesDisplay = document.createElement('div');
    linesDisplay.className = 'constellation-lines';
    constellation.appendChild(linesDisplay);

    constellationData.stars.forEach((star) => {
        const [starX, starY, starSize] = star;
        const starElement = document.createElement('div');
        starElement.className = 'constellation-star';

        const randomDelay = Math.random() + 's';
        starElement.style.animationDelay = randomDelay;
        
        starElement.style.width = isNightSky ? `${starSize}px` : `${starSize * 3.5}px`;
        starElement.style.height = isNightSky ? `${starSize}px` : `${starSize * 3.5}px`;
        starElement.style.left = `${starX * (100/150)}%`;
        starElement.style.top = `${starY * (100/180)}%`;

        constellation.appendChild(starElement);
    });

    if (constellationData.lines && constellationData.lines.length > 0) {
        constellationData.lines.forEach(line => {
            const [startIndex, endIndex] = line;
            const startStar = constellationData.stars[startIndex];
            const endStar = constellationData.stars[endIndex];

            const lineElement = document.createElement('div');
            lineElement.className = 'constellation-line';

            lineElement.style.height = isNightSky ? '2px' : '3px';

            const startStarCenterX = ((startStar[0] + startStar[2] / 2) * 100 / 150);
            const startStarCenterY = ((startStar[1] + startStar[2] / 2) * 100 / 180);

            const endStarCenterX = ((endStar[0] + endStar[2] / 2) * 100 / 150);
            const endStarCenterY = ((endStar[1] + endStar[2] / 2) * 100 / 180);

            const distance = Math.sqrt(
                Math.pow(endStarCenterX - startStarCenterX, 2) + Math.pow(endStarCenterY - startStarCenterY, 2)
            ) * 1.05;

            const angle = Math.atan2(endStarCenterY - startStarCenterY, endStarCenterX - startStarCenterX) * (176 / Math.PI);

            lineElement.style.width = `${distance}%`;
            lineElement.style.transformOrigin = 'left';
            lineElement.style.transform = `rotate(${angle}deg)`;
            lineElement.style.left = `${startStarCenterX}%`;
            lineElement.style.top = `${startStarCenterY}%`;

            linesDisplay.appendChild(lineElement);
        });
    }


    //set the dimensions and position of the constellations
    constellation.style.width = width;
    constellation.style.height = height;
    constellation.style.top = top;
    constellation.style.left = left;

    // for the nightsky section, add the hover growth and click redirect
    if (isNightSky) {

        const hoverGrowth = 5;
        constellation.style.cursor = 'pointer';        
        
        constellation.addEventListener('mouseenter', () => {
            const currentWidth = parseFloat(constellation.style.width);
            const currentHeight = parseFloat(constellation.style.height);
            const currentTop = parseFloat(constellation.style.top);
            const currentLeft = parseFloat(constellation.style.left);

            const newWidth = currentWidth + (currentWidth * (hoverGrowth / 100));
            const newHeight = currentHeight + (currentHeight * (hoverGrowth / 100));
            const sizeChangeX = (newWidth - currentWidth) / 2;
            const sizeChangeY = (newHeight - currentHeight) / 2;

            constellation.style.width = `${newWidth}px`;
            constellation.style.height = `${newHeight}px`;
            constellation.style.top = `${currentTop - sizeChangeY}px`;
            constellation.style.left = `${currentLeft - sizeChangeX}px`;

            nameDisplay.style.opacity = 1;
            linesDisplay.style.opacity = 0.7;
        });

        constellation.addEventListener('mouseleave', () => {
            const currentWidth = parseFloat(constellation.style.width);
            const currentHeight = parseFloat(constellation.style.height);
            const currentTop = parseFloat(constellation.style.top);
            const currentLeft = parseFloat(constellation.style.left);

            const newWidth = currentWidth - (currentWidth * (hoverGrowth / 100));
            const newHeight = currentHeight - (currentHeight * (hoverGrowth / 100));
            const sizeChangeX = (newWidth - currentWidth) / 2;
            const sizeChangeY = (newHeight - currentHeight) / 2;

            constellation.style.width = `${newWidth}px`;
            constellation.style.height = `${newHeight}px`;
            constellation.style.top = `${currentTop - sizeChangeY}px`;
            constellation.style.left = `${currentLeft - sizeChangeX}px`;

            nameDisplay.style.opacity = 0;
            linesDisplay.style.opacity = 0.2;
        });

        constellation.addEventListener('click', () => {
            const constellationId = constellationData._id; 
            navigate('/constellation/' + constellationId);
        });

    }

    container.appendChild(constellation);
}