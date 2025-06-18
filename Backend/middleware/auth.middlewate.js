const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

// Middleware to authenticate user using JWT
module.exports.authUser = async (req, res, next) => {
  try {
    // Extract token from cookies or Authorization header
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({
      token: token
    });

    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token is blacklisted' });
    }

    // Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id).select('-password'); // exclude password

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user object to the request
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired authentication token' });
  }
};


module.exports.authCaptain = async (req, res, next) => {
  try {
    // Extract token from cookies or Authorization header
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({
      token: token
    });

    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token is blacklisted' });
    }

    // Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);// exclude password

    if (!captain) {
      return res.status(401).json({ message: 'Captain not found' });
    }

    // Attach captain object to the request
    req.captain = captain;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired authentication token' });
  }
}