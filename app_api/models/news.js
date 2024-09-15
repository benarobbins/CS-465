const mongoose = require('mongoose');

// Define the trip schema
const newsSchema = new mongoose.Schema({
    code: { type: String, required: true, index: true },
    title: { type: String, required: true, index: true },
    date: { type: Date, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    content: { type: String, required: true }
});
const News = mongoose.model('news', newsSchema);
module.exports = News;