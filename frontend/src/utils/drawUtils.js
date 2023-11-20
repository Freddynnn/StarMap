// drawUtils.js
export const drawStar = (e, setFormData, formData, createConstellation, navigate) => {
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
};
