const express = require('express'); // Express app
const router = express.Router(); // Router logic

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const roomsController = require('../controllers/rooms');
const mealsController = require('../controllers/meals');

// Enable JSON Web Tokens
const jwt = require('jsonwebtoken');

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    // console.log('In Middleware');

    const authHeader = req.headers['authorization'];
    // console.log('Auth Header: ' + authHeader);

    if(authHeader == null) {
        console.log('Auth Header Required but NOT PRESENT!');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if(headers.length < 1) {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    // console.log('Token: ' + token);

    if(token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    // console.log(process.env.JWT_SECRET);
    // console.log(jwt.decode(token));
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err) {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified; // Set the auth paramto the decoded object
    });
    next(); // We need to continue or this will hang forever
}

// Define route for authentication endpoint
router
    .route('/register')
    .post(authController.register);

// Define route for login endpoint
router
    .route('/login')
    .post(authController.login);

// Define route for out trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(authenticateJWT, tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip);

// Define route for out rooms endpoint
router
    .route('/rooms_api')
    .get(roomsController.roomsList) // GET Method routes roomList
    .post(authenticateJWT, roomsController.roomsAddRoom); // POST Method Adds a Room

// GET Method routes roomsFindByCode - requires parameter
// PUT Method routes roomsUpdateRoom - requires parameter
router
    .route('/rooms_api/:roomCode')
    .get(roomsController.roomsFindByCode)
    .put(authenticateJWT, roomsController.roomsUpdateRoom);

// Define route for out meals endpoint
router
    .route('/food')
    .get(mealsController.mealsList) // GET Method routes mealList
    .post(authenticateJWT, mealsController.mealsAddMeal); // POST Method Adds a Meal

// GET Method routes mealsFindByCode - requires parameter
// PUT Method routes mealsUpdateMeal - requires parameter
router
    .route('/food/:mealCode')
    .get(mealsController.mealsFindByCode)
    .put(authenticateJWT, mealsController.mealsUpdateMeal);

module.exports = router;