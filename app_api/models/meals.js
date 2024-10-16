const mongoose = require('mongoose');

// Define the trip schema
const mealSchema = new mongoose.Schema({
    // Code is indexed value. Used in GET requests to return single meal.
    code: { type: String, required: true, index: true },
    group: { type: String, required: true, index: true },
    name: { type: String, required: true},
    image: { type: String, required: true },
    description: { type: String, required: true }
});
const Meal = mongoose.model('meals', mealSchema);
module.exports = Meal;