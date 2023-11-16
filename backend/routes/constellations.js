const express = require('express');
const router = express.Router();
const Constellation = require('../models/constellations'); // Assuming you have a constellations model
const {
    getAllConstellations,
    getConstellationByID,
    createConstellation,
    deleteConstellationByID,
    editConstellationByID
} = require('../controllers/constellations');

// all Constellation routes
router.get('/constellations', getAllConstellations);
router.get('/constellations/:id', getConstellationByID);
router.post('/constellations/new', createConstellation);
router.delete('/constellations/:id', deleteConstellationByID);
router.patch('/constellations/:id', editConstellationByID);

module.exports = router;
