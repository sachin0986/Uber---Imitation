const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const connectToDatabase = require('./DataBase/DataBase');
connectToDatabase();
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const cookieParser = require('cookie-parser');
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);


module.exports = app;