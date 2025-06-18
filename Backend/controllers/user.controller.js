const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model'); // Assuming you have a user.model.js
const userService = require('../services/user.service'); // Assuming you have a user.service.js
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log("Registering user with data:", req.body); // Added for registration debugging

    const { fullname,  email, password } = req.body;
    
    const isUserExists = await userModel.find({ email });
    if (isUserExists) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    try {
        const hashedPassword = await userModel.hashPassword(password);
        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        });

        const token =  user.generateAuthToken();
        res.status(201).json({ token, user });
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json({ message: 'Server Error during registration' });
    }
};

module.exports.loginUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);
    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)
}


module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token'); // Clear the cookie
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (token) {
        // Optionally, you can blacklist the token by saving it to a blacklist collection
        await blacklistTokenModel.create({ token });
    }
    res.status(200).json({ message: 'User logged out successfully' });
}