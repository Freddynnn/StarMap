const mongoose = require('mongoose');

const profileImageBasePath = 'uploads/profileImages'
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    link: {
        type: String,
        required: true 
    }
})

module.exports = mongoose.model('Project', projectSchema);
module.exports.profileImageBasePath = profileImageBasePath;