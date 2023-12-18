const mongoose = require('mongoose');
const Constellation = require('../models/constellations');

// function to list all Constellations
const getAllConstellations = async (req, res) => {
    const userID = req.params.userID;

    try {
        const userConstellations = await Constellation.find({userID});

        if (!userConstellations || userConstellations.length === 0) {
            return res.status(404).json({ error: `No Constellations for userID: ${userID}` });
        }

        return res.status(200).json(userConstellations);
    } catch (error) {
        console.error('Error fetching Constellations:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};




// Function for rendering a specific Constellations page
const getConstellationByID = async (req, res) => {
    const { ID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ID)) {
        return res.status(404).json({ error: 'No Constellations found' });
    }

    const constellation = await Constellation.findById(ID);

    return res.status(200).json(constellation);
};

// Function to add a new constellation to the database
const createConstellation = async (req, res) => {
    const { name, description, stars, lines, userID, pos } = req.body;
    const newConstellation = new Constellation({ name, description, stars, lines, userID, pos });

    // TODO: for images associated with constellations
    const fileName = req.file != null ? req.file.filename : null;

    try {
        await newConstellation.save();
        res.status(201).json({ message: 'Constellation created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating Constellation' });
    }
};

// function for deleting a specific Constellation
const deleteConstellationByID = async (req, res) => {
    const { ID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ID)) {
        return res.status(404).json({ error: 'This Constellation does not exist' });
    }

    const constellation = await Constellation.findByIdAndDelete(ID);
    return res.status(200).json(constellation);
};

// editing the information of a single constellation
const editConstellationByID = async (req, res) => {
    const { ID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ID)) {
        return res.status(404).json({ error: 'This Constellation does not exist' });
    }

    const constellation = await Constellation.findByIdAndUpdate(ID, req.body);
    return res.status(200).json(constellation);
};

module.exports = {
    getAllConstellations,
    getConstellationByID,
    createConstellation,
    deleteConstellationByID,
    editConstellationByID
};
