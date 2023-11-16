const express = require('express')
const router = express.Router()
const Project = require('../models/projects')
const {
    getAllProjects, 
    getProjectByID, 
    createProject, 
    deleteProjectByID,
    editProjectByID 
} = require('../controllers/projects') 

// all Project routes
router.get('/projects', getAllProjects);
router.get('/projects/:id', getProjectByID);
router.post('/projects/new', createProject);
router.delete('/projects/:id', deleteProjectByID);
router.patch('/projects/id', editProjectByID);


module.exports = router