const mongoose = require('mongoose');
const Project = require('../models/projects');

// function to list all Projects
const getAllProjects = async (req, res) => {
    try {
        const userProjects = await Project.find();

        if (!userProjects || userProjects.length === 0) {
            return res.status(404).json({ error: 'No Projects' });
        }

        return res.status(200).json(userProjects);


    // internal error of not fetching projects
    } catch (error) {
        console.error('Error fetching Projects:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Function for rendering a specific Projects page
const getProjectByID = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Projects found' });
    }

    const project = await Project.findById(id);

    return res.status(200).json(project);
}


// Function to add a new project to the database
const createProject = async (req, res) => {
    
    const { name, description, link } = req.body;
    const newProject = new Project({ name, description, link });
    
    // TODO: for images associated with projects 
    const fileName = req.file != null ? req.file.filename : null;

    try {
        await newProject.save();
        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating Project' });
    }
}


// function for deleting a specific Project
const deleteProjectByID = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This Project does not exist' });
    }
    
    const project = await Project.findByIdAndDelete(id);
    return res.status(200).json(project);
}



// editting the information of a single project
const editProjectByID = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This Project does not exist' });
    }
    
    const project = await Project.findByIdAndUpdate(id, req.body);
    return res.status(200).json(project);
}



module.exports = { 
    getAllProjects, 
    getProjectByID, 
    createProject, 
    deleteProjectByID, 
    editProjectByID 
};