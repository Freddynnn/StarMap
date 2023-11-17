const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// function to register the user
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input (e.g. check password length and complexity)
        if (!username || !password) {
            return res.status(400).json({ error: 'Please fill in the  required fields' });
        }

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists. Please choose a different one.' });
        }

        // If the username and email are available, hash the password and create/save the new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }
};


// Async function to handle user login
const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Search for the user by username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ code: 400, msg: 'Username not found' });
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        // Passwords match, create a JWT token
        const token = jwt.sign({ username: user.username, userId: user._id }, 'your-secret-key', {
          algorithm: 'HS256',
          expiresIn: '5h'
        });
  
        // Include user data and token in the response
        res.json({ code: 200, msg: 'Login success!', user: { 
            _id: user?._id, 
            username: user?.username, 
        }, token });
      } else {
        res.status(401).json({ code: 401, msg: 'Incorrect password' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ code: 500, msg: 'Internal server error' });
    }
};
  



// Async function to delete a user
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ code: 404, msg: 'User not found' });
        }

        // If the user exists, remove the user from the database
        await User.findByIdAndDelete(userId);
        res.status(200).json({ code: 200, msg: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, msg: 'Internal server error' });
    }
};

const editUserByID = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.log('Invalid ID:', userId);
        return res.status(404).json({ error: `User with ID ${userId} does not exist` });
    }

    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

        if (!user) {
            console.log('User not found with ID:', userId);
            return res.status(404).json({ error: `User with ID ${userId} not found` });
        }

        console.log('User updated successfully:', user);
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { 
    registerUser, 
    loginUser,
    deleteUser,
    editUserByID
};