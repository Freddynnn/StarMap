const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3001;

//import the routers
const constellationRouter = require('./routes/constellations')
const loginRouter = require('./routes/login')

const uri = "mongodb+srv://Freddy:test123@cluster0.tunrfyo.mongodb.net/?retryWrites=true&w=majority";


if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

app.use(cors());
app.use(express.json())


// Connect to the MongoDB database using Mongoose
mongoose.connect(process.env.DATABASE_URL, {
// mongoose.connect(uri, {
  useNewUrlParser: true,
});
const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));



// set the app to use the imported routers
app.use('', constellationRouter);
app.use('', loginRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});