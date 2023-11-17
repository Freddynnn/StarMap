const express = require('express');
const router = express.Router();
const {
    getAllConstellations,
    getConstellationByID,
    createConstellation,
    deleteConstellationByID,
    editConstellationByID
} = require('../controllers/constellations');

// all Constellation routes
router.get('/constellations/:userID', getAllConstellations);
router.post('/constellation/new', createConstellation);

router.get('/constellation/:ID', getConstellationByID);
router.delete('/constellation/:ID', deleteConstellationByID);
router.patch('/constellation/:ID', editConstellationByID);

module.exports = router;
