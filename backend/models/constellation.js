const mongoose = require('mongoose');

const profileImageBasePath = 'uploads/profileImages'
const constellationSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Constellation', constellationSchema);
module.exports.profileImageBasePath = profileImageBasePath;