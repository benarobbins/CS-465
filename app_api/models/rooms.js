const mongoose = require('mongoose');

// Define the trip schema
const roomSchema = new mongoose.Schema({
    // Code is indexed value. Used in GET requests to return single room.
    code: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    rate: { type: String, required: true}
});
const Room = mongoose.model('rooms', roomSchema);
module.exports = Room;