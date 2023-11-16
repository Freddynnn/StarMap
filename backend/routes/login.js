const express = require('express')
const router = express.Router()
const User = require('../models/user')
const {
    registerUser, 
    loginUser,
    deleteUser, 
    editUserByID
} = require('../controllers/users')

// Register and login routes
router.post('/register', registerUser);

router.post('/login', loginUser);

// Add the deleteUser route
router.delete('/user/:userId', deleteUser);

router.patch('/user/:userId', editUserByID);

module.exports = router;
