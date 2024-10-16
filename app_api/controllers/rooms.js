const mongoose = require('mongoose');
const Room = require('../models/rooms'); // Register model
const Model = mongoose.model('rooms');

// GET: /rooms - lists all the rooms
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting room list
        return res
            .status(200)
            .json(q);
    }
};

// GET: /rooms/:roomCode - lists a single rooms
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.roomCode }) // Return a single record
        .exec();

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting room list
        return res
            .status(200)
            .json(q);
    }
};

// POST: /rooms - Add a new Room
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsAddRoom = async(req, res) => {
    const newRoom = new Room({
        code: req.body.code,
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        rate: req.body.rate
    });

    const q = await newRoom.save();

    if(!q)
    { // Database returned no data
        return res
                .status(400)
                .json(err);
    } else { // Return new room
        return res
            .status(201)
            .json(q);
    }
};

// PUT: /rooms/:roomCode - Updates a Room
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsUpdateRoom = async(req, res) => {
    const q = await Model
        .findOneAndUpdate(
            { 'code' : req.params.roomCode },
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
        } else { // Return updated room
            return res
                .status(201)
                .json(q);
        }
}

module.exports = {
    roomsList,
    roomsFindByCode,
    roomsAddRoom,
    roomsUpdateRoom
};