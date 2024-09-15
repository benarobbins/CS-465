const mongoose = require('mongoose');
const News = require('../models/news'); // Register model
const Model = mongoose.model('news');

// GET: /news_api - lists all the news
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const newsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting new list
        return res
            .status(200)
            .json(q);
    }

};

// GET: /news_api/:newCode - lists a single news
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const newsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.newsCode }) // Return a single record
        .exec();

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting new list
        return res
            .status(200)
            .json(q);
    }
};

// POST: /news_api - Add a new new
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const newsAddNews = async(req, res) => {
    const newNews = new News({
        code: req.body.code,
        title: req.body.title,
        date: req.body.date,
        author: req.body.author,
        image: req.body.image,
        content: req.body.content
    });

    const q = await newNews.save();

    if(!q)
    { // Database returned no data
        return res
                .status(400)
                .json(err);
    } else { // Return new new
        return res
            .status(201)
            .json(q);
    }
};

// PUT: /news_api/:newCode - Updates a new
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const newsUpdateNews = async(req, res) => {
    const q = await Model
        .findOneAndUpdate(
            { 'code' : req.params.newsCode },
            {
                code: req.body.code,
                title: req.body.title,
                date: req.body.date,
                author: req.body.author,
                image: req.body.image,
                content: req.body.content
            }
        )
        .exec();

        if(!q)
        { // Database returned no data
            return res
                    .status(400)
                    .json(err);
        } else { // Return updated new
            return res
                .status(201)
                .json(q);
        }
}

module.exports = {
    newsList,
    newsFindByCode,
    newsAddNews,
    newsUpdateNews
};