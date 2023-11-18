// NightSky.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NightSky.css';
import { useNavigate } from 'react-router-dom';
import { createStar, createShootingStar, createConstellation } from '../../utils/constellationUtils';

const NightSky = ({ user }) => {
    const navigate = useNavigate();
    const [constellations, setConstellations] = useState([]);
    const [constellationsFetched, setConstellationsFetched] = useState(false);

    useEffect(() => {
        const constellationsContainer = document.getElementById('constellationsContainer');

        const fetchConstellations = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/constellations/${user._id}`);
                setConstellations(response.data);
                setConstellationsFetched(true);
            } catch (error) {
                console.error('Error fetching user constellations:', error);
            }
        };


        // function to initialize all the stars and add them to the container
        const initializeStars = () => {
            for (let i = 0; i < 200; i++) {
                createStar(constellationsContainer);
            }
        }

        // initializing the constellations we fetched from the db
        const initializeConstellations = () => {
            constellations.forEach((constellationData) => {
                const width = '150px';
                const height = '180px';
                const top = `${(Math.random() * ((906) / 2)) + 906 / 4 - 250}px`;
                const left = `${(Math.random() * ((1707) / 2)) + 1707 / 4 - 100}px`;
               
                createConstellation(constellationsContainer, constellationData, navigate, width, height, top, left, true);
            });
        };


        // actually calling the functions above on conmponent mount
        if (!constellationsFetched) {
            fetchConstellations();
        } else {
            initializeConstellations();
            setTimeout(() => createShootingStar(constellationsContainer), Math.random() * 20000);
            initializeStars();
        }
    }, [constellationsFetched, navigate]);

    return <div id="constellationsContainer" className="constellations-container"></div>;
};

export default NightSky;
