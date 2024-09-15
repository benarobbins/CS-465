const mongoose = require('mongoose');
const Meal = require('../models/meals'); // Register model
const Model = mongoose.model('meals');

// GET: /food - lists all the meals
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const mealsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

    // Uncomment the following line to show results
    // of the query on the console
    // console.log(q);

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting meal list
        return res
            .status(200)
            .json(q);
    }

};

// GET: /food/:mealCode - lists a single meal
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const mealsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.mealCode }) // Return a single record
        .exec();

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting meal list
        return res
            .status(200)
            .json(q);
    }
};

// POST: /food - Add a new Meal
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const mealsAddMeal = async(req, res) => {
    const newMeal = new Meal({
        code: req.body.code,
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        rate: req.body.rate
    });

    const q = await newMeal.save();

    if(!q)
    { // Database returned no data
        return res
                .status(400)
                .json(err);
    } else { // Return new meal
        return res
            .status(201)
            .json(q);
    }
};

// PUT: /food/:mealCode - Updates a Meal
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const mealsUpdateMeal = async(req, res) => {
    const q = await Model
        .findOneAndUpdate(
            { 'code' : req.params.mealCode },
            {
                code: req.body.code,
                name: req.body.name,
                image: req.body.image,
                description: req.body.description,
                rate: req.body.rate
            }
        )
        .exec();

        if(!q)
        { // Database returned no data
            return res
                    .status(400)
                    .json(err);
        } else { // Return updated meal
            return res
                .status(201)
                .json(q);
        }
}

module.exports = {
    mealsList,
    mealsFindByCode,
    mealsAddMeal,
    mealsUpdateMeal
};