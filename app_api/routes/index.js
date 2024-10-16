const express = require('express');
const router = express.Router();

// Import the controllers for routing.
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const roomsController = require('../controllers/rooms');
const mealsController = require('../controllers/meals');
const newsController = require('../controllers/news');

// Enable JSON Web Tokens
const jwt = require('jsonwebtoken');

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {

    const authHeader = req.headers['authorization'];

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

    if(token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err) {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified; // Set the auth param to the decoded object
    });
    next();
}

// Define route for register endpoint
router
    .route('/register')
    .post(authController.register);

// Define route for login endpoint
router
    .route('/login')
    .post(authController.login);

// Define route for trips endpoint
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

// Define route for rooms endpoint
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

// Define route for meals endpoint
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

// Define route for news endpoint
router
    .route('/news_api')
    .get(newsController.newsList) // GET Method routes newsList
    .post(authenticateJWT, newsController.newsAddNews); // POST Method Adds an Article

// GET Method routes newsFindByCode - requires parameter
// PUT Method routes newsUpdateNews - requires parameter
router
    .route('/news_api/:newsCode')
    .get(newsController.newsFindByCode)
    .put(authenticateJWT, newsController.newsUpdateNews);

module.exports = router;