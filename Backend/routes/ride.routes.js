const experss = require('express');
const router = experss.Router();
const { body, query } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middleware/auth.middlewate');

router.post('/create', 
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination ddress'),
    body('vehicleType').isString().isIn(['auto', 'car', 'bike']).withMessage('Invalid Vehicle Type'),
    rideController.createRide
)


router.get('/get-fare', 
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3}).withMessage('Invalid Pickup Location'),
    query('destination').isString().isLength({ min: 3}).withMessage('Invalid Destination Location'),
    rideController.getFare

)

module.exports = router;