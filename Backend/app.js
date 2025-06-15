const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const connectToDatabase = require('./DataBase/DataBase');
connectToDatabase();
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');


const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.use('/users', userRoutes);

module.exports = app;