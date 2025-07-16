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

router.post('/confirm', 
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),
    rideController.confirmRide

)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride Id'),
    query('otp').isString().isLength({ min: 4, max: 4}).withMessage('Invalid ride otp'),
    rideController.startRide
)


router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride Id'),
    rideController.endRide
)


module.exports = router;